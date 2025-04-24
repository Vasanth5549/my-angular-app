import { Component, OnInit } from '@angular/core';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  ProcessRTE,
} from 'epma-platform/services';
import {
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  IEnumerable,
  HtmlPage,  
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import {
  InfHumdificationConceptCodeData,
  InfusionTypeConceptCodeData,
  MedDoseTypeConceptCodeData,
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
  RequestUrgency,
} from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
  ScriptObject,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
//import { Dummyprescriptionitem as PrescriptionItemVM} from '../viewmodel/Dummyprescriptionitem';
import { Dictionary } from 'epma-platform/dictionary';
import { Resource } from '../resource';
import {
  byte,  
  int64
} from 'src/app/shared/epma-platform/models/eppma-common-types';
import {
  CConstants,
  PrescriptionTypes,
  ValueDomain,
} from '../utilities/constants';
import {
  ObservableCollection,
  List,
  EventContextModel,
  ContextType,
  ContextEventargs,
  RTEEventargs,
  termModel,
  Constants,
  CListItem,
  ContextInfo,
  Visibility
} from 'epma-platform/models';
import {
  CommonFlags,
  DomainValuesForTechValidate,
  FormviewerComboValues,
} from '../utilities/globalvariable';
import { Common } from '../utilities/common';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { OrderSetHelper } from '../utilities/prescriptionhelper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ProfileData } from '../utilities/profiledata';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import {
  AppContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { Exception } from 'src/app/shared/epma-platform/models/Exception';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { BasicDetailsVM, InfusionVM } from './BasicDetailsVM';
import {
  CResMsgGetIPPTechValDrugs,
  Dispensinginstructionhistory,
  MedDispensingDetail,
  PrescriptionItemView,
  TechValidatedItem,
} from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Environment } from '../../product/shared/models/Common';
import { FormViewerVM } from './formviewervm';
import { PresItemDRCVM } from './PresItemDRCVM';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';

export class TechvalidateCAVM
  extends ClonableViewModelBase
  implements IViewModelBase
{
  PropertyChanged: Function;  
  //public delegate void DlgtOnSelPrescItemChanged(PrescriptionItemVM oPrescItemVM);
  public OnSelectedPrescItemChanged: Function;
  //public delegate void DlgtOnDeactivatedPrescItemsFound(string sPrescItems, string sCompItems);
  public OnDeactivatedPrescItemsFound: Function;
  //public delegate void DlgtOnSelChildPrescItemChanged(PrescriptionItemVM oPrescItemVM);
  public OnSelectedChldPrescItemChanged: Function;
  //public delegate void DlgtOnSubmitCompleted(bool IsTechValSubmitted, string sPrescriptionOIDs);
  public OnSubmitCompleted: Function;
  //public delegate void DlgtOnLoadQuantityFound(ObservableCollection < CListItem > Quantitys);
  public OnLoadMCIQuantityFound: Function;
  private _propTechPresItem: ObservableCollection<PrescriptionItemVM> = new  ObservableCollection<PrescriptionItemVM>();
  private _IsQuantityPerDoseMandatory: boolean = false;
  private TechnicalvalidateupdateField: boolean = false;
  private _SelectedPrescItem: PrescriptionItemVM;
  private _SelectedChildPresItem: PrescriptionItemVM;
  public IsMciChildSelected: boolean = false;
  public IsTechQtyUOM: boolean = false;
  public IsContextLoad: boolean = false;
  public PrescriptionIDS_FromGrid: List<string> = new List<string>();
  Addedheader: List<string> = new List<string>();
  firstheader: boolean = true;
  sAllPrescItemOIDs: string = String.Empty;
  sCDPrescItemOIDs: string = String.Empty;
  sNonCDPrescItemOIDs: string = String.Empty;
  sTmpPrescItemOID: string = String.Empty;
  private _DeactivatedPrescItems: string  = String.Empty;
  private _DeactivatedCompItems: string = String.Empty;
  private _HeightWeightIndText: string;
  public HWLatestDTTM: DateTime = DateTime.MinValue;
  public get HeightWeightIndText(): string {
    return this._HeightWeightIndText;
  }
  public set HeightWeightIndText(value: string) {
    if (this._HeightWeightIndText != value) {
      this._HeightWeightIndText = value;
      //NotifyPropertyChanged("HeightWeightIndText");
    }
  }
  private _IsVisibleHWIndicator: Visibility;
  public get IsVisibleHWIndicator(): Visibility {
    return this._IsVisibleHWIndicator;
  }
  public set IsVisibleHWIndicator(value: Visibility) {
    if (this._IsVisibleHWIndicator != value) {
      this._IsVisibleHWIndicator = value;
      //NotifyPropertyChanged("IsVisibleHWIndicator");
    }
  }
  public LoadPrescriptionData(): void {
    if (this.GetContextInfo() == 0) {
      this.IsContextLoad = true;
    }
    let ViewDomainCodes: string = String.Empty;

    ViewDomainCodes =
      ValueDomain.SupplyInstruction +
      ',' +
      ValueDomain.DispensingInstruction +
      ',' +
      ValueDomain.Supplystatus +
      ',' +
      ValueDomain.MEDURGENCY;
    ProcessRTE.GetValuesByDomainCodes(ViewDomainCodes, (s, e) => {
      this.OnRTEViewResult(s);

      let sDomainCodes: string = String.Empty;
      sDomainCodes =
        ValueDomain.SupplyInstruction +
        ',' +
        ValueDomain.DispensingInstruction +
        ',' +
        ValueDomain.INFUSIONTYPE +
        ',' +
        ValueDomain.HUMIDIFICATION +
        ',' +
        ValueDomain.ForAdminDoseType +
        ',' +
        ValueDomain.Supplystatus +
        ',' +
        ValueDomain.Itemstatus;
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



    });
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) {
      let _ErrorID: number = 80000067;
      let _ErrorSource: string =
        'LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateCAVM, Method:OnRTEResult()';
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        new Exception(
          'Error while fetching Supply, Dispensing instructions domain values'
        )
      );
    } else {
      if (
        String.Equals(
          args.Request,
          ValueDomain.SupplyInstruction +
            ',' +
            ValueDomain.DispensingInstruction +
            ',' +
            ValueDomain.INFUSIONTYPE +
            ',' +
            ValueDomain.HUMIDIFICATION +
            ',' +
            ValueDomain.ForAdminDoseType +
            ',' +
            ValueDomain.Supplystatus +
            ',' +
            ValueDomain.Itemstatus,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (args.Result instanceof Dictionary) {
          FormviewerComboValues.DispensingInstructions =
            new ObservableCollection<CValuesetTerm>();
          FormviewerComboValues.SupplyInstructions =
            new ObservableCollection<CValuesetTerm>();
          let objResult: Dictionary<string, List<CListItem>> = <
            Dictionary<string, List<CListItem>>
          >args.Result;
          objResult.forEach((objDomainDetail) => {
            switch (objDomainDetail.Key.ToUpper()) {
              case ValueDomain.Itemstatus: {
                if (MedicationCommonConceptCodeData.ConceptCodes == null)
                  MedicationCommonConceptCodeData.ConceptCodes =
                    new ObservableCollection<CValuesetTerm>();
                (<List<CListItem>>objDomainDetail.Value).forEach(
                  (oCListItem) => {
                    if (
                      !MedicationCommonConceptCodeData.ConceptCodes.Any((x) =>
                        String.Equals(
                          x.csCode,
                          oCListItem.Value,
                          StringComparison.InvariantCultureIgnoreCase
                        )
                      )
                    ) {
                      MedicationCommonConceptCodeData.ConceptCodes.Add(
                        ObjectHelper.CreateObject(new CValuesetTerm(), {
                          csCode: oCListItem.Value,
                          csDescription: oCListItem.DisplayText,
                        })
                      );
                    }
                  }
                );
                break;
              }
              case ValueDomain.SupplyInstruction: {
                if (MedicationCommonConceptCodeData.ConceptCodes == null)
                  MedicationCommonConceptCodeData.ConceptCodes =
                    new ObservableCollection<CValuesetTerm>();
                (<List<CListItem>>objDomainDetail.Value).forEach(
                  (oCListItem) => {
                    FormviewerComboValues.SupplyInstructions.Add(
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
                  }
                );
                break;
              }
              case ValueDomain.DispensingInstruction:
                (<List<CListItem>>objDomainDetail.Value).forEach(
                  (oCListItem) => {
                    FormviewerComboValues.DispensingInstructions.Add(
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      })
                    );
                  }
                );
                break;
              case ValueDomain.INFUSIONTYPE:
                if (InfusionTypeConceptCodeData.ConceptCodes == null)
                  InfusionTypeConceptCodeData.ConceptCodes =
                    new ObservableCollection<CValuesetTerm>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  InfusionTypeConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
                break;
              case ValueDomain.HUMIDIFICATION:
                if (InfHumdificationConceptCodeData.ConceptCodes == null)
                  InfHumdificationConceptCodeData.ConceptCodes =
                    new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  InfHumdificationConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CListItem(), {
                      Value: oCListItem.Value,
                      DisplayText: oCListItem.DisplayText,
                    })
                  );
                });
                break;
              case ValueDomain.ForAdminDoseType: {
                if (MedDoseTypeConceptCodeData.ConceptCodes == null) {
                  MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<
                    string,
                    string
                  >();
                  (<List<CListItem>>objDomainDetail.Value).forEach(
                    (oCListItem) => {
                      MedDoseTypeConceptCodeData.ConceptCodes.Add(
                        oCListItem.Value.ToUpper(),
                        oCListItem.DisplayText
                      );
                    }
                  );
                }
                break;
              }
              case ValueDomain.Supplystatus: {
                if (DomainValuesForTechValidate.SupplyRequest == null) {
                  DomainValuesForTechValidate.SupplyRequest =
                    new ObservableCollection<CListItem>();
                  DomainValuesForTechValidate.SupplyRequest.Add(
                    ObjectHelper.CreateObject(new CListItem(), {
                      DisplayText: '<Select>',
                      Value: Resource.TechValidate.Empty,
                    })
                  );
                  (<List<CListItem>>objDomainDetail.Value).forEach(
                    (oCListItem) => {
                      DomainValuesForTechValidate.SupplyRequest.Add(
                        ObjectHelper.CreateObject(new CListItem(), {
                          Value: oCListItem.Value,
                          DisplayText: oCListItem.DisplayText,
                        })
                      );
                    }
                  );
                }
                break;
              }
            }
          });
        }
      }
      this.GetTechnicalValidate();
    }
  }
  public SetHeightweightPopUp(): void {
    if (
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc &&
      MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert
    ) {
      let result: ScriptObject;
      let Encounterid: number = PatientContext.EncounterOid;
      let Pationtid: number = PatientContext.PatientOID;
      let prescriptiontype: string = PatientContext.PrescriptionType;
      result = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'GetHTWTUpdateCompareValue',
          Pationtid,
          Encounterid,
          prescriptiontype
        ),
        'ScriptObject'
      );
      if (result.GetProperty('Dosecalcdate') != null) {
        let datevalue: Object = result.GetProperty('Dosecalcdate');
        this.HWLatestDTTM = Convert.ToDateTime(datevalue);
        this.IsVisibleHWIndicator = Visibility.Visible;
        this.HeightWeightIndText =
          Resource.TechValidate.Heightweightupdate_text +
          ' ' +
          datevalue +
          Resource.TechValidate.HtWtpleasereview;
      } else {
        this.IsVisibleHWIndicator = Visibility.Collapsed;
      }
    } else {
      this.IsVisibleHWIndicator = Visibility.Collapsed;
    }
  }
  OnRTEViewResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (
      String.Equals(
        args.Request,
        ValueDomain.SupplyInstruction +
          ',' +
          ValueDomain.DispensingInstruction +
          ',' +
          ValueDomain.Supplystatus +
          ',' +
          ValueDomain.MEDURGENCY,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      if (args.Result instanceof Dictionary) {
        if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
          MedicationCommonConceptCodeData.ViewConceptCodes =
            new ObservableCollection<CValuesetTerm>();
        let objResult: Dictionary<string, List<CListItem>> = <
          Dictionary<string, List<CListItem>>
        >args.Result;
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key.ToUpper()) {
            case ValueDomain.SupplyInstruction:
            case ValueDomain.DispensingInstruction:
            case ValueDomain.Supplystatus:
              objDomainDetail.Value.forEach((oCListItem) => {
                MedicationCommonConceptCodeData.ViewConceptCodes.Add(
                  ObjectHelper.CreateObject(new CValuesetTerm(), {
                    csCode: oCListItem.Value,
                    csDescription: oCListItem.DisplayText,
                  })
                );
              });
              break;
            case ValueDomain.MEDURGENCY: {
              RequestUrgency.ConceptCodes = new Dictionary<string, string>();
              (<List<CListItem>>objDomainDetail.Value).forEach((oCListItem) => {
                RequestUrgency.ConceptCodes.Add(
                  oCListItem.Value,
                  oCListItem.DisplayText
                );
              });
              break;
            }
          }
        });
      }
    }
  }
  GetTechnicalValidate(): void {
    if (this.IsContextLoad) {
      let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      objServiceProxy.GetIPPTechValDrugsCompleted = (s, e) => {
        this.objServiceProxy_GetIPPDrugDetailsCompleted(s, e);
      };
      let objReqDrugDet: IPPManagePrescSer.CReqMsgGetIPPTechValDrugs =
        new IPPManagePrescSer.CReqMsgGetIPPTechValDrugs();
      objReqDrugDet.PatientOIDBC = PatientContext.PatientOID;
      objReqDrugDet.EncounterOIDBC = PatientContext.EncounterOid;
      objReqDrugDet.oContextInformation = Common.FillContext();
      objReqDrugDet.IsBreakBC = '0';
      objReqDrugDet.ServiceOIDBC = MedChartData.ServiceOID;
      objReqDrugDet.LocationOIDBC = MedChartData.LocationOID;
      objReqDrugDet.PrescriptionTypeBC = PatientContext.PrescriptionType;
      objReqDrugDet.mcVersion = AppSessionInfo.AMCV;
      objServiceProxy.GetIPPTechValDrugsAsync(objReqDrugDet);
    } else {
      let _ErrorID: number = 80000067;
      let _ErrorSource: string =
        'LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateCAVM, Method:GetTechnicalValidate()';
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        new Exception(
          'Error while reading Query string values from ContextManager object'
        )
      );
    }
  }
  objServiceProxy_GetIPPDrugDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetIPPTechValDrugsCompletedEventArgs
  ): void {
    if (e.Error != null || e.Result == null) {
      let _ErrorID: number = 80000067;
      let _ErrorSource: string =
        'LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateVM, Method:objServiceProxy_GetIPPDrugDetailsCompleted()';
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    } else {
      let objResGetTechnicalDetails: CResMsgGetIPPTechValDrugs = e.Result;
      let oORSHelper: OrderSetHelper = new OrderSetHelper();
      if (
        objResGetTechnicalDetails != null &&
        objResGetTechnicalDetails.oPrescriptionItemView != null &&
        objResGetTechnicalDetails.oPrescriptionItemView.Count > 0
      ) {
        let lstAddedSequenceGroup: List<number> = new List<number>();
        let nPrescItemsCnt: number =
          objResGetTechnicalDetails.oPrescriptionItemView.Count;
        let oTmpPrescItemVM: PrescriptionItemVM;
        this.PresTechValidatedItems =
          new ObservableCollection<PrescriptionItemVM>();
        this.SetHeightweightPopUp();
        for (let i: number = 0; i < nPrescItemsCnt; i++) {
          oTmpPrescItemVM = new PrescriptionItemVM();
          if ( objResGetTechnicalDetails.oMedDispensingDetail) {
            oTmpPrescItemVM = this.ConstructPrescriptionItemVM(
              objResGetTechnicalDetails.oPrescriptionItemView[i],
              objResGetTechnicalDetails.oMedDispensingDetail.ToArray()
            );
          } else {
            oTmpPrescItemVM = this.ConstructPrescriptionItemVM(
              objResGetTechnicalDetails.oPrescriptionItemView[i],
              null
            );
          }
          if (
            !String.IsNullOrEmpty(
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            ) &&
            !this.Addedheader.Contains(
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            )
          ) {
            this.PresTechValidatedItems.Add(
              oORSHelper.GetGropingHeader(
                oTmpPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName,
                oTmpPrescItemVM.PrescriptionOID,
                oTmpPrescItemVM.PrescriptionType,
                oTmpPrescItemVM.FormViewerDetails.BasicDetails
                  .Firstscheduledatetime,
                this.firstheader
              )
            );
            this.Addedheader.Add(
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            );
            this.firstheader = false;
          }
          if (
            oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            (lstAddedSequenceGroup.Count == 0 ||
              !lstAddedSequenceGroup.Contains(
                oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              ))
          ) {
            let oGroupHeader: PrescriptionItemVM = oORSHelper.GetGropingHeader(
              String.Format(
                Resource.Infusion.SequenceGroupHeader_Text,
                oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              ),
              0,
              PatientContext.PrescriptionType,
              DateTime.MinValue,
              true
            );
            oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
            this.PresTechValidatedItems.Add(oGroupHeader);
            lstAddedSequenceGroup.Add(
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo
            );
          }
          if (
            oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .SequentialItemOrder == 1
          ) {
            if (
              oTmpPrescItemVM != null &&
              !oTmpPrescItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oTmpPrescItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oTmpPrescItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              )
            ) {
              let oGroupHeader: PrescriptionItemVM =
                oORSHelper.GetGropingHeader(
                  String.Format(
                    Resource.Infusion.SequenceGroupHeader_Text,
                    oTmpPrescItemVM.FormViewerDetails.BasicDetails
                      .InfusionDetails.GroupSequenceNo
                  ),
                  0,
                  PatientContext.PrescriptionType,
                  DateTime.MinValue,
                  true
                );
              oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
                oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
              this.PresTechValidatedItems.Add(oGroupHeader);
            }
          }
          this.PresTechValidatedItems.Add(oTmpPrescItemVM);
          if (
            oTmpPrescItemVM != null &&
            oTmpPrescItemVM.FormViewerDetails != null &&
            oTmpPrescItemVM.FormViewerDetails.BasicDetails != null &&
            oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidSelectvalue != null &&
            !String.IsNullOrEmpty(
              oTmpPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidSelectvalue.Value
            )
          ) {
            let fluidVM: PrescriptionItemVM = new PrescriptionItemVM();
            fluidVM = this.ConstructPrescriptionItemVMForFluid(
              objResGetTechnicalDetails.oPrescriptionItemView[i],
              objResGetTechnicalDetails.oMedDispensingDetail?.ToArray()
            );
            this.PresTechValidatedItems.Add(fluidVM);
          }
        }
        this.NotifyPropertyChanged('PresTechValidatedItems');
        if (
          this.PresTechValidatedItems.Count > 0 &&
          this.PresTechValidatedItems[0] != null &&
          this.PresTechValidatedItems[0].IsGroupHeader
        ) {
          this.PresTechValidatedItems[0].formViewerDetails.BasicDetails.DispensingInstruction =
            this.PresTechValidatedItems[1].formViewerDetails.BasicDetails.DispensingInstruction;
          this.PresTechValidatedItems[0].formViewerDetails.BasicDetails.OtherDispensingInstruction =
            this.PresTechValidatedItems[1].formViewerDetails.BasicDetails.OtherDispensingInstruction;
          this.PresTechValidatedItems[0].FormViewerDetails.BasicDetails.DispensingAdditionalComments =
            this.PresTechValidatedItems[1].FormViewerDetails.BasicDetails.DispensingAdditionalComments;
        }
        if (
          !String.IsNullOrEmpty(this._DeactivatedPrescItems) &&
          this.OnDeactivatedPrescItemsFound != null
        ) {
          this.OnDeactivatedPrescItemsFound(
            this._DeactivatedPrescItems,
            this._DeactivatedCompItems
          );
        } else if (
          !String.IsNullOrEmpty(this._DeactivatedCompItems) &&
          this.OnDeactivatedPrescItemsFound != null
        ) {
          this.OnDeactivatedPrescItemsFound(
            this._DeactivatedPrescItems,
            this._DeactivatedCompItems
          );
        }
      }
    }
    Busyindicator.SetStatusIdle('TechValidate_Startup');
  }
  private IsCancelRequestEnabled(
    oMedDispensingDetail: MedDispensingDetail[],
    PrescriptionItemOID: number,
    PrescriptionMultiComponentOID: number,
    FluidPrescirbableItemlistOID: number,
    out1: (isCancelReqEnabled: boolean) => void,
    out2: (requestPending: boolean) => void
  ): void {
    let isCancelReqEnabled: boolean;
    let requestPending: boolean;

    isCancelReqEnabled = false;
    requestPending = false;
    if (oMedDispensingDetail != null && oMedDispensingDetail.length > 0) {
      let ProductOptionsCnt: number = 0;
      if (
        PrescriptionItemOID != 0 &&
        PrescriptionMultiComponentOID == 0 &&
        FluidPrescirbableItemlistOID == 0
      ) {
        ProductOptionsCnt = oMedDispensingDetail
          .Where(
            (x) =>
              x.PrescriptionItemOID == PrescriptionItemOID &&
              x.PrescriptionMulticomponentOID == 0 &&
              x.FluidPrescribableItemListOID == 0
          )
          .Select((x) => x.PrescriptionItemTechOID)
          .Distinct()
          .Count();
        if (ProductOptionsCnt > 0) {
          isCancelReqEnabled = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.PrescriptionMulticomponentOID == 0 &&
                x.FluidPrescribableItemListOID == 0
            )
            .All((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
          requestPending = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.PrescriptionMulticomponentOID == 0 &&
                x.FluidPrescribableItemListOID == 0
            )
            .Any((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
        }
      } else if (
        PrescriptionItemOID != 0 &&
        PrescriptionMultiComponentOID != 0 &&
        FluidPrescirbableItemlistOID == 0
      ) {
        ProductOptionsCnt = oMedDispensingDetail
          .Where(
            (x) =>
              x.PrescriptionItemOID == PrescriptionItemOID &&
              x.PrescriptionMulticomponentOID > 0 &&
              x.PrescriptionMulticomponentOID == PrescriptionMultiComponentOID
          )
          .Select((x) => x.PrescriptionItemTechOID)
          .Distinct()
          .Count();
        if (ProductOptionsCnt > 0) {
          isCancelReqEnabled = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.PrescriptionMulticomponentOID > 0 &&
                x.PrescriptionMulticomponentOID == PrescriptionMultiComponentOID
            )
            .All((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
          requestPending = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.PrescriptionMulticomponentOID > 0 &&
                x.PrescriptionMulticomponentOID == PrescriptionMultiComponentOID
            )
            .Any((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
        }
      } else if (
        PrescriptionItemOID != 0 &&
        PrescriptionMultiComponentOID == 0 &&
        FluidPrescirbableItemlistOID != 0
      ) {
        ProductOptionsCnt = oMedDispensingDetail
          .Where(
            (x) =>
              x.PrescriptionItemOID == PrescriptionItemOID &&
              x.FluidPrescribableItemListOID > 0 &&
              x.FluidPrescribableItemListOID == FluidPrescirbableItemlistOID
          )
          .Select((x) => x.PrescriptionItemTechOID)
          .Distinct()
          .Count();
        if (ProductOptionsCnt > 0) {
          isCancelReqEnabled = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.FluidPrescribableItemListOID > 0 &&
                x.FluidPrescribableItemListOID == FluidPrescirbableItemlistOID
            )
            .All((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
          requestPending = oMedDispensingDetail
            .Where(
              (x) =>
                x.PrescriptionItemOID == PrescriptionItemOID &&
                x.FluidPrescribableItemListOID > 0 &&
                x.FluidPrescribableItemListOID == FluidPrescirbableItemlistOID
            )
            .Any((x) =>
              String.Equals(
                x.DispenseStatus,
                CConstants.MedDispenseRequestSent,
                StringComparison.CurrentCultureIgnoreCase
              )
            );
        }
      }
    }

    out1(isCancelReqEnabled);
    out2(requestPending);
  }

  public GetTechValMciChild(OIDS: number): void {
    OIDS = this.SelectedPrescItem.PrescriptionItemOID;
    if (OIDS > 0) {
      let serviceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      let oReqMCItems: IPPManagePrescSer.CReqMsgGetMCpresitem =
        new IPPManagePrescSer.CReqMsgGetMCpresitem();
      oReqMCItems.PrescriptionItemOIDBC = OIDS;
      oReqMCItems.SupDisInstBC = Resource.TechValidate.IsSupDis;
      oReqMCItems.MCVersionBC = AppSessionInfo.AMCV;
      oReqMCItems.oContextInformation = CommonBB.FillContext();
      serviceProxy.GetMCpresitemCompleted = (s, e) => {
        this.serviceProxy_GetMCpresitemCompleted(s, e);
      };
      serviceProxy.GetMCpresitemAsync(oReqMCItems);
    }
  }
  serviceProxy_GetMCpresitemCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetMCpresitemCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000051;
    let sMCItem: string = String.Empty;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:Multicomponent, Method:serviceProxy_GetMCpresitemCompleted()';
    if (e.Error == null) {
      try {
        let oRes: IPPManagePrescSer.CResMsgGetMCpresitem = e.Result;
        if (
          oRes != null &&
          oRes.objIPPMCPresctiptionItem != null &&
          oRes.objIPPMCPresctiptionItem.Count > 0
        ) {
          let nCount: number = oRes.objIPPMCPresctiptionItem.Count;
          let oTmpPrescItemVM: PrescriptionItemVM;
          this.SelectedPrescItem.PresTechValidatedItemsChild =
            new ObservableCollection<PrescriptionItemVM>();
          for (let i: number = 0; i < nCount; i++) {
            oTmpPrescItemVM = new PrescriptionItemVM();
            this.SelectedPrescItem.PresTechValidatedItemsChild.Add(
              oTmpPrescItemVM
            );
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
  TechValidateDetails_OnDeactivatedPrescItemsFound(
    sPrescItems: string,
    sCompItems: string
  ): void {}
  TechValidateDetails_OnSelectedPrescItemChanged(
    oPrescItemVM: PrescriptionItemVM
  ): void {}
  public ConstructChildItemVM(
    oPrescItemView: IPPManagePrescSer.IPPMCPresctiptionItem,
    oTempParentPrescItemVM: PrescriptionItemVM,
    oPrescItemViewDetails: PrescriptionItemView,
    oMedDispensingDetail: MedDispensingDetail[]
  ): PrescriptionItemVM {
    let oTempPrescItemVM: PrescriptionItemVM = new PrescriptionItemVM();
    oTempPrescItemVM.FormViewerDetails = new FormViewerVM();
    oTempPrescItemVM.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
    oTempPrescItemVM.FormViewerDetails.BasicDetails = new BasicDetailsVM(null);
    let lstTermtext: IEnumerable<CValuesetTerm>;
    let sTmpTermText: string = String.Empty;
    let oCListItem: CListItem;
    let sConcpCode: string = String.Empty;
    oTempPrescItemVM.bAvoidNextSupplyFirsttime = false;
    if (oPrescItemView != null) {
      oTempPrescItemVM.UniqueMCRowId = oPrescItemView.UniqueMCRowID;
      if (oPrescItemView.IsUpto)
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
          oPrescItemView.ComponentName +
          ' up to ' +
          oPrescItemView.Quantity +
          ' ' +
          oPrescItemView.QuantityUOM +
          '~' +
          oPrescItemView.DrugProperties;
      else
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
          oPrescItemView.ComponentName +
          ' ' +
          oPrescItemView.Quantity +
          ' ' +
          oPrescItemView.QuantityUOM +
          '~' +
          oPrescItemView.DrugProperties;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.mCChilditem =
        oPrescItemView.ComponentName +
        ' ' +
        oPrescItemView.Quantity +
        ' ' +
        oPrescItemView.QuantityUOM;
      oTempPrescItemVM.PresMultiCompitemOID = oPrescItemView.OID;
      oTempPrescItemVM.PrescriptionItemOID = oPrescItemView.PrescriptionItemOID;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Route =
        oTempParentPrescItemVM.FormViewerDetails.BasicDetails.Route;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.DosageForm =
        oTempParentPrescItemVM.FormViewerDetails.BasicDetails.DosageForm;
      oTempPrescItemVM.NonFormularyReason =
        oTempParentPrescItemVM.NonFormularyReason;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingOID =
        oPrescItemView.IdentifyingOID;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
        oPrescItemView.IdentifyingType;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.MCVersion =
        oPrescItemView.MCVersion;
      oTempPrescItemVM.OperationMode = 'UM';
      oTempPrescItemVM.SupDisText =
        Resource.TechValidate.SupplyDispChild_Add_Text;
      oTempPrescItemVM.supToolTipDisText =
        Resource.TechValidate.AddsupinstChild;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechPresItemTechOID =
        oPrescItemView.CompIdentifyingOID;
      oTempPrescItemVM.IsWardStock = oPrescItemView.IsWardStock;
      oTempPrescItemVM.LastSupplyNameMCIChild =
        oPrescItemView.LastSupplyNameMCIChild;
      oTempPrescItemVM.LastSupplyDTTMMCIChild =
        oPrescItemView.LastSupplyDTTMMCIChild;
      oTempPrescItemVM.VMVPIdentifyingName =
        oPrescItemView.VMVPMCIdentifyingName;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem =
        oTempParentPrescItemVM;
      oTempPrescItemVM.IsMCIComponent = true;
      oTempPrescItemVM.IsCallForFluid = false;
      if (
        oPrescItemViewDetails.oTechValidateDetails != null &&
        oPrescItemViewDetails.oTechValidateDetails.Count > 0 &&
        oPrescItemViewDetails.oTechValidateDetails.Any(
          (x) =>
            x.PrescriptionMultiComponentOID ==
            oTempPrescItemVM.PresMultiCompitemOID
        )
      ) {
        let TempoPrescItemViewDet: TechValidatedItem = new TechValidatedItem();
        TempoPrescItemViewDet = oPrescItemViewDetails.oTechValidateDetails
          .Where(
            (x) =>
              x.PrescriptionMultiComponentOID ==
              oTempPrescItemVM.PresMultiCompitemOID
          )
          .FirstOrDefault();
        if (
          TempoPrescItemViewDet != null &&
          TempoPrescItemViewDet.ReqIconShow
        ) {
          oTempPrescItemVM.IsOriginalSupplyRequested =
            oTempPrescItemVM.IsSupplyRequested = true;
          oTempPrescItemVM.RequestUrgency =
            TempoPrescItemViewDet.LastReqUrgency;
          oTempPrescItemVM.RequestedComments =
            TempoPrescItemViewDet.LastReqComments;
          oTempPrescItemVM.RequestedDTTM =
            TempoPrescItemViewDet.LastRequestedDateTime;
          oTempPrescItemVM.RequestedBy = TempoPrescItemViewDet.LastRequestedBy;
          oTempPrescItemVM.IsSupplyRequestedforReqMed = true;
        } else {
          oTempPrescItemVM.IsSupplyRequested = false;
        }
      } else {
        oTempPrescItemVM.IsSupplyRequested = false;
      }
      if (oTempPrescItemVM.iSSupplyrequest == null)
        oTempPrescItemVM.iSSupplyrequest =
          new ObservableCollection<CListItem>();
      let isCancelReqEnabled: boolean, requestPending;
      this.IsCancelRequestEnabled(
        oMedDispensingDetail,
        oTempPrescItemVM.PrescriptionItemOID,
        oTempPrescItemVM.PresMultiCompitemOID,
        0,
        (o1) => {
          isCancelReqEnabled = o1;
        },
        (o2) => {
          requestPending = o2;
        }
      );
      oTempPrescItemVM.MedDispRequestPending = requestPending;
      DomainValuesForTechValidate.SupplyRequest.forEach((objSupInfo) => {
        if (
          !String.Equals(
            objSupInfo.Value,
            CConstants.CancelSupplycode,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          oTempPrescItemVM.iSSupplyrequest.Add(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objSupInfo.DisplayText,
              Value: objSupInfo.Value,
            })
          );
        } else if (
          String.Equals(
            objSupInfo.Value,
            CConstants.CancelSupplycode,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          isCancelReqEnabled
        ) {
          oTempPrescItemVM.iSSupplyrequest.Add(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objSupInfo.DisplayText,
              Value: objSupInfo.Value,
            })
          );
        }
      });
      if (oTempPrescItemVM.iSSupplyrequest != null) {
        let objselectedval: CListItem = oTempPrescItemVM.iSSupplyrequest
          .Where(
            (x) =>
              !String.IsNullOrEmpty(x.Value) &&
              String.Equals(x.Value, Resource.TechValidate.Empty)
          )
          .FirstOrDefault();
        oTempPrescItemVM.SelectedSupplyreq = objselectedval;
      }
      oTempPrescItemVM.IsSupplyRequestedEnable = true;
      oTempPrescItemVM.RequisitionCACode = oPrescItemView.RequisitionCACode;
      oTempPrescItemVM.LorenzoID = oPrescItemView.LorenzoID;
      if (
        oPrescItemView.SupplyInstruction != null &&
        oPrescItemView.SupplyInstruction.Count > 0
      ) {
        let oSupplyText: StringBuilder = new StringBuilder();
        let oSupplyValue: StringBuilder = new StringBuilder();
        let UnresolvedSupInst: StringBuilder = new StringBuilder();
        if (
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction == null
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
            new ObservableCollection<CListItem>();
        let nSupplyInstCnt: number = oPrescItemView.SupplyInstruction.Count;
        let bSupplyInstResolved: boolean = false;
        for (let i: number = 0; i < nSupplyInstCnt; i++) {
          bSupplyInstResolved = false;
          if (
            !String.Equals(
              oPrescItemView.SupplyInstruction[i].Code,
              CConstants.Supplycomments
            )
          ) {
            if (
              MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                (x) => x.csCode == oPrescItemView.SupplyInstruction[i].Code
              ).Any()
            ) {
              lstTermtext =
                MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                  (x) => x.csCode == oPrescItemView.SupplyInstruction[i].Code
                );
              if (lstTermtext != null) {
                sTmpTermText += lstTermtext.First().csDescription;
                sConcpCode = oPrescItemView.SupplyInstruction[i].Code;
              }
              oSupplyValue.Append(oPrescItemView.SupplyInstruction[i].Code);
              oSupplyValue.Append(';');
              oSupplyText.Append(lstTermtext.First().csDescription);
              oSupplyText.Append(';');
              if (
                oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                  (c) => c.Value == oPrescItemView.SupplyInstruction[i].Code
                ).Count() == 0
              ) {
                oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: lstTermtext.First().csDescription,
                    Value: oPrescItemView.SupplyInstruction[i].Code,
                  })
                );
              }
            } else {
              oSupplyValue.Append(oPrescItemView.SupplyInstruction[i].Code);
              oSupplyValue.Append(';');
              bSupplyInstResolved = true;
            }
          }
          if (bSupplyInstResolved) {
            UnresolvedSupInst.Append(oPrescItemView.SupplyInstruction[i].Code);
            {
              UnresolvedSupInst.Append('~^~');
            }
          }
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction =
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
          new ObservableCollection<CListItem>();
        if (UnresolvedSupInst != null && UnresolvedSupInst.Length > 0) {
          let ResolvedSupplyInstFromTV: ObservableCollection<CListItem> =
            new ObservableCollection<CListItem>(
              MCommonBB.GetResolvedSupplyInstTermText(UnresolvedSupInst)
            );
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
            ResolvedSupplyInstFromTV;
        }
        let sText: string = String.Empty;
        let sValue: string = String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction,
          (o1) => {
            sText = o1;
          },
          (o2) => {
            sValue = o2;
          }
        );
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsText =
          !String.IsNullOrEmpty(sText) ? sText : String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal =
          !String.IsNullOrEmpty(sValue) ? sValue : String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSupplyComments =
          !String.IsNullOrEmpty(oPrescItemView.SupplyComments)
            ? oPrescItemView.SupplyComments
            : String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments =
          !String.IsNullOrEmpty(oPrescItemView.SupplyComments)
            ? oPrescItemView.SupplyComments
            : String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: sTmpTermText,
            Value: sConcpCode,
          });
        if (
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst !=
            null &&
          !String.Equals(
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst
              .Value,
            CConstants.Supplycomments,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          let supplyTextChk =
            MedicationCommonConceptCodeData.ConceptCodes.Where(
              (supplyText) =>
                supplyText.csCode ==
                oTempPrescItemVM.FormViewerDetails.BasicDetails
                  .TechValSupplyInst.Value
            ).Select((supplyText) => supplyText);
          if (supplyTextChk != null && supplyTextChk.Count() > 0) {
            oTempPrescItemVM.SupDisText =
              Resource.TechValidate.SupplyDispChild_Add_Text;
            oTempPrescItemVM.supToolTipDisText =
              Resource.TechValidate.Supplyinst +
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst
                .DisplayText +
              Environment.NewLine;
          }
        }
      }
      if (DateTime.NotEquals(oPrescItemView.NextSupplyDTTM, DateTime.MinValue)) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevNextSupplyDate =
          oPrescItemView.NextSupplyDTTM;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate =
          oPrescItemView.NextSupplyDTTM;
      }
      if (
        oPrescItemViewDetails != null &&
        oPrescItemViewDetails.oTechValidateDetails != null &&
        oPrescItemViewDetails.oTechValidateDetails.Count > 0
      ) {
        let techValidatedItems =
          oPrescItemViewDetails.oTechValidateDetails.Where(
            (x) => x.PrescriptionMultiComponentOID == oPrescItemView.OID
          );
        if (techValidatedItems != null && techValidatedItems.Count() > 0) {
          techValidatedItems.forEach((oTechVal) => {
            if (
              ((oTechVal.SupplyInstruction != null &&
                oTechVal.SupplyInstruction.Count > 0) ||
                !String.IsNullOrEmpty(oTechVal.SupplyComments) ||
                DateTime.NotEquals(oTechVal.NextSupplyDttm, DateTime.MinValue)) &&
              oTempPrescItemVM != null
            ) {
              oTempPrescItemVM.IsProdAvailForChild = true;
            }
          });
        }
      }
      if (
        oTempParentPrescItemVM != null &&
        oTempParentPrescItemVM.FormViewerDetails != null &&
        oTempParentPrescItemVM.FormViewerDetails.BasicDetails != null &&
        DateTime.NotEquals(oTempParentPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM,
          DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM =
          oTempParentPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM;
      }
      if (
        oPrescItemView.DispensingInstruction != null &&
        oPrescItemView.DispensingInstruction.Count > 0
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst =
          new ObservableCollection<CListItem>();
        oPrescItemView.DispensingInstruction.forEach((oDispens) => {
          if (
            String.Equals(
              oDispens.Code,
              CConstants.Addtionalcomments,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            oCListItem = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oDispens.Name,
              Value: oDispens.Code,
            });
          } else if (
            String.Equals(
              oDispens.Code,
              CConstants.Other,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.IsNullOrEmpty(oPrescItemView.OtherDispensingInstruction)
          ) {
            oCListItem = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oPrescItemView.OtherDispensingInstruction,
              Value: CConstants.Other,
              IsSelected: true,
            });
            oCListItem.Tag = oPrescItemView.OtherDispensingInstruction;
          } else {
            sTmpTermText = String.Empty;
            if (
              FormviewerComboValues.DispensingInstructions.Where(
                (x) => x.csCode == oDispens.Code
              ).Any()
            ) {
              lstTermtext = FormviewerComboValues.DispensingInstructions.Where(
                (x) => x.csCode == oDispens.Code
              );
              if (lstTermtext != null) {
                sTmpTermText = lstTermtext.First().csDescription;
              }
            }
            oCListItem = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: sTmpTermText,
              Value: oDispens.Code,
              IsSelected: true,
            });
          }
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst.Add(
            oCListItem
          );
        });
      }
      if (!String.IsNullOrEmpty(oPrescItemView.OtherDispensingInstruction))
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValOtherInst =
          oPrescItemView.OtherDispensingInstruction;
      if (
        oTempParentPrescItemVM != null &&
        String.Compare(
          oTempParentPrescItemVM.IsDeactivate,
          'Y',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        oTempPrescItemVM.IsSupplyRequestedEnable = false;
      }
      oTempPrescItemVM.IsControlledDrug = Convert.ToChar(
        oPrescItemView.IsControlledDrug
      );
      if (!String.IsNullOrEmpty(oPrescItemView.DrugProperties)) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties =
          new ObservableCollection<ManagePrescSer.DrugProperty>();
        let sArrCode: string[] = null;
        let DrugVal: string[] = null;
        sArrCode = oPrescItemView.DrugProperties.Split(',');
        for (let j: number = 0; j < sArrCode.length; j++) {
          DrugVal = sArrCode[j].Split('~');
          oTempPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(
            ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
              VMChildCode: Resource.TechValidate.CC_CHLD,
              DrugPropertyCode: !String.IsNullOrEmpty(DrugVal[0])
                ? DrugVal[0]
                : String.Empty,
              OccuranceCode: String.Empty,
              HighRiskMsg: String.Empty,
            })
          );
        }
      }
    }
    return oTempPrescItemVM;
  }
  private ConstructPrescriptionItemVM(
    oPrescItemView: IPPManagePrescSer.PrescriptionItemView,
    oMedDispensingDetail: MedDispensingDetail[]
  ): PrescriptionItemVM {
    let sDispToolTipText: StringBuilder = new StringBuilder();
    let sSuppToolTipText: string = String.Empty;
    CommonFlags.IsTechnicallyValidate = true;
    let oTempPrescItemVM: PrescriptionItemVM = new PrescriptionItemVM();
    oTempPrescItemVM.FormViewerDetails = new FormViewerVM();
    oTempPrescItemVM.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
    oTempPrescItemVM.FormViewerDetails.BasicDetails = new BasicDetailsVM(
      oTempPrescItemVM
    );
    let lstTermtext: IEnumerable<CValuesetTerm>;
    let sTmpTermText: string = String.Empty;
    let oCListItem: CListItem;
    let sConcpCode: string = String.Empty;
    let isDeactItems: boolean = false;
    oTempPrescItemVM.bAvoidNextSupplyFirsttime = false;
    if (oPrescItemView.oPrescriptionItem != null) {
      oTempPrescItemVM.PrescriptionOID =
        oPrescItemView.oPrescriptionItem.PrescriptionOID;
      if (oTempPrescItemVM.PrescriptionOID != null)
        this.PrescriptionIDS_FromGrid.Add(
          oTempPrescItemVM.PrescriptionOID.ToString()
        );
      if (oTempPrescItemVM.iSSupplyrequest == null)
        oTempPrescItemVM.iSSupplyrequest =
          new ObservableCollection<CListItem>();
      let isCancelReqEnabled: boolean, requestPending;
      this.IsCancelRequestEnabled(
        oMedDispensingDetail,
        oPrescItemView.PrescriptionItemOID,
        0,
        0,
        (o1) => {
          isCancelReqEnabled = o1;
        },
        (o2) => {
          requestPending = o2;
        }
      );
      oTempPrescItemVM.MedDispRequestPending = requestPending;
      DomainValuesForTechValidate.SupplyRequest.forEach((objSupInfo) => {
        if (objSupInfo != null && !String.IsNullOrEmpty(objSupInfo.Value)) {
          if (
            !String.Equals(
              objSupInfo.Value,
              CConstants.CancelSupplycode,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            oTempPrescItemVM.iSSupplyrequest.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: objSupInfo.DisplayText,
                Value: objSupInfo.Value,
              })
            );
          } else if (
            String.Equals(
              objSupInfo.Value,
              CConstants.CancelSupplycode,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            isCancelReqEnabled
          ) {
            oTempPrescItemVM.iSSupplyrequest.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: objSupInfo.DisplayText,
                Value: objSupInfo.Value,
              })
            );
          }
        }
      });
      if (oTempPrescItemVM.iSSupplyrequest != null) {
        let objselectedval: CListItem = oTempPrescItemVM.iSSupplyrequest
          .Where(
            (x) =>
              x != null &&
              !String.IsNullOrEmpty(x.Value) &&
              String.Equals(x.Value, Resource.TechValidate.Empty)
          )
          .FirstOrDefault();
        oTempPrescItemVM.SelectedSupplyreq = objselectedval;
      }
      oTempPrescItemVM.SupDisText =
        Resource.TechValidate.SupplyDispChild_Add_Text;
      oTempPrescItemVM.supToolTipDisText =
        Resource.TechValidate.AddsupinstChild;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingOID =
        oPrescItemView.oPrescriptionItem.IdentifyingOID;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
        oPrescItemView.oPrescriptionItem.IdentifyingType;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.MCVersion =
        oPrescItemView.oPrescriptionItem.MCVersionNo;
      oTempPrescItemVM.PrescriptionItemStatus =
        oPrescItemView.oPresItemBasicPropertiesView.DrugStatus;
      oTempPrescItemVM.IsCriticalMed =
        oPrescItemView.oPresItemBasicPropertiesView.IsCriticalMed;
      oTempPrescItemVM.IsMCIComponent = false;
      oTempPrescItemVM.IsCallForFluid = false;
      oTempPrescItemVM.OperationMode = 'UM';
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
        oPrescItemView.oPrescriptionItem.IsConditionalExists;
      if (oPrescItemView.oPresItemBasicPropertiesView != null) {
        if (
          String.Equals(
            oPrescItemView.oPrescriptionItem.LorenzoID,
            CConstants.ADHOC_ITEM_LORENZOID
          )
        ) {
          let sMCIcomponents: string[] = null;
          let sMCCompDisplay: string[] = null;
          let sMCIComponents: StringBuilder = new StringBuilder();
          let nLength: number;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.MCILorenzoID =
            oPrescItemView.oPrescriptionItem.LorenzoID;
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oPresItemBasicPropertiesView.MCIItemDisplay
            )
          ) {
            sMCIcomponents =
              oPrescItemView.oPresItemBasicPropertiesView.MCIItemDisplay.Split(
                '^'
              );
            if (sMCIcomponents != null) {
              nLength = sMCIcomponents.length;
              if (nLength <= 5) {
                for (let i: number = 0; i < nLength; i++) {
                  sMCCompDisplay = sMCIcomponents[i].Split('~');
                  sMCIComponents.Append(sMCCompDisplay[0]);
                  sMCIComponents.Append(Environment.NewLine);
                }
                oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
                  Convert.ToString(sMCIComponents);
              } else {
                oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
                  (oPrescItemView != null &&
                  oPrescItemView.oPrescriptionItem != null &&
                  !String.IsNullOrEmpty(
                    oPrescItemView.oPrescriptionItem.VMVPIdentifyingName
                  )
                    ? oPrescItemView.oPrescriptionItem.VMVPIdentifyingName +
                      ' - '
                    : String.Empty) +
                  oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem
                    .Name;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalIdentifyingName =
                  oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
              }
            }
          } else {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
              (oPrescItemView != null &&
              oPrescItemView.oPrescriptionItem != null &&
              !String.IsNullOrEmpty(
                oPrescItemView.oPrescriptionItem.VMVPIdentifyingName
              )
                ? oPrescItemView.oPrescriptionItem.VMVPIdentifyingName + ' - '
                : String.Empty) +
              oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
            oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalIdentifyingName =
              oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
          }
        } else {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
            (oPrescItemView != null &&
            oPrescItemView.oPrescriptionItem != null &&
            !String.IsNullOrEmpty(
              oPrescItemView.oPrescriptionItem.VMVPIdentifyingName
            )
              ? oPrescItemView.oPrescriptionItem.VMVPIdentifyingName + ' - '
              : String.Empty) +
            oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalIdentifyingName =
            oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.PRNInstructionFreeText =
          oPrescItemView.oPresItemBasicPropertiesView.PRNInstructionValue;
      }
      oTempPrescItemVM.IsNonformulary =
        oPrescItemView.oPrescriptionItem.IsNonformulary;
      if (oPrescItemView.oPrescriptionItem.PrescriptionBasicData != null) {
        if (
          DateTime.NotEquals(oPrescItemView.oPrescriptionItem.PrescriptionBasicData
            .PrescriptionDTTM, DateTime.MinValue)
        )
          oTempPrescItemVM.PrescriptionDTTM =
            oPrescItemView.oPrescriptionItem.PrescriptionBasicData.PrescriptionDTTM;
      }
      let IPPPresItem: IPPManagePrescSer.IPPPrescriptionItem =
        ObjectHelper.CreateType<IPPManagePrescSer.IPPPrescriptionItem>(
          oPrescItemView.oPrescriptionItem,
          IPPManagePrescSer.IPPPrescriptionItem
        );
      if (IPPPresItem != null) {
        if (IPPPresItem.Instruction != null) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: IPPPresItem.Instruction.Name,
            });
        }
        if (!String.IsNullOrEmpty(IPPPresItem.StrengthText)) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.Strength =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: IPPPresItem.StrengthText,
              Value: IPPPresItem.StrengthText,
            });
        }
      }
      if (
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Strength == null ||
        (oTempPrescItemVM.FormViewerDetails.BasicDetails.Strength != null &&
          String.IsNullOrEmpty(
            oTempPrescItemVM.FormViewerDetails.BasicDetails.Strength.DisplayText
          ))
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Strength =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oPrescItemView.oPrescriptionItem.sStrength,
            Value: oPrescItemView.oPrescriptionItem.sStrength,
          });
      }
    }
    if (oPrescItemView.oPresItemBasicPropertiesView != null) {
      oTempPrescItemVM.PrescriptionType =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Code;
      oTempPrescItemVM.PrescriptionItem =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
      oTempPrescItemVM.PrescriptionItemOID =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.OID;
      oTempPrescItemVM.PrescriptionItemStatusCode =
        oPrescItemView.oPrescriptionItem.PrescriptionItemStatus;
      oTempPrescItemVM.PrescriptionItemStatus =
        oPrescItemView.oPrescriptionItem.PrescriptionItemStatus;
      oTempPrescItemVM.IsAmendment =
        oPrescItemView.oPrescriptionItem.IsAmendment;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit =
        oPrescItemView.oPresItemBasicPropertiesView.IsinDefiniteOmit;
      if (
        DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM,
        DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM =
          oPrescItemView.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM;
      }
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.OmitComments
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.OmitComments =
          oPrescItemView.oPresItemBasicPropertiesView.OmitComments;
      }
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.OmittedBy
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.OmittedBy =
          oPrescItemView.oPresItemBasicPropertiesView.OmittedBy;
      }
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.MCIItemDisplay
        )
      ) {
        let sTooltip: string[] = null;
        let sMCTooltips: string[] = null;
        let sMcitemdisplay: StringBuilder = new StringBuilder();
        sTooltip =
          oPrescItemView.oPresItemBasicPropertiesView.MCIItemDisplay.Split('^');
        let nLength: number = sTooltip.length;
        for (let i: number = 0; i < nLength; i++) {
          sMCTooltips = sTooltip[i].Split('~');
          sMcitemdisplay.Append(sMCTooltips[0]);
          sMcitemdisplay.Append('^');
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay =
          sMcitemdisplay.ToString();
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop =
        oPrescItemView.oPresItemBasicPropertiesView.MCIItemDisplay;
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.ItemSubType
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType =
          oPrescItemView.oPresItemBasicPropertiesView.ItemSubType;
        oTempPrescItemVM.ItemSubType =
          oPrescItemView.oPresItemBasicPropertiesView.ItemSubType;
      }
      oTempPrescItemVM.IsWardStock =
        oPrescItemView.oPresItemBasicPropertiesView.IsWardStock;
      switch (oPrescItemView.oPresItemBasicPropertiesView.IsSupplyRequested) {
        case '1':
        case '2':
          oTempPrescItemVM.IsOriginalSupplyRequested =
            oTempPrescItemVM.IsSupplyRequested = true;
          oTempPrescItemVM.RequestUrgency =
            oPrescItemView.oPresItemBasicPropertiesView.RequestUrgency;
          oTempPrescItemVM.RequestedComments =
            oPrescItemView.oPresItemBasicPropertiesView.RequestedComments;
          oTempPrescItemVM.RequestedDTTM =
            oPrescItemView.oPresItemBasicPropertiesView.RequestedDTTM;
          oTempPrescItemVM.RequestedBy =
            oPrescItemView.oPresItemBasicPropertiesView.RequestedBy;
          break;
        default:
          oTempPrescItemVM.IsSupplyRequested = false;
          break;
      }
      oTempPrescItemVM.IsSupplyRequestedEnable = true;
      oTempPrescItemVM.IsSupplyRequestedforReqMed =
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.IsSupplyRequested.ToString()
        ) &&
        String.Compare(
          oPrescItemView.oPresItemBasicPropertiesView.IsSupplyRequested.ToString(),
          '0',
          StringComparison.InvariantCultureIgnoreCase
        ) != 0
          ? true
          : false;
      oTempPrescItemVM.RequisitionCACode =
        oPrescItemView.oPresItemBasicPropertiesView.RequisitionCACode;
      oTempPrescItemVM.LorenzoID = oPrescItemView.oPrescriptionItem.LorenzoID;
      oTempPrescItemVM.IsControlledDrug = Convert.ToChar(
        oPrescItemView.oPresItemBasicPropertiesView.IsControlledDrug
      );
      oTempPrescItemVM.CheckForTechValidateMandatory();
      oTempPrescItemVM.IsDeactivate =
        oPrescItemView.oPresItemBasicPropertiesView.IsDeactivated.ToString();
      if (
        String.Equals(
          oTempPrescItemVM.IsDeactivate,
          'Y',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        isDeactItems = true;
        if (String.IsNullOrEmpty(this._DeactivatedPrescItems))
          this._DeactivatedPrescItems = oTempPrescItemVM.PrescriptionItem;
        else
          this._DeactivatedPrescItems +=
            ', ' + oTempPrescItemVM.PrescriptionItem;
      }
      if (
        oPrescItemView.oPrescriptionItem.MCIDEActiveItems != null &&
        oPrescItemView.oPrescriptionItem.MCIDEActiveItems.Count > 0
      ) {
        isDeactItems = true;
        let data: string = String.Empty;
        for (
          let i: number = 0;
          i < oPrescItemView.oPrescriptionItem.MCIDEActiveItems.Count;
          i++
        ) {
          data += oPrescItemView.oPrescriptionItem.MCIDEActiveItems[i] + ' ';
        }
        if (!String.IsNullOrEmpty(data) && !String.Equals(data, ' ')) {
          if (!String.IsNullOrEmpty(this._DeactivatedCompItems))
            this._DeactivatedCompItems += ',';
          this._DeactivatedCompItems =
            this._DeactivatedCompItems +
            oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name +
            ' - ' +
            data;
          this._DeactivatedCompItems += '\n';
        }
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Direction =
        oPrescItemView.oPresItemBasicPropertiesView.Direction;
      oTempPrescItemVM.IsPGD = oPrescItemView.oPrescriptionItem.IsPGD;
      if (
        DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.StartDate,
        DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.StartDTTM =
          oPrescItemView.oPresItemBasicPropertiesView.StartDate;
      }
      if (
        DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.EndDate, DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.EndDTTM =
          oPrescItemView.oPresItemBasicPropertiesView.EndDate;
      }
      if (
        String.Equals(
          oPrescItemView.oPresItemBasicPropertiesView.ExistsOnAdmission,
          '1'
        ) ||
        String.Equals(
          oPrescItemView.oPresItemBasicPropertiesView.ExistsOnAdmission,
          '2'
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDispalyOnadmission =
          Visibility.Visible;
      } else {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDispalyOnadmission =
          Visibility.Collapsed;
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.AdminInstruction instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.AdminInstruction.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemBasicPropertiesView.AdminInstruction.Name,
            Value: String.Empty,
          });
        oTempPrescItemVM.FormViewerDetails.BasicDetails.OtherAdminiInstruction =
          oPrescItemView.oPresItemBasicPropertiesView.AdminInstruction.Name;
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.Form instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.Form.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DosageForm =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oPrescItemView.oPresItemBasicPropertiesView.Form.Name,
            Value:
              oPrescItemView.oPresItemBasicPropertiesView.Form.OID.ToString(),
          });
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSupplyComments =
        oPrescItemView.oPrescriptionItem.Supplycomments;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.PreviousComments =
        oPrescItemView.oPrescriptionItem.Supplycomments;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments =
        oPrescItemView.oPrescriptionItem.Supplycomments;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevNextSupplyDate =
        oPrescItemView.oPrescriptionItem.NextSupplyDTTM;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalNextSupplyDate =
        oPrescItemView.oPrescriptionItem.NextSupplyDTTM;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate =
        oPrescItemView.oPrescriptionItem.NextSupplyDTTM;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.RangeStartNextSupply =
        DateTime.MinValue.Date;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Dose =
        oPrescItemView.oPresItemBasicPropertiesView.Dose;
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.DoseType
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DoseType =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oPrescItemView.oPresItemBasicPropertiesView.DoseType,
            Value: oPrescItemView.oPresItemBasicPropertiesView.DoseType,
          });
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction instanceof
          ObservableCollection &&
        oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction.Count > 0
      ) {
        let oSupplyText: StringBuilder = new StringBuilder();
        let oSupplyValue: StringBuilder = new StringBuilder();
        let UnresolvedSupInst: StringBuilder = new StringBuilder();
        if (
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction == null
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
            new ObservableCollection<CListItem>();
        let nSupplyInstCnt: number =
          oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction.Count;
        let bSupplyInstResolved: boolean = false;
        for (let i: number = 0; i < nSupplyInstCnt; i++) {
          bSupplyInstResolved = false;
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code
            ) &&
            !String.Equals(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code,
              CConstants.Supplycomments
            )
          ) {
            if (
              MedicationCommonConceptCodeData.ViewConceptCodes != null &&
              MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
            ) {
              if (
                MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                  (x) =>
                    x != null &&
                    !String.IsNullOrEmpty(x.csCode) &&
                    x.csCode ==
                      oPrescItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i].Code
                ).Any()
              ) {
                lstTermtext =
                  MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                    (x) =>
                      x != null &&
                      !String.IsNullOrEmpty(x.csCode) &&
                      x.csCode ==
                        oPrescItemView.oPresItemBasicPropertiesView
                          .SupplyInstruction[i].Code
                  );
                if (lstTermtext != null) {
                  oSupplyValue.Append(
                    oPrescItemView.oPresItemBasicPropertiesView
                      .SupplyInstruction[i].Code
                  );
                  oSupplyValue.Append(';');
                  oSupplyText.Append(lstTermtext.First().csDescription);
                  oSupplyText.Append(';');
                  if (
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                      (c) =>
                        c != null &&
                        !String.IsNullOrEmpty(c.Value) &&
                        c.Value ==
                          oPrescItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code
                    ).Count() == 0
                  ) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(
                      ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: lstTermtext.First().csDescription,
                        Value:
                          oPrescItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code,
                      })
                    );
                  }
                }
              } else {
                oSupplyValue.Append(
                  oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[
                    i
                  ].Code
                );
                oSupplyValue.Append(';');
                bSupplyInstResolved = true;
              }
            }
          }
          if (bSupplyInstResolved) {
            UnresolvedSupInst.Append(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code
            );
            {
              UnresolvedSupInst.Append('~^~');
            }
          }
        }
        if (
          oTempPrescItemVM != null &&
          oTempPrescItemVM.FormViewerDetails != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction.Count > 0
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction =
            oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
          new ObservableCollection<CListItem>();
        if (UnresolvedSupInst != null && UnresolvedSupInst.Length > 0) {
          let ResolvedSupplyInstFromTV: ObservableCollection<CListItem> =
            new ObservableCollection<CListItem>(
              MCommonBB.GetResolvedSupplyInstTermText(UnresolvedSupInst)
            );
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
            ResolvedSupplyInstFromTV;
        }
        let sText: string = String.Empty;
        let sValue: string = String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction,
          (o1) => {
            sText = o1;
          },
          (o2) => {
            sValue = o2;
          }
        );
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsText =
          !String.IsNullOrEmpty(sText) ? sText : String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal =
          !String.IsNullOrEmpty(sValue) ? sValue : String.Empty;
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction !=
          null &&
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction
          .Count > 0
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingInstruction =
          new ObservableCollection<CListItem>();
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction.forEach(
          (oDispens) => {
            if (
              String.Equals(
                oDispens.Code,
                CConstants.Addtionalcomments,
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingAdditionalComments =
                oDispens.Name;
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: oDispens.Name,
                Value: oDispens.Code,
              });
            } else if (
              String.Equals(
                oDispens.Code,
                CConstants.Other,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.IsNullOrEmpty(
                oPrescItemView.oPresItemBasicPropertiesView
                  .OtherDispensingInstruction
              )
            ) {
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescItemView.oPresItemBasicPropertiesView
                    .OtherDispensingInstruction,
                Value: CConstants.Other,
                IsSelected: true,
              });
              oCListItem.Tag =
                oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
            } else {
              sTmpTermText = String.Empty;
              if (
                MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
              ) {
                if (
                  !String.IsNullOrEmpty(oDispens.Code) &&
                  MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                    (x) =>
                      x != null &&
                      !String.IsNullOrEmpty(x.csCode) &&
                      x.csCode == oDispens.Code
                  ).Any()
                ) {
                  lstTermtext =
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) =>
                        x != null &&
                        !String.IsNullOrEmpty(x.csCode) &&
                        x.csCode == oDispens.Code
                    );
                  if (lstTermtext != null) {
                    sTmpTermText = lstTermtext.First().csDescription;
                  }
                }
              }
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: sTmpTermText,
                Value: oDispens.Code,
                IsSelected: true,
              });
            }
            oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingInstruction.Add(
              oCListItem
            );
          }
        );
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName =
        oPrescItemView.oPresItemAdditionalProperties.GroupHeaderName;
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.OtherDispensingInstruction =
          oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
        if (oTempPrescItemVM.FormViewerDetails.TechvalidateCADetails != null) {
          oTempPrescItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction =
            oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
        }
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Duration =
        oPrescItemView.oPresItemBasicPropertiesView.Duration;
      if (
        oPrescItemView.oPresItemBasicPropertiesView.TreatmentToCont instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.TreatmentToCont.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemBasicPropertiesView.TreatmentToCont.Name,
            Value:
              oPrescItemView.oPresItemBasicPropertiesView.TreatmentToCont.OID.ToString(),
            Tag: oPrescItemView.oPresItemBasicPropertiesView.TreatmentToCont,
          });
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.DrugProperties != null &&
        oPrescItemView.oPresItemBasicPropertiesView.DrugProperties.Count > 0
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties =
          new ObservableCollection<ManagePrescSer.DrugProperty>();
        oPrescItemView.oPresItemBasicPropertiesView.DrugProperties.forEach(
          (oDrugProp) => {
            if (oDrugProp != null) {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(
                ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                  VMChildCode: Resource.TechValidate.CC_CHLD,
                  DrugPropertyCode: oDrugProp.DrugPropertyCode,
                  OccuranceCode: oDrugProp.OccuranceCode,
                  HighRiskMsg: oDrugProp.HighRiskMsg,
                })
              );
            }
          }
        );
      }
      if (
        oPrescItemView.oPrescriptionItem != null &&
        oPrescItemView.oPrescriptionItem.DaysOfWeeks != null &&
        oPrescItemView.oPrescriptionItem.DaysOfWeeks.Count > 0 &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPrescriptionItem.DrugFreqUOMCode
        ) &&
        String.Equals(
          oPrescItemView.oPrescriptionItem.DrugFreqUOMCode,
          'CC_MEDDRSN2',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
          MedicationCommonBB.ConstructDaysOfWeek(
            oPrescItemView.oPrescriptionItem.DaysOfWeeks
          );
      }
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.Frequency
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Frequency =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oPrescItemView.oPresItemBasicPropertiesView.Frequency,
            Value: oPrescItemView.oPresItemBasicPropertiesView.Frequency,
          });
      }
      if (
        !String.IsNullOrEmpty(oPrescItemView.oPresItemBasicPropertiesView.Site)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Site =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oPrescItemView.oPresItemBasicPropertiesView.Site,
            Value: oPrescItemView.oPresItemBasicPropertiesView.Site,
          });
      }
      if (
        String.Equals(
          oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE
        ) ||
        (oPrescItemView.oPresItemBasicPropertiesView != null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters !=
            null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData != null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.FluidIdentifyingOID > 0)
      ) {
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPrescriptionItem.SupplyByAtMCIFluidParent
          ) &&
          DateTime.NotEquals(oPrescItemView.oPrescriptionItem.LastSupplyDTTMMCIFluidParent,
            DateTime.MinValue)
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyBy =
            oPrescItemView.oPrescriptionItem.SupplyByAtMCIFluidParent +
            Environment.NewLine +
            oPrescItemView.oPrescriptionItem.LastSupplyDTTMMCIFluidParent.ToString(
              CConstants.DateHMFormat
            );
        }
      } else {
        if (
          !String.Equals(
            oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
            CConstants.SUBTYPE
          ) &&
          !String.IsNullOrEmpty(oPrescItemView.oPrescriptionItem.SupplyByAt) &&
           DateTime.NotEquals(oPrescItemView.oPrescriptionItem.LastSupplyDTTM, DateTime.MinValue)
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyBy =
            oPrescItemView.oPrescriptionItem.SupplyByAt +
            Environment.NewLine +
            oPrescItemView.oPrescriptionItem.LastSupplyDTTM.ToString(
              CConstants.DateHMFormat
            );
        }
      }
      if (
        ProfileData.AdditionalPrescConfig != null &&
        ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
        oTempPrescItemVM.IsWardStock &&
        !String.IsNullOrEmpty(PatientContext.PrescriptionType) &&
        String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.ForAdministration,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          oTempPrescItemVM.PrescriptionItemStatus,
          CConstants.CANCELLED
        ) &&
        !String.Equals(
          oTempPrescItemVM.PrescriptionItemStatus,
          CConstants.DISCONTINUED
        ) &&
        !String.Equals(
          oTempPrescItemVM.PrescriptionItemStatus,
          CConstants.COMPLETED
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IsWardStockIconVisible =
          Visibility.Visible;
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.Quantity =
        oPrescItemView.oPresItemBasicPropertiesView.Quantity;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.QuantityUOMName =
        oPrescItemView.oPresItemBasicPropertiesView.QuantityUOMName;
      if (
        oPrescItemView.oPresItemBasicPropertiesView.Route instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.Route.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Route =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: MedicationCommonBB.RouteName(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
            Value: MedicationCommonBB.RouteOID(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
            Tag: MedicationCommonBB.RouteTag(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
          });
      }
    }
    if (
      oPrescItemView.oPresItemBasicPropertiesView != null &&
      oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters != null
    ) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
        new InfusionVM(oTempPrescItemVM.FormViewerDetails.BasicDetails);
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionType =
        new CListItem();
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionType.Value =
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.INFTYCODE;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionType.DisplayText =
        CommonBB.GetText(
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .INFTYCODE,
          InfusionTypeConceptCodeData.ConceptCodes
        );
      if (
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .DeliveryDeviceList != null
      ) {
        let obj =
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceList.Where(
            (odelivery) =>
              odelivery.DisplayText ==
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDevice
          ).Select((odelivery) => odelivery);
        if (obj.Count() > 0) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice =
            ObjectHelper.CreateType<CListItem>(obj.First(), CListItem);
        } else {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDevice;
        }
      } else {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDevice;
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
          .AdminDeviceData != null
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRate;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateUOMOID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateDenaminatorUOMOID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOMOID;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.BackgroundRateUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BackgroundRateUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateNumeratorUom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .AdminDeviceData.BackgroundRateUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString(),
            });
        }
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.BackgroundRateDenaminatorUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateDinominatorUom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString(),
            });
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDose;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.TopUpDoseUOM.UOMName,
            Value:
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString(),
          });
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.LockOutPeriod > 0
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LockOutPeriod =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriod.ToString();
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LockoutDuration =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.LockOutPeriodUOM.UOMName,
            Value:
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString(),
          });
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.MonitorPeriod
          )
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriod =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.MonitorPeriod;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.MonitorPeriodUOM != null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.MonitorPeriodUOM.UOMId > 0
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriodUOM =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .AdminDeviceData.MonitorPeriodUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString(),
            });
        }
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
          .IntravenousInfusionData != null
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TargetUpperSatRange =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper.ToString();
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TargetLowerSatRange =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString();
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MaxDose =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.MaxDose;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Lumen =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Lumen;
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.IsOnGoing
          )
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOnGoing =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOnGoing;
        else
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOnGoing =
            String.Empty;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.ReviewAfter =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfter;
        if (
          DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .ReviewAfterDTTM, DateTime.MinValue)
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.ReviewAfterDTTM =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .ReviewComments
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.ReviewRequestComments =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewComments;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .ReviewRequestedBy
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewRequestedBy;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .ReviewType
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.ReviewType =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewType;
        }
        if (
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .ConcentrationsList != null
        ) {
          let obj =
            oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationsList.Where(
              (oConcentration) =>
                oConcentration.DisplayText ==
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString()
            ).Select((oConcentration) => oConcentration);
          if (obj.Count() > 0) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Concentration =
              ObjectHelper.CreateType<CListItem>(obj.First(), CListItem);
          } else {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText =
              oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString();
          }
        } else {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString();
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.HUMIDCode
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Humidification =
            ObjectHelper.CreateObject(new CListItem(), {
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.HUMIDCode,
            });
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Rate;
        oTempPrescItemVM.formViewerDetails.BasicDetails.InfusionDetails.UpperRate =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperRate;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.RateUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.RateUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.RateUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString(),
            });
        }
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.RateDenominatorUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.RateDenominatorUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString(),
            });
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.LowConcentration
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentration =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentration.ToString();
        }
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.LowConcentrationUOMOID != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.LowConcentrationUOMOID.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentrationUOM =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.LowConcentrationUOMOID.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMId.ToString(),
            });
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.UpperConcentration
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentration =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentration.ToString();
        }
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.UpperConcentrationUOMOID != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.UpperConcentrationUOMOID.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentrationUOM =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.UpperConcentrationUOMOID.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMId.ToString(),
            });
        }
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.InfusionPeriod
          )
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriod;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.InfusionPeriodUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.InfusionPeriodUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.InfusionPeriodUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString(),
            });
        }
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.Fluid != null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.Fluid.OID > 0
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.Fluid.Name,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString(),
            });
        } else {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidFreetext =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.Name;
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Volume;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.VolumeUOM != null &&
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.VolumeUOM.UOMName
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.VolumeUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString(),
            });
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TotalCountSeq =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionSeqCount;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsFirstItem =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsFirstItem;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsLastItem;
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BoosterDose
          ) &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData.BoosterDoseUOM != null
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose =
            oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDose;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdoseuom =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .AdminDeviceData.BoosterDoseUOM.UOMName,
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMId.ToString(),
            });
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidIdentifyingType =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidIdentifyingType;
      }
    }
    if (oPrescItemView.oPresItemAdditionalProperties != null) {
      if (
        oPrescItemView.oPresItemAdditionalProperties.AdminMethod instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemAdditionalProperties.AdminMethod.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.AdminMethod =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemAdditionalProperties.AdminMethod.Name,
            Value:
              oPrescItemView.oPresItemAdditionalProperties.AdminMethod.OID.ToString(),
          });
      }
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemAdditionalProperties.AdditionalComments
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.AdditionalComments =
          oPrescItemView.oPresItemAdditionalProperties.AdditionalComments;
      }
      oTempPrescItemVM.OtherInformation =
        oPrescItemView.oPresItemAdditionalProperties.DrugAttributes;
      if (
        oPrescItemView.oPresItemAdditionalProperties.MedClerkModifyReason !=
        null
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemAdditionalProperties.MedClerkModifyReason
                .Code,
            Value:
              oPrescItemView.oPresItemAdditionalProperties.MedClerkModifyReason
                .Code,
            Tag: oPrescItemView.oPresItemAdditionalProperties
              .MedClerkModifyReason,
          });
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.NoOfInstallments =
        oPrescItemView.oPresItemAdditionalProperties.NoOfInstallments;
      if (
        oPrescItemView.oPresItemAdditionalProperties.StationeryType instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemAdditionalProperties.StationeryType.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.StationaryType =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText:
              oPrescItemView.oPresItemAdditionalProperties.StationeryType.Name,
            Value:
              oPrescItemView.oPresItemAdditionalProperties.StationeryType.OID.ToString(),
            Tag: oPrescItemView.oPresItemAdditionalProperties.StationeryType,
          });
      }
    }
    if (
      oPrescItemView != null &&
      oPrescItemView.oPrescriptionItemAddnView != null &&
      oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails !=
        null
    ) {
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails
            .Comments
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedComments =
          oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.Comments;
      }
      if (
        oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails
          .PerformedBy != null
      ) {
        if (
          !String.IsNullOrEmpty(
            oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails
              .PerformedBy.Name
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedBy =
            oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.PerformedBy.Name;
        }
      }
      if (
        DateTime.NotEquals(oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails
          .PerformedDTTM, DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.ClinicallyVerifiedAt =
          oPrescItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.PerformedDTTM;
      }
    }
    if (
      oPrescItemView != null &&
      oPrescItemView.oPrescriptionItem != null &&
      oPrescItemView.oPrescriptionItem.PrescriptionItemStatus != null
    ) {
      oTempPrescItemVM.IsAlreadyClinicallyVerified =
        oPrescItemView.oPrescriptionItem.PrescriptionItemStatus.Equals(
          CConstants.CLINICALLYVERIFIED,
          StringComparison.OrdinalIgnoreCase
        );
    }
    if (oPrescItemView.oPresItemBasicPropertiesView != null) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDoseCalcExist =
        oPrescItemView.oPresItemBasicPropertiesView.isDoseCalcExist;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.DoseCalcExist =
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDoseCalcExist
          ? '1'
          : '0';
      if (
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DoseCalcExist == '1'
      ) {
        let DCalDTTM = oPrescItemView.oPresItemBasicPropertiesView.DCCalDTTM;
        if (DateTime.GreaterThan(this.HWLatestDTTM, DCalDTTM)) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.DoseCalcExist = '2';
        }
      }
    }
    if (oPrescItemView.oPresItemBasicPropertiesView != null) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText =
        oPrescItemView.oPresItemBasicPropertiesView.TechSupplyInstruction;
    }
    if (
      oPrescItemView != null &&
      oPrescItemView.oPresItemBasicPropertiesView != null &&
      oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM != null &&
      DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM,
        DateTime.MinValue)
    ) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM =
        oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM;
    }
    if (
      oPrescItemView.oTechValidateDetails != null &&
      oPrescItemView.oTechValidateDetails.Count > 0 &&
      oPrescItemView.oTechValidateDetails.Any(
        (x) => x.FluidPrescribableItemListOID == 0
      )
    ) {
      let nTechDetail: number = 0;
      nTechDetail = oPrescItemView.oTechValidateDetails.Count;
      for (let nCnt: number = 0; nCnt < nTechDetail; nCnt++) {
        if (
          oPrescItemView.oTechValidateDetails[nCnt].IsDoseCombinationsDefined ==
          '0'
        ) {
          sTmpTermText = String.Empty;
          if (
            oPrescItemView.oTechValidateDetails[nCnt]
              .SupplyInstruction instanceof ObservableCollection &&
            oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction !=
              null &&
            oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction.Count >
              0 &&
            oPrescItemView.oTechValidateDetails[nCnt]
              .FluidPrescribableItemListOID == 0
          ) {
            let nSupplyInstCnt: number =
              oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction.Count;
            if (
              oTempPrescItemVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction == null
            )
              oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                new ObservableCollection<CListItem>();
            for (let i: number = 0; i < nSupplyInstCnt; i++) {
              if (
                !oPrescItemView.SupplyExistsForMCIComp &&
                !String.IsNullOrEmpty(
                  oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction[i]
                    .Code
                ) &&
                !String.Equals(
                  oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction[i]
                    .Code,
                  CConstants.Supplycomments
                )
              ) {
                if (
                  MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                  MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
                ) {
                  if (
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) =>
                        x != null &&
                        !String.IsNullOrEmpty(x.csCode) &&
                        x.csCode ==
                          oPrescItemView.oTechValidateDetails[nCnt]
                            .SupplyInstruction[i].Code
                    ).Any()
                  ) {
                    lstTermtext =
                      MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                        (x) =>
                          x != null &&
                          !String.IsNullOrEmpty(x.csCode) &&
                          x.csCode ==
                            oPrescItemView.oTechValidateDetails[nCnt]
                              .SupplyInstruction[i].Code
                      );
                    if (lstTermtext != null) {
                      sTmpTermText += lstTermtext.First().csDescription;
                      sConcpCode =
                        oPrescItemView.oTechValidateDetails[nCnt]
                          .SupplyInstruction[i].Code;
                      if (
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                          (c) =>
                            c != null &&
                            !String.IsNullOrEmpty(c.Value) &&
                            c.Value ==
                              oPrescItemView.oTechValidateDetails[nCnt]
                                .SupplyInstruction[i].Code
                        ).Count() == 0
                      ) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(
                          ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: lstTermtext.First().csDescription,
                            Value:
                              oPrescItemView.oTechValidateDetails[nCnt]
                                .SupplyInstruction[i].Code,
                          })
                        );
                      }
                    }
                  }
                }
              }
            }
            let sArrCode: string[] = null;
            let mcisupplyinst: string = String.Empty;
            if (
              String.Equals(
                oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
                CConstants.SUBTYPE
              ) &&
              !String.IsNullOrEmpty(
                oPrescItemView.oPresItemBasicPropertiesView
                  .TechSupplyInstruction
              )
            ) {
              sArrCode =
                oPrescItemView.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(
                  '^'
                );
              mcisupplyinst = sArrCode[0];
            }
            if (
              String.Equals(
                oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
                CConstants.SUBTYPE
              ) &&
              String.IsNullOrEmpty(mcisupplyinst)
            ) {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
                new CListItem();
            } else {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: sTmpTermText,
                  Value: sConcpCode,
                });
            }
          }
          if (
            oPrescItemView.oTechValidateDetails[nCnt].DispensingInstruction !=
              null &&
            oPrescItemView.oTechValidateDetails[nCnt].DispensingInstruction
              .Count > 0
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst =
              new ObservableCollection<CListItem>();
            oPrescItemView.oTechValidateDetails[
              nCnt
            ].DispensingInstruction.forEach((oDispens) => {
              if (
                String.Equals(
                  oDispens.Code,
                  CConstants.Addtionalcomments,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: oDispens.Name,
                  Value: oDispens.Code,
                });
              } else if (
                String.Equals(
                  oDispens.Code,
                  CConstants.Other,
                  StringComparison.InvariantCultureIgnoreCase
                ) &&
                !String.IsNullOrEmpty(
                  oPrescItemView.oTechValidateDetails[nCnt]
                    .OtherDispensingInstruction
                )
              ) {
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    oPrescItemView.oTechValidateDetails[nCnt]
                      .OtherDispensingInstruction,
                  Value: CConstants.Other,
                  IsSelected: true,
                });
                oCListItem.Tag =
                  oPrescItemView.oTechValidateDetails[
                    nCnt
                  ].OtherDispensingInstruction;
              } else {
                sTmpTermText = String.Empty;
                if (
                  MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                  MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
                ) {
                  if (
                    !String.IsNullOrEmpty(oDispens.Code) &&
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) =>
                        x != null &&
                        !String.IsNullOrEmpty(x.csCode) &&
                        x.csCode == oDispens.Code
                    ).Any()
                  ) {
                    lstTermtext =
                      MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                        (x) =>
                          x != null &&
                          !String.IsNullOrEmpty(x.csCode) &&
                          x.csCode == oDispens.Code
                      );
                    if (lstTermtext != null) {
                      sTmpTermText = lstTermtext.First().csDescription;
                    }
                  }
                }
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: sTmpTermText,
                  Value: oDispens.Code,
                  IsSelected: true,
                });
              }
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst.Add(
                oCListItem
              );
              sDispToolTipText.Append(oCListItem.DisplayText);
              if (
                oTempPrescItemVM.FormViewerDetails.BasicDetails
                  .TechValDispensingInst.Count > 0
              )
                sDispToolTipText.Append(',');
            });
          }
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oTechValidateDetails[nCnt]
                .OtherDispensingInstruction
            )
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValOtherInst =
              oPrescItemView.oTechValidateDetails[
                nCnt
              ].OtherDispensingInstruction;
            sDispToolTipText.Append(
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValOtherInst
            );
          }
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechPresItemTechOID =
            oPrescItemView.oTechValidateDetails[nCnt].PrescriptionItemTechOID;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDoseCombDefTech =
            '0';
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TecValOperationMode =
            'UM';
        }
      }
    }
    if (
      String.Equals(
        oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
        CConstants.SUBTYPE
      )
    ) {
      if (
        oPrescItemView.IPPMCPresctiptionItem != null &&
        oPrescItemView.IPPMCPresctiptionItem.Count > 0
      ) {
        let nCount: number = oPrescItemView.IPPMCPresctiptionItem.Count;
        let oTmpPrescItemVM: PrescriptionItemVM;
        oTempPrescItemVM.PresTechValidatedItemsChild =
          new ObservableCollection<PrescriptionItemVM>();
        for (let i: number = 0; i < nCount; i++) {
          oTmpPrescItemVM = new PrescriptionItemVM();
          oTmpPrescItemVM = this.ConstructChildItemVM(
            oPrescItemView.IPPMCPresctiptionItem[i],
            oTempPrescItemVM,
            oPrescItemView,
            oMedDispensingDetail
          );
          oTempPrescItemVM.PresTechValidatedItemsChild.Add(oTmpPrescItemVM);
        }
        if (
          !oTempPrescItemVM.EnableParentMCIItem &&
          oTempPrescItemVM.PresTechValidatedItemsChild != null &&
          oTempPrescItemVM.PresTechValidatedItemsChild.Count > 0
        ) {
          oTempPrescItemVM.PresTechValidatedItemsChild.forEach((childItem) => {
            childItem.EnableChildMCIComp = true;
          });
        }
      }
    }
    if (
      oTempPrescItemVM.FormViewerDetails.BasicDetails
        .SelectedsupplyInstruction != null &&
      oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count > 0
    ) {
      let oSupplyInTxt: string = String.Empty;
      let oSupplyInVal: string = String.Empty;
      oTempPrescItemVM.SupDisText =
        Resource.TechValidate.SupplyDispChild_Add_Text;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
        oTempPrescItemVM.FormViewerDetails.BasicDetails
          .SelectedsupplyInstruction,
        (o1) => {
          oSupplyInTxt = o1;
        },
        (o2) => {
          oSupplyInVal = o2;
        }
      );
      sSuppToolTipText = oSupplyInTxt;
    }
    if (
      sSuppToolTipText.ToString() != String.Empty ||
      sDispToolTipText.ToString() != String.Empty
    )
      oTempPrescItemVM.supToolTipDisText =
        Resource.TechValidate.Supplyinst + sSuppToolTipText;
    if (isDeactItems) {
      oTempPrescItemVM.IsSupplyRequestedEnable = false;
      oTempPrescItemVM.IsDeactivate = 'Y';
    }
    oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction =
      oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
    return oTempPrescItemVM;
  }
  private ConstructPrescriptionItemVMForFluid(
    oPrescItemView: IPPManagePrescSer.PrescriptionItemView,
    oMedDispensingDetail: MedDispensingDetail[]
  ): PrescriptionItemVM {
    let sDispToolTipText: StringBuilder = new StringBuilder();
    let sSuppToolTipText: string = String.Empty;
    CommonFlags.IsTechnicallyValidate = true;
    let oTempPrescItemVM: PrescriptionItemVM = new PrescriptionItemVM();
    oTempPrescItemVM.FormViewerDetails = new FormViewerVM();
    oTempPrescItemVM.FormViewerDetails.BasicDetails = new BasicDetailsVM(
      oTempPrescItemVM
    );
    let lstTermtext: IEnumerable<CValuesetTerm>;
    let sTmpTermText: string = String.Empty;
    let oCListItem: CListItem;
    let sConcpCode: string = String.Empty;
    let isDeactItems: boolean = false;
    if (oPrescItemView.oPrescriptionItem != null) {
      oTempPrescItemVM.PrescriptionOID =
        oPrescItemView.oPrescriptionItem.PrescriptionOID;
      if (oTempPrescItemVM.PrescriptionOID > 0)
        this.PrescriptionIDS_FromGrid.Add(
          oTempPrescItemVM.PrescriptionOID.ToString()
        );
      if (oTempPrescItemVM.iSSupplyrequest == null)
        oTempPrescItemVM.iSSupplyrequest =
          new ObservableCollection<CListItem>();
      oTempPrescItemVM.SupDisText =
        Resource.TechValidate.SupplyDispChild_Add_Text;
      oTempPrescItemVM.supToolTipDisText =
        Resource.TechValidate.AddsupinstChild;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.MCVersion =
        oPrescItemView.oPrescriptionItem.MCVersionNo;
      oTempPrescItemVM.PrescriptionItemStatus =
        oPrescItemView.oPresItemBasicPropertiesView.DrugStatus;
      oTempPrescItemVM.OperationMode = 'UM';
      oTempPrescItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
        oPrescItemView.oPrescriptionItem.IsConditionalExists;
      oTempPrescItemVM.IsNonformulary =
        oPrescItemView.oPrescriptionItem.IsNonformulary;
      oTempPrescItemVM.IsMCIComponent = false;
      oTempPrescItemVM.IsCallForFluid = true;
      if (oPrescItemView.oPrescriptionItem.PrescriptionBasicData != null) {
        if (
          DateTime.NotEquals(oPrescItemView.oPrescriptionItem.PrescriptionBasicData
            .PrescriptionDTTM, DateTime.MinValue)
        )
          oTempPrescItemVM.PrescriptionDTTM =
            oPrescItemView.oPrescriptionItem.PrescriptionBasicData.PrescriptionDTTM;
      }
    }
    if (oPrescItemView.oPresItemBasicPropertiesView != null) {
      oTempPrescItemVM.PrescriptionType =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Code;
      oTempPrescItemVM.PrescriptionItem =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.Name;
      oTempPrescItemVM.PrescriptionItemOID =
        oPrescItemView.oPresItemBasicPropertiesView.PrescriptionItem.OID;
      let DetForFluid: TechValidatedItem = new TechValidatedItem();
      if (
        oPrescItemView != null &&
        oPrescItemView.oTechValidateDetails != null &&
        oPrescItemView.oTechValidateDetails.Count > 0
      ) {
        DetForFluid = oPrescItemView.oTechValidateDetails
          .Where((x) => x != null && x.FluidPrescribableItemListOID > 0)
          .FirstOrDefault();
      }
      if (DetForFluid != null && DetForFluid.ReqIconShow) {
        oTempPrescItemVM.IsOriginalSupplyRequested =
          oTempPrescItemVM.IsSupplyRequested =
          oTempPrescItemVM.IsSupplyRequestedforReqMed =
            true;
        oTempPrescItemVM.RequestUrgency = DetForFluid.LastReqUrgency;
        oTempPrescItemVM.RequestedComments = DetForFluid.LastReqComments;
        oTempPrescItemVM.RequestedDTTM = DetForFluid.LastRequestedDateTime;
        oTempPrescItemVM.RequestedBy = DetForFluid.LastRequestedBy;
      } else {
        oTempPrescItemVM.IsSupplyRequested =
          oTempPrescItemVM.IsSupplyRequestedforReqMed = false;
      }
      oTempPrescItemVM.IsSupplyRequestedEnable = true;
      oTempPrescItemVM.RequisitionCACode =
        oPrescItemView.oPresItemBasicPropertiesView.RequisitionCACode;
      oTempPrescItemVM.CheckForTechValidateMandatory();
      oTempPrescItemVM.IsDeactivate =
        oPrescItemView.oPresItemBasicPropertiesView.IsDeactivated.ToString();
      if (
        String.Equals(
          oTempPrescItemVM.IsDeactivate,
          'Y',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        isDeactItems = true;
        if (String.IsNullOrEmpty(this._DeactivatedPrescItems))
          this._DeactivatedPrescItems = oTempPrescItemVM.PrescriptionItem;
        else
          this._DeactivatedPrescItems +=
            ', ' + oTempPrescItemVM.PrescriptionItem;
      }
      if (
        DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.StartDate,
        DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.StartDTTM =
          oPrescItemView.oPresItemBasicPropertiesView.StartDate;
      }
      if (
        DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.EndDate, DateTime.MinValue)
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.EndDTTM =
          oPrescItemView.oPresItemBasicPropertiesView.EndDate;
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters !=
          null &&
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
          .IntravenousInfusionData != null &&
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
          .IntravenousInfusionData.Fluid != null
      ) {
        oTempPrescItemVM.FluidPrescribableItemListOID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID;
      }
      let isCancelReqEnabled: boolean, requestPending;
      this.IsCancelRequestEnabled(
        oMedDispensingDetail,
        oPrescItemView.PrescriptionItemOID,
        0,
        oTempPrescItemVM.FluidPrescribableItemListOID,
        (o1) => {
          isCancelReqEnabled = o1;
        },
        (o2) => {
          requestPending = o2;
        }
      );
      oTempPrescItemVM.MedDispRequestPending = requestPending;
      DomainValuesForTechValidate.SupplyRequest.forEach((objSupInfo) => {
        if (
          !String.Equals(
            objSupInfo.Value,
            CConstants.CancelSupplycode,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          oTempPrescItemVM.iSSupplyrequest.Add(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objSupInfo.DisplayText,
              Value: objSupInfo.Value,
            })
          );
        } else if (
          String.Equals(
            objSupInfo.Value,
            CConstants.CancelSupplycode,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          isCancelReqEnabled
        ) {
          oTempPrescItemVM.iSSupplyrequest.Add(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objSupInfo.DisplayText,
              Value: objSupInfo.Value,
            })
          );
        }
      });
      if (oTempPrescItemVM.iSSupplyrequest != null) {
        let objselectedval: CListItem = oTempPrescItemVM.iSSupplyrequest
          .Where(
            (x) =>
              x != null &&
              !String.IsNullOrEmpty(x.Value) &&
              String.Equals(x.Value, Resource.TechValidate.Empty)
          )
          .FirstOrDefault();
        oTempPrescItemVM.SelectedSupplyreq = objselectedval;
      }
      if (
        oPrescItemView != null &&
        oPrescItemView.oTechValidateDetails != null &&
        oPrescItemView.oTechValidateDetails.Count > 0 &&
        oTempPrescItemVM.FluidPrescribableItemListOID > 0
      ) {
        oPrescItemView.oTechValidateDetails.forEach((oFluidTechVal) => {
          if (
            oFluidTechVal.FluidPrescribableItemListOID > 0 &&
            ((oFluidTechVal.SupplyInstruction != null &&
              oFluidTechVal.SupplyInstruction.Count > 0) ||
              !String.IsNullOrEmpty(oFluidTechVal.SupplyComments) ||
              oFluidTechVal.NextSupplyDttm != null)
          ) {
            oTempPrescItemVM.IsProdAvailForChild = true;
          }
        });
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction instanceof
          ObservableCollection &&
        oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction.Count >
          0 &&
        oPrescItemView.oPresItemBasicPropertiesView
          .FluidPrescribableItemListOID > 0
      ) {
        let oSupplyText: StringBuilder = new StringBuilder();
        let oSupplyValue: StringBuilder = new StringBuilder();
        let UnresolvedSupInst: StringBuilder = new StringBuilder();
        if (
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction == null
        )
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
            new ObservableCollection<CListItem>();
        let nSupplyInstCnt: number =
          oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction.Count;
        let bSupplyInstResolved: boolean = false;
        for (let i: number = 0; i < nSupplyInstCnt; i++) {
          bSupplyInstResolved = false;
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code
            ) &&
            !String.Equals(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code,
              CConstants.Supplycomments
            )
          ) {
            if (
              MedicationCommonConceptCodeData.ViewConceptCodes != null &&
              MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
            ) {
              if (
                MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                  (x) =>
                    x != null &&
                    !String.IsNullOrEmpty(x.csCode) &&
                    x.csCode ==
                      oPrescItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i].Code
                ).Any()
              ) {
                lstTermtext =
                  MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                    (x) =>
                      x != null &&
                      !String.IsNullOrEmpty(x.csCode) &&
                      x.csCode ==
                        oPrescItemView.oPresItemBasicPropertiesView
                          .SupplyInstruction[i].Code
                  );
                if (lstTermtext != null) {
                  oSupplyValue.Append(
                    oPrescItemView.oPresItemBasicPropertiesView
                      .SupplyInstruction[i].Code
                  );
                  oSupplyValue.Append(';');
                  oSupplyText.Append(lstTermtext.First().csDescription);
                  oSupplyText.Append(';');
                  if (
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                      (c) =>
                        c != null &&
                        !String.IsNullOrEmpty(c.Value) &&
                        c.Value ==
                          oPrescItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code
                    ).Count() == 0
                  ) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(
                      ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: lstTermtext.First().csDescription,
                        Value:
                          oPrescItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code,
                      })
                    );
                  }
                }
              } else {
                oSupplyValue.Append(
                  oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[
                    i
                  ].Code
                );
                oSupplyValue.Append(';');
                bSupplyInstResolved = true;
              }
            }
          }
          if (bSupplyInstResolved) {
            UnresolvedSupInst.Append(
              oPrescItemView.oPresItemBasicPropertiesView.SupplyInstruction[i]
                .Code
            );
            {
              UnresolvedSupInst.Append('~^~');
            }
          }
          let sText: string = String.Empty;
          let sValue: string = String.Empty;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
            oTempPrescItemVM.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction,
            (o1) => {
              sText = o1;
            },
            (o2) => {
              sValue = o2;
            }
          );
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsText =
            !String.IsNullOrEmpty(sText) ? sText : String.Empty;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal =
            !String.IsNullOrEmpty(sValue) ? sValue : String.Empty;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: sTmpTermText,
              Value: sConcpCode,
            });
          if (
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst !=
              null &&
            !String.Equals(
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst
                .Value,
              CConstants.Supplycomments,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            let supplyTextChk =
              MedicationCommonConceptCodeData.ConceptCodes.Where(
                (supplyText) =>
                  supplyText.csCode ==
                  oTempPrescItemVM.FormViewerDetails.BasicDetails
                    .TechValSupplyInst.Value
              ).Select((supplyText) => supplyText);
            if (supplyTextChk != null && supplyTextChk.Count() > 0) {
              oTempPrescItemVM.SupDisText =
                Resource.TechValidate.SupplyDispChild_Add_Text;
              oTempPrescItemVM.supToolTipDisText =
                Resource.TechValidate.Supplyinst +
                oTempPrescItemVM.FormViewerDetails.BasicDetails
                  .TechValSupplyInst.DisplayText +
                Environment.NewLine;
            }
          }
        }
        if (
          oTempPrescItemVM != null &&
          oTempPrescItemVM.FormViewerDetails != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction.Count > 0
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction =
            oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
          new ObservableCollection<CListItem>();
        if (UnresolvedSupInst != null && UnresolvedSupInst.Length > 0) {
          let ResolvedSupplyInstFromTV: ObservableCollection<CListItem> =
            new ObservableCollection<CListItem>(
              MCommonBB.GetResolvedSupplyInstTermText(UnresolvedSupInst)
            );
          oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV =
            ResolvedSupplyInstFromTV;
        }
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction !=
          null &&
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction
          .Count > 0
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingInstruction =
          new ObservableCollection<CListItem>();
        oPrescItemView.oPresItemBasicPropertiesView.DispensingInstruction.forEach(
          (oDispens) => {
            if (
              String.Equals(
                oDispens.Code,
                CConstants.Addtionalcomments,
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingAdditionalComments =
                oDispens.Name;
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: oDispens.Name,
                Value: oDispens.Code,
              });
            } else if (
              String.Equals(
                oDispens.Code,
                CConstants.Other,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.IsNullOrEmpty(
                oPrescItemView.oPresItemBasicPropertiesView
                  .OtherDispensingInstruction
              )
            ) {
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescItemView.oPresItemBasicPropertiesView
                    .OtherDispensingInstruction,
                Value: CConstants.Other,
                IsSelected: true,
              });
              oCListItem.Tag =
                oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
            } else {
              sTmpTermText = String.Empty;
              if (
                MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
              ) {
                if (
                  MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                    (x) =>
                      x != null &&
                      !String.IsNullOrEmpty(x.csCode) &&
                      x.csCode == oDispens.Code
                  ).Any()
                ) {
                  lstTermtext =
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) =>
                        x != null &&
                        !String.IsNullOrEmpty(x.csCode) &&
                        x.csCode == oDispens.Code
                    );
                  if (lstTermtext != null) {
                    sTmpTermText = lstTermtext.First().csDescription;
                  }
                }
              }
              oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: sTmpTermText,
                Value: oDispens.Code,
                IsSelected: true,
              });
            }
            oTempPrescItemVM.FormViewerDetails.BasicDetails.DispensingInstruction.Add(
              oCListItem
            );
          }
        );
      }
      oTempPrescItemVM.FormViewerDetails.BasicDetails.GroupHeaderName =
        oPrescItemView.oPresItemAdditionalProperties.GroupHeaderName;
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.OtherDispensingInstruction =
          oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
        if (oTempPrescItemVM.FormViewerDetails.TechvalidateCADetails != null) {
          oTempPrescItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction =
            oPrescItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
        }
      }
      if (
        oPrescItemView.oPresItemBasicPropertiesView.Route instanceof
          IPPManagePrescSer.ObjectInfo &&
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemBasicPropertiesView.Route.Name
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Route =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: MedicationCommonBB.RouteName(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
            Value: MedicationCommonBB.RouteOID(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
            Tag: MedicationCommonBB.RouteTag(
              oPrescItemView.oPresItemBasicPropertiesView.Route.Name
            ),
          });
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Route = new CListItem();
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Route.Value =
          MedicationCommonBB.RouteOID(
            oPrescItemView.oPresItemBasicPropertiesView.Route.Name
          );
        oTempPrescItemVM.FormViewerDetails.BasicDetails.Route.Tag =
          MedicationCommonBB.RouteTag(
            oPrescItemView.oPresItemBasicPropertiesView.Route.Name
          );
      }
    }
    if (
      oPrescItemView.oPresItemBasicPropertiesView != null &&
      oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters != null
    ) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
        new InfusionVM(oTempPrescItemVM.FormViewerDetails.BasicDetails);
      oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionType =
        new CListItem();
      if (
        oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
          .IntravenousInfusionData != null
      ) {
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.Fluid != null &&
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.Fluid.OID > 0
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                '   ' +
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
                  .IntravenousInfusionData.Fluid.Name +
                ' (Fluid for infusions)',
              Value:
                oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString(),
            });
        }
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidIdentifyingType =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidIdentifyingType;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidIdentifyingType;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidIdentifyingOID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidIdentifyingOID;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingOID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidIdentifyingOID;
        oTempPrescItemVM.LorenzoID =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.FluidLorenzoID;
        oTempPrescItemVM.formViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder;
        oTempPrescItemVM.formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsFirstItem =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsFirstItem;
        oTempPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsLastItem;
        oTempPrescItemVM.IsWardStockFluid =
          oPrescItemView.oPresItemBasicPropertiesView.IsWardStockFluid;
        if (
          oPrescItemView.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData.FluidIdentifyingOID > 0
        ) {
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oPrescriptionItem.SupplyByAtFluidChild
            ) &&
            DateTime.NotEquals(oPrescItemView.oPrescriptionItem.LastSupplyDTTMFluidChild,
              DateTime.MinValue)
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyBy =
              oPrescItemView.oPrescriptionItem.SupplyByAtFluidChild +
              Environment.NewLine +
              oPrescItemView.oPrescriptionItem.LastSupplyDTTMFluidChild.ToString(
                CConstants.DateHMFormat
              );
          }
        }
        if (
          ProfileData.AdditionalPrescConfig != null &&
          ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
          oTempPrescItemVM.IsWardStockFluid &&
          !String.IsNullOrEmpty(PatientContext.PrescriptionType) &&
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            oTempPrescItemVM.PrescriptionItemStatus,
            CConstants.CANCELLED
          ) &&
          !String.Equals(
            oTempPrescItemVM.PrescriptionItemStatus,
            CConstants.DISCONTINUED
          ) &&
          !String.Equals(
            oTempPrescItemVM.PrescriptionItemStatus,
            CConstants.COMPLETED
          )
        ) {
          oTempPrescItemVM.FormViewerDetails.BasicDetails.IsWardStockIconVisible =
            Visibility.Visible;
        }
      }
    }
    if (oPrescItemView.oPresItemAdditionalProperties != null) {
      if (
        !String.IsNullOrEmpty(
          oPrescItemView.oPresItemAdditionalProperties.AdditionalComments
        )
      ) {
        oTempPrescItemVM.FormViewerDetails.BasicDetails.AdditionalComments =
          oPrescItemView.oPresItemAdditionalProperties.AdditionalComments;
      }
    }
    if (oPrescItemView.oPresItemBasicPropertiesView != null) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText =
        oPrescItemView.oPresItemBasicPropertiesView.TechSupplyInstruction;
    }
    if (
      oPrescItemView != null &&
      oPrescItemView.oPresItemBasicPropertiesView != null &&
      oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM != null &&
      DateTime.NotEquals(oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM,
        DateTime.MinValue)
    ) {
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM =
        oPrescItemView.oPresItemBasicPropertiesView.SupplyDTTM;
    }
    if (
      oPrescItemView.oTechValidateDetails != null &&
      oPrescItemView.oTechValidateDetails.Count > 0 &&
      oPrescItemView.oTechValidateDetails.Any(
        (x) => x.FluidPrescribableItemListOID > 0
      )
    ) {
      let nTechDetail: number = 0;
      nTechDetail = oPrescItemView.oTechValidateDetails.Count;
      for (let nCnt: number = 0; nCnt < nTechDetail; nCnt++) {
        if (
          oPrescItemView.oTechValidateDetails[nCnt].IsDoseCombinationsDefined ==
          '0'
        ) {
          sTmpTermText = String.Empty;
          if (
            oPrescItemView.oTechValidateDetails[nCnt]
              .SupplyInstruction instanceof ObservableCollection &&
            oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction !=
              null &&
            oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction.Count >
              0
          ) {
            let nSupplyInstCnt: number =
              oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction.Count;
            if (
              oTempPrescItemVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction == null
            )
              oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                new ObservableCollection<CListItem>();
            for (let i: number = 0; i < nSupplyInstCnt; i++) {
              if (
                oPrescItemView.oTechValidateDetails[nCnt]
                  .FluidPrescribableItemListOID > 0
              ) {
                if (
                  !String.IsNullOrEmpty(
                    oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction[
                      i
                    ].Code
                  ) &&
                  !String.Equals(
                    oPrescItemView.oTechValidateDetails[nCnt].SupplyInstruction[
                      i
                    ].Code,
                    CConstants.Supplycomments
                  )
                ) {
                  if (
                    MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                    MedicationCommonConceptCodeData.ViewConceptCodes.Count >
                      0 &&
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) =>
                        x.csCode ==
                        oPrescItemView.oTechValidateDetails[nCnt]
                          .SupplyInstruction[i].Code
                    ).Any()
                  ) {
                    lstTermtext =
                      MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                        (x) =>
                          x.csCode ==
                          oPrescItemView.oTechValidateDetails[nCnt]
                            .SupplyInstruction[i].Code
                      );
                    if (lstTermtext != null) {
                      sTmpTermText += lstTermtext.First().csDescription;
                      sConcpCode =
                        oPrescItemView.oTechValidateDetails[nCnt]
                          .SupplyInstruction[i].Code;
                      if (
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                          (c) =>
                            c.Value ==
                            oPrescItemView.oTechValidateDetails[nCnt]
                              .SupplyInstruction[i].Code
                        ).Count() == 0
                      ) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(
                          ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: lstTermtext.First().csDescription,
                            Value:
                              oPrescItemView.oTechValidateDetails[nCnt]
                                .SupplyInstruction[i].Code,
                          })
                        );
                      }
                    }
                  }
                }
                oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSupplyComments =
                  !String.IsNullOrEmpty(
                    oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                  )
                    ? oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                    : String.Empty;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.PreviousComments =
                  !String.IsNullOrEmpty(
                    oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                  )
                    ? oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                    : String.Empty;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments =
                  !String.IsNullOrEmpty(
                    oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                  )
                    ? oPrescItemView.oTechValidateDetails[nCnt].SupplyComments
                    : String.Empty;
              }
            }
            let sArrCode: string[] = null;
            let mcisupplyinst: string = String.Empty;
            if (
              String.Equals(
                oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
                CConstants.SUBTYPE
              )
            ) {
              sArrCode =
                oPrescItemView.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(
                  '^'
                );
              mcisupplyinst = sArrCode[0];
            }
            if (
              String.Equals(
                oTempPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
                CConstants.SUBTYPE
              ) &&
              String.IsNullOrEmpty(mcisupplyinst)
            ) {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
                new CListItem();
            } else {
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: sTmpTermText,
                  Value: sConcpCode,
                });
            }
          }
          if (
            DateTime.NotEquals(oPrescItemView.oTechValidateDetails[nCnt].NextSupplyDttm,
            DateTime.MinValue)
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevNextSupplyDate =
              oPrescItemView.oTechValidateDetails[nCnt].NextSupplyDttm;
            oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate =
              oPrescItemView.oTechValidateDetails[nCnt].NextSupplyDttm;
          }
          if (
            oPrescItemView.oTechValidateDetails[nCnt].DispensingInstruction !=
              null &&
            oPrescItemView.oTechValidateDetails[nCnt].DispensingInstruction
              .Count > 0
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst =
              new ObservableCollection<CListItem>();
            oPrescItemView.oTechValidateDetails[
              nCnt
            ].DispensingInstruction.forEach((oDispens) => {
              if (
                String.Equals(
                  oDispens.Code,
                  CConstants.Addtionalcomments,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: oDispens.Name,
                  Value: oDispens.Code,
                });
              } else if (
                String.Equals(
                  oDispens.Code,
                  CConstants.Other,
                  StringComparison.InvariantCultureIgnoreCase
                ) &&
                !String.IsNullOrEmpty(
                  oPrescItemView.oTechValidateDetails[nCnt]
                    .OtherDispensingInstruction
                )
              ) {
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    oPrescItemView.oTechValidateDetails[nCnt]
                      .OtherDispensingInstruction,
                  Value: CConstants.Other,
                  IsSelected: true,
                });
                oCListItem.Tag =
                  oPrescItemView.oTechValidateDetails[
                    nCnt
                  ].OtherDispensingInstruction;
              } else {
                sTmpTermText = String.Empty;
                if (
                  MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                  MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0 &&
                  MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                    (x) => x.csCode == oDispens.Code
                  ).Any()
                ) {
                  lstTermtext =
                    MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                      (x) => x.csCode == oDispens.Code
                    );
                  if (lstTermtext != null) {
                    sTmpTermText = lstTermtext.First().csDescription;
                  }
                }
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: sTmpTermText,
                  Value: oDispens.Code,
                  IsSelected: true,
                });
              }
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValDispensingInst.Add(
                oCListItem
              );
              sDispToolTipText.Append(oCListItem.DisplayText);
              if (
                oTempPrescItemVM.FormViewerDetails.BasicDetails
                  .TechValDispensingInst.Count > 0
              )
                sDispToolTipText.Append(',');
            });
          }
          if (
            !String.IsNullOrEmpty(
              oPrescItemView.oTechValidateDetails[nCnt]
                .OtherDispensingInstruction
            )
          ) {
            oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValOtherInst =
              oPrescItemView.oTechValidateDetails[
                nCnt
              ].OtherDispensingInstruction;
            sDispToolTipText.Append(
              oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValOtherInst
            );
          }
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TechPresItemTechOID =
            oPrescItemView.oTechValidateDetails[nCnt].PrescriptionItemTechOID;
          oTempPrescItemVM.FormViewerDetails.BasicDetails.IsDoseCombDefTech =
            '0';
          oTempPrescItemVM.FormViewerDetails.BasicDetails.TecValOperationMode =
            'UM';
        }
      }
    }
    if (
      oTempPrescItemVM.FormViewerDetails.BasicDetails
        .SelectedsupplyInstruction != null &&
      oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count > 0
    ) {
      let oSupplyInTxt: string = String.Empty;
      let oSupplyInVal: string = String.Empty;
      oTempPrescItemVM.SupDisText =
        Resource.TechValidate.SupplyDispChild_Add_Text;
      oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
        oTempPrescItemVM.FormViewerDetails.BasicDetails
          .SelectedsupplyInstruction,
        (o1) => {
          oSupplyInTxt = o1;
        },
        (o2) => {
          oSupplyInVal = o2;
        }
      );
      sSuppToolTipText = oSupplyInTxt;
    }
    if (
      sSuppToolTipText.ToString() != String.Empty ||
      sDispToolTipText.ToString() != String.Empty
    )
      oTempPrescItemVM.supToolTipDisText =
        Resource.TechValidate.Supplyinst + sSuppToolTipText;
    if (isDeactItems) {
      oTempPrescItemVM.IsSupplyRequestedEnable = false;
      oTempPrescItemVM.IsDeactivate = 'Y';
    }
    oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction =
      oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
    oTempPrescItemVM.IsReviewIconVisible = Visibility.Collapsed;
    oTempPrescItemVM.IsFormViewerIconVisible = Visibility.Collapsed;
    return oTempPrescItemVM;
  }
  private GetContextInfo(): number {
    let nTmpOID: number;
    let bnResult: boolean = true;
    if (
      ContextManager.Instance['PatientID'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['PatientID'].ToString())
    ) {
      bnResult = Number.TryParse(
        ContextManager.Instance['PatientID'].ToString(),
        (o) => (nTmpOID = o)
      );
      PatientContext.PatientOID = nTmpOID;
      if (!bnResult) return -1;
    }
    if (
      ContextManager.Instance['PRESCRIPTIONOID'] != null &&
      !String.IsNullOrEmpty(
        ContextManager.Instance['PRESCRIPTIONOID'].ToString()
      )
    ) {
      PatientContext.PrescriptionOID =
        ContextManager.Instance['PRESCRIPTIONOID'].ToString();
    }
    if (
      ContextManager.Instance['PrescType'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['PrescType'].ToString())
    ) {
      PatientContext.PrescriptionType =
        ContextManager.Instance['PrescType'].ToString();
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['SecurityToken'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['SecurityToken'].ToString())
    ) {
      ContextInfo.SecurityToken =
        ContextManager.Instance['SecurityToken'].ToString();
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['OrganisationOID'] != null &&
      !String.IsNullOrEmpty(
        ContextManager.Instance['OrganisationOID'].ToString()
      )
    ) {
      AppContextInfo.OrganisationOID =
        ContextManager.Instance['OrganisationOID'].ToString();
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['UserOID'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['UserOID'].ToString())
    ) {
      let objUserOid: int64;
      Int64.TryParse(
        ContextManager.Instance['UserOID'].ToString(),
        (o) => (objUserOid = o)
      );
      ContextInfo.UserOID = objUserOid;
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['ReleaseVersion'] != null &&
      !String.IsNullOrEmpty(
        ContextManager.Instance['ReleaseVersion'].ToString()
      )
    ) {
      let objReleaseVer: byte;
      Byte.TryParse(
        ContextManager.Instance['ReleaseVersion'].ToString(),
        (o) => (objReleaseVer = o)
      );
      ContextInfo.ReleaseVersion = objReleaseVer.toString();
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['AMCV'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['AMCV'].ToString())
    ) {
      AppSessionInfo.AMCV = ContextManager.Instance['AMCV'].ToString();
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['EncounterOID'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['EncounterOID'].ToString())
    ) {
      let objEncOid: number;
      Number.TryParse(
        ContextManager.Instance['EncounterOID'].ToString(),
        (o) => (objEncOid = o)
      );
      PatientContext.EncounterOid = objEncOid;
    } else {
      return -1;
    }
    if (
      ContextManager.Instance['MergedPatientOID'] != null &&
      !String.IsNullOrEmpty(
        ContextManager.Instance['MergedPatientOID'].ToString()
      )
    ) {
      let objMergedPatientOID: number;
      Number.TryParse(
        ContextManager.Instance['MergedPatientOID'].ToString(),
        (o) => (objMergedPatientOID = o)
      );
      PatientContext.MergedPatientOID = objMergedPatientOID;
    } else {
      return -1;
    }
    if (ContextManager.Instance['JobRoleOID'] != null) {
      AppContextInfo.JobRoleOID =
        ContextManager.Instance['JobRoleOID'].ToString();
    }
    if (ContextManager.Instance['ServiceOID'] != null) {
      let ServiceOID: number = 0;
      Number.TryParse(
        ContextManager.Instance['ServiceOID'].ToString(),
        (o) => (ServiceOID = o)
      );
      MedChartData.ServiceOID = ServiceOID;
    }
    if (ContextManager.Instance['LocationOID'] != null) {
      let LocationOID: number = 0;
      Number.TryParse(
        ContextManager.Instance['LocationOID'].ToString(),
        (o) => (LocationOID = o)
      );
      MedChartData.LocationOID = LocationOID;
    }
    return 0;
  }
  private GetTechValidateChildItems(
    PresTechValidChildItems: PrescriptionItemVM,
    sMCIMode: string
  ): IPPManagePrescSer.TechnicalValidationInfo {
    let lstPrescItems: List<IPPManagePrescSer.TechnicalValidationInfo> =
      new List<IPPManagePrescSer.TechnicalValidationInfo>();
    let lstTechnicaldetails: List<IPPManagePrescSer.TechValidatedItem>;
    let oTechDetail: IPPManagePrescSer.TechValidatedItem;
    let oPrescChldItem: IPPManagePrescSer.TechnicalValidationInfo;
    oPrescChldItem = new IPPManagePrescSer.TechnicalValidationInfo();
    if (PresTechValidChildItems != null) {
      oPrescChldItem.EncounterOID = Convert.ToInt64(
        PatientContext.EncounterOid
      );
      if (
        String.Equals(
          PresTechValidChildItems.SupplyreqDisplay,
          Resource.TechValidate.Sup,
          StringComparison.InvariantCultureIgnoreCase
        )
      )
        oPrescChldItem.IsSupplyRequested = '1';
      else if (
        String.Equals(
          PresTechValidChildItems.SupplyreqDisplay,
          Resource.TechValidate.DontSup,
          StringComparison.InvariantCultureIgnoreCase
        )
      )
        oPrescChldItem.IsSupplyRequested = '2';
      else if (
        String.Equals(
          PresTechValidChildItems.SupplyreqDisplay,
          Resource.TechValidate.CancelSup,
          StringComparison.InvariantCultureIgnoreCase
        )
      )
        oPrescChldItem.IsSupplyRequested = '3';
      else oPrescChldItem.IsSupplyRequested = '0';
      oPrescChldItem.IsWardStock = PresTechValidChildItems.IsWardStock;
      oPrescChldItem.RequisitionCACode = Resource.TechValidate.ReqCACode;
      oPrescChldItem.LorenzoID = PresTechValidChildItems.LorenzoID;
      oPrescChldItem.LocationOID = MedChartData.LocationOID;
      oPrescChldItem.ServiceOID = MedChartData.ServiceOID;
      oPrescChldItem.RoleOID = Convert.ToInt64(AppContextInfo.JobRoleOID);
      if (PatientContext.MergedPatientOID != PatientContext.PatientOID)
        oPrescChldItem.IsMergePatient = '1';
      else oPrescChldItem.IsMergePatient = '0';
      if (
        !String.IsNullOrEmpty(
          PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments
        )
      ) {
        oPrescChldItem.SupplyComments =
          PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments;
      }
      if (
        DateTime.NotEquals(PresTechValidChildItems.FormViewerDetails.BasicDetails.NextSupplyDate,
        DateTime.MinValue)
      ) {
        oPrescChldItem.NextSupplyDTTM =
          PresTechValidChildItems.FormViewerDetails.BasicDetails.NextSupplyDate;
      }
      oPrescChldItem.PrescriptionItemOID =
        PresTechValidChildItems.PrescriptionItemOID;
      oPrescChldItem.PresMutliCompOid =
        PresTechValidChildItems.PresMultiCompitemOID;
      oPrescChldItem.FluidPrescribableItemListOID =
        PresTechValidChildItems.FluidPrescribableItemListOID;
      if (
        PresTechValidChildItems.FormViewerDetails.BasicDetails
          .IsDoseCombDefTech == '0' ||
        PresTechValidChildItems.FormViewerDetails.BasicDetails
          .IsDoseCombDefTech == '\0' ||PresTechValidChildItems.FormViewerDetails.BasicDetails
          .IsDoseCombDefTech == ''
      ) {
        if (
          String.IsNullOrEmpty(
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .TecValOperationMode
          ) ||
          String.Equals(
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .TecValOperationMode,
            'UM'
          ) ||
          (PresTechValidChildItems.FormViewerDetails.BasicDetails
            .TechValSupplyInst != null &&
            !String.IsNullOrEmpty(
              PresTechValidChildItems.FormViewerDetails.BasicDetails
                .TechValSupplyInst.Value
            )) ||
          !String.IsNullOrEmpty(
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .Supplycomments
          ) ||
          DateTime.NotEquals(PresTechValidChildItems.FormViewerDetails.BasicDetails
            .NextSupplyDate, DateTime.MinValue)
        ) {
          PresTechValidChildItems.FormViewerDetails.BasicDetails.TecValOperationMode =
            'N';
        }
      }
      lstTechnicaldetails = new List<IPPManagePrescSer.TechValidatedItem>();
      if (
        PresTechValidChildItems.FormViewerDetails.TechvalidateCADetails !=
          null &&
        PresTechValidChildItems.TechValidatedItems != null
      ) {
        PresTechValidChildItems.TechValidatedItems.forEach((oTechItemChild) => {
          oTechDetail = new IPPManagePrescSer.TechValidatedItem();
          oTechDetail.FluidPrescribableItemListOID =
            oPrescChldItem.FluidPrescribableItemListOID;
          if (String.IsNullOrEmpty(oTechItemChild.QuantityPerDose))
            oTechDetail.QuantityPerDose = String.Empty;
          else oTechDetail.QuantityPerDose = oTechItemChild.QuantityPerDose;
          if (String.IsNullOrEmpty(oTechItemChild.TotalQuantity))
            oTechDetail.TotalQuantity = String.Empty;
          else oTechDetail.TotalQuantity = oTechItemChild.TotalQuantity;
          oTechDetail.QuantityPerDoseUOM = new IPPManagePrescSer.ObjectInfo();
          oTechDetail.QuantityPerDoseUOM.OID =
            oTechItemChild.QuantityPerDoseUOM.OID;
          oTechDetail.TotalQuantityUOM = new IPPManagePrescSer.ObjectInfo();
          oTechDetail.TotalQuantityUOM.OID =
            oTechItemChild.TotalQuantityUOM.OID;
          if (
            oTechItemChild.SupplyInstruction != null &&
            oTechItemChild.SupplyInstruction.Count > 0
          ) {
            oTechDetail.SupplyInstruction =
              new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
            oTechItemChild.SupplyInstruction.forEach((objSupInfo) => {
              oTechDetail.SupplyInstruction.Add(
                ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                  Code: objSupInfo.Code,
                  Name: objSupInfo.Name,
                })
              );
            });
          }
          if (!String.IsNullOrEmpty(oTechItemChild.SupComments)) {
            if (oTechDetail.SupplyInstruction == null)
              oTechDetail.SupplyInstruction =
                new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
            oTechDetail.SupplyInstruction.Add(
              ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                Code: CConstants.Supplycomments,
                Name: oTechItemChild.SupComments,
              })
            );
          }
          oTechDetail.OperationMode = oTechItemChild.OperationMode;
          if (
            String.Equals(
              oTechDetail.OperationMode,
              'M',
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              oTechDetail.OperationMode,
              'D',
              StringComparison.InvariantCultureIgnoreCase
            )
          )
            oTechDetail.PrescriptionItemTechOID =
              oTechItemChild.PrescriptionItemTechOID;
          oTechDetail.DrugItem = new IPPManagePrescSer.DrugItemBasicData();
          oTechDetail.DrugItem.IdentifyingName =
            oTechItemChild.DrugItem.IdentifyingName;
          oTechDetail.DrugItem.IdentifyingType =
            oTechItemChild.DrugItem.IdentifyingType;
          oTechDetail.DrugItem.IdentifyingOID =
            oTechItemChild.DrugItem.IdentifyingOID;
          oTechDetail.DrugItem.PrescribableItemListOID =
            oTechItemChild.DrugItem.PrescribableItemListOID;
          oTechDetail.DrugItem.MCVersionNo =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.MCVersion;
          if (oTechItemChild.IsDoseCombinationsDefined == '1')
            oTechDetail.IsDoseCombinationsDefined = '1';
          lstTechnicaldetails.Add(oTechDetail);
        });
      }
      if (
        String.Equals(
          PresTechValidChildItems.FormViewerDetails.BasicDetails
            .TecValOperationMode,
          'M',
          StringComparison.OrdinalIgnoreCase
        ) ||
        String.Equals(
          PresTechValidChildItems.FormViewerDetails.BasicDetails
            .TecValOperationMode,
          'D',
          StringComparison.OrdinalIgnoreCase
        ) ||
        String.Equals(
          PresTechValidChildItems.FormViewerDetails.BasicDetails
            .TecValOperationMode,
          'N',
          StringComparison.OrdinalIgnoreCase
        )
      ) {
        if (
          (PresTechValidChildItems.FormViewerDetails.BasicDetails
            .IsDoseCombDefTech == '0' ||
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .IsDoseCombDefTech == '\0' ||
             PresTechValidChildItems.FormViewerDetails.BasicDetails
              .IsDoseCombDefTech=='') &&
          (String.Equals(
            sMCIMode,
            'MCIParent',
            StringComparison.OrdinalIgnoreCase
          ) ||
            String.Equals(
              sMCIMode,
              'MCIChild',
              StringComparison.OrdinalIgnoreCase
            ))
        ) {
          oTechDetail = new IPPManagePrescSer.TechValidatedItem();
          if (
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction != null &&
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction.Count > 0
          ) {
            oTechDetail.SupplyInstruction =
              new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
            let nCount: number =
              PresTechValidChildItems.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction.Count;
            for (let i: number = 0; i < nCount; i++) {
              oTechDetail.SupplyInstruction.Add(
                ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                  Code: PresTechValidChildItems.FormViewerDetails.BasicDetails
                    .SelectedsupplyInstruction[i].Value,
                  Name: PresTechValidChildItems.FormViewerDetails.BasicDetails
                    .SelectedsupplyInstruction[i].DisplayText,
                })
              );
            }
          }
          oTechDetail.PrescriptionItemTechOID =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.TechPresItemTechOID;
          oTechDetail.DrugItem = new IPPManagePrescSer.DrugItemBasicData();
          oTechDetail.DrugItem.IdentifyingName =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.IdentifyingName;
          oTechDetail.DrugItem.IdentifyingType =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.IdentifyingType;
          oTechDetail.DrugItem.IdentifyingOID =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.IdentifyingOID;
          oTechDetail.DrugItem.PrescribableItemListOID =
            PresTechValidChildItems.PrescriptionItemOID;
          oTechDetail.FluidPrescribableItemListOID =
            PresTechValidChildItems.FluidPrescribableItemListOID;
          oTechDetail.DrugItem.MCVersionNo =
            PresTechValidChildItems.FormViewerDetails.BasicDetails.MCVersion;
          oTechDetail.IsDoseCombinationsDefined = '0';
          if (
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .TecValOperationMode == 'N' ||
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .TecValOperationMode == 'M'
          )
            oTechDetail.OperationMode = 'N';
          else if (
            PresTechValidChildItems.FormViewerDetails.BasicDetails
              .TecValOperationMode == 'D'
          ) {
            oTechDetail.OperationMode = 'D';
          }
          oTechDetail.QuantityPerDose = String.Empty;
          oTechDetail.TotalQuantity = String.Empty;
          oTechDetail.QuantityPerDoseUOM = new IPPManagePrescSer.ObjectInfo();
          oTechDetail.QuantityPerDoseUOM.OID = 0;
          oTechDetail.TotalQuantityUOM = new IPPManagePrescSer.ObjectInfo();
          oTechDetail.TotalQuantityUOM.OID = 0;
          if (
            !String.IsNullOrEmpty(
              PresTechValidChildItems.FormViewerDetails.BasicDetails
                .Supplycomments
            )
          ) {
            if (oTechDetail.SupplyInstruction == null)
              oTechDetail.SupplyInstruction =
                new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
            oTechDetail.SupplyInstruction.Add(
              ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                Code: CConstants.Supplycomments,
                Name: PresTechValidChildItems.FormViewerDetails.BasicDetails
                  .Supplycomments,
              })
            );
            oTechDetail.OtherDispensingInstruction =
              PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments;
          }
          lstTechnicaldetails.Add(oTechDetail);
        }
      }
      if (lstTechnicaldetails.Count > 0) {
        oPrescChldItem.Technicalvalidateupdate = true;
        oPrescChldItem.TechValidatedItems =
          new ObservableCollection<IPPManagePrescSer.TechValidatedItem>(
            lstTechnicaldetails
          );
      }
    }
    return oPrescChldItem;
  }
  public TechnicalValidateSubmit(): void {
    if (this.PresTechValidatedItems != null) {
      let nPrescItemsCount: number = this.PresTechValidatedItems.Count;
      if (nPrescItemsCount > 0) {
        let liPrescriptionItems: List<string> =
          this.PresTechValidatedItems.Where(
            (x) =>
              x != null &&
              ((x.PresTechValidatedItemsChild != null &&
                x.PresTechValidatedItemsChild.Any(
                  (y) =>
                    y.SelectedSupplyreq != null &&
                    CConstants.Supplycode.Equals(
                      y.SelectedSupplyreq.Value,
                      StringComparison.OrdinalIgnoreCase
                    ) &&
                    y.MedDispRequestPending
                )) ||
                (x.SelectedSupplyreq != null &&
                  CConstants.Supplycode.Equals(
                    x.SelectedSupplyreq.Value,
                    StringComparison.OrdinalIgnoreCase
                  ) &&
                  x.MedDispRequestPending))
          )
            .Select((x) =>
              !String.IsNullOrEmpty(x.LorenzoID) &&
              x.LorenzoID.Equals(
                CConstants.ADHOC_ITEM_LORENZOID,
                StringComparison.OrdinalIgnoreCase
              )
                ? x.PrescriptionItem +
                  ' (' +
                  (x.FormViewerDetails != null &&
                  x.FormViewerDetails.BasicDetails != null
                    ? x.FormViewerDetails.BasicDetails.StartDTTM_DST_Display()
                    : String.Empty) +
                  ')'
                : x.FormViewerDetails != null &&
                  x.FormViewerDetails.BasicDetails != null &&
                  !String.IsNullOrEmpty(
                    x.FormViewerDetails.BasicDetails.IdentifyingName
                  )
                ? x.FormViewerDetails.BasicDetails.IdentifyingName
                : x.FormViewerDetails != null &&
                  x.FormViewerDetails.BasicDetails != null &&
                  x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                  x.FormViewerDetails.BasicDetails.InfusionDetails
                    .FluidSelectvalue != null &&
                  x.FluidPrescribableItemListOID > 0
                ? x.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue.DisplayText.TrimStart() ??
                  String.Empty
                : String.Empty
            )
            .Where((x) => !String.IsNullOrEmpty(x))
            .ToList();
        let lstPrescItems: List<IPPManagePrescSer.TechnicalValidationInfo> =
          new List<IPPManagePrescSer.TechnicalValidationInfo>();
        let oPrescItem: IPPManagePrescSer.TechnicalValidationInfo;
        let presoid: number[] = this.PresTechValidatedItems.Where(
          (x) =>
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            x.FormViewerDetails.BasicDetails.EditedGridID == 1 &&
            x.PrescriptionItemOID > 0
        )
          .Select((s) => s.PrescriptionItemOID)
          .Distinct()
          .ToArray();
        if (presoid != null && presoid.Count() > 0) {
          this.PresTechValidatedItems.Where(
            (x) =>
              presoid.Contains(x.PrescriptionItemOID) &&
              x.FormViewerDetails != null &&
              x.FormViewerDetails.BasicDetails != null &&
              x.FormViewerDetails.BasicDetails.EditedGridID != 1
          ).ForEach((x) => {
            x.FormViewerDetails.BasicDetails.EditedGridID = 1;
          });
        }
        for (let i: number = 0; i < nPrescItemsCount; i++) {
          if (
            this.PresTechValidatedItems[i] != null &&
            this.PresTechValidatedItems[i].FormViewerDetails != null &&
            this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails !=
              null
          ) {
            if (
              (!(( this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                .PreviousComments == undefined &&  this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                .Supplycomments == undefined) || (this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .PreviousComments == "" && this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .Supplycomments == ""))
              && 
              !String.Equals(
                this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .PreviousComments,
                this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .Supplycomments,
                StringComparison.CurrentCultureIgnoreCase
              )) ||
              DateTime.NotEquals(this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                .PrevNextSupplyDate,
                this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .NextSupplyDate)
            ) {
              this.PresTechValidatedItems[i].EditedGridID = 1;
            }
            if (
              this.PresTechValidatedItems[i].EditedGridID == 1 ||
              this.PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                .EditedGridID == 1 ||
              (this.PresTechValidatedItems[i].PresTechValidatedItemsChild !=
                null &&
                this.PresTechValidatedItems[i].PresTechValidatedItemsChild
                  .Count > 0 &&
                (this.PresTechValidatedItems[i].PresTechValidatedItemsChild.Any(
                  (x) => x.EditedGridID == 1
                ) ||
                  this.PresTechValidatedItems[
                    i
                  ].PresTechValidatedItemsChild.Any(
                    (x) =>
                      x.FormViewerDetails != null &&
                      x.FormViewerDetails.BasicDetails != null &&
                      x.FormViewerDetails.BasicDetails.EditedGridID == 1
                  )))
            ) {
              if (!this.PresTechValidatedItems[i].IsGroupHeader) {
                let IsChildGridEdited: boolean = false;
                if (
                  this.PresTechValidatedItems[i].PresTechValidatedItemsChild !=
                    null &&
                  this.PresTechValidatedItems[i].PresTechValidatedItemsChild
                    .Count > 0
                ) {
                  let IsComponentEdited: boolean = false;
                  if (
                    this.PresTechValidatedItems[
                      i
                    ].PresTechValidatedItemsChild.All(
                      (x) =>
                        x.FormViewerDetails != null &&
                        x.FormViewerDetails.BasicDetails != null
                    )
                  ) {
                    for(let j=0; j< this.PresTechValidatedItems[i].PresTechValidatedItemsChild.Count; j++ ){
                      let child: PrescriptionItemVM = this.PresTechValidatedItems[i].PresTechValidatedItemsChild[j];                    
                      IsComponentEdited =
                        (!String.IsNullOrEmpty(
                          child.FormViewerDetails.BasicDetails.Supplycomments
                        ) &&
                          !String.Equals(
                            child.FormViewerDetails.BasicDetails
                              .PrevSupplyComments,
                            child.FormViewerDetails.BasicDetails.Supplycomments,
                            StringComparison.InvariantCultureIgnoreCase
                          )) ||
                        (child.FormViewerDetails.BasicDetails.NextSupplyDate !=
                          null &&
                          DateTime.NotEquals(child.FormViewerDetails.BasicDetails
                            .PrevNextSupplyDate,
                            child.FormViewerDetails.BasicDetails
                              .NextSupplyDate))||
                        !String.Equals(
                          child.SelectedSupplyreq.Value,
                          Resource.TechValidate.Empty,
                          StringComparison.InvariantCultureIgnoreCase
                        ) ||
                        child.FormViewerDetails.BasicDetails.EditedGridID ==
                          1 ||
                        child.FormViewerDetails.BasicDetails
                          .SelectedsupplyInstruction !=
                          child.FormViewerDetails.BasicDetails
                            .PrevSelectedsupplyInstruction ||
                        (child.FormViewerDetails.TechValidateDetails != null &&
                          child.FormViewerDetails.TechValidateDetails
                            .TechValidatedItems != null &&
                          child.FormViewerDetails.TechValidateDetails
                            .TechValidatedItems.Count > 0);
                      if (IsComponentEdited) {
                        break;
                      }
                    }
                  }
                  for (
                    let j: number = 0;
                    j <
                    this.PresTechValidatedItems[i].PresTechValidatedItemsChild
                      .Count;
                    j++
                  ) {
                    if (
                      (!String.Equals(
                        this.PresTechValidatedItems[i]
                          .PresTechValidatedItemsChild[j].SelectedSupplyreq
                          .Value,
                        Resource.TechValidate.Empty,
                        StringComparison.InvariantCultureIgnoreCase
                      ) ||
                        (this.PresTechValidatedItems[i]
                          .PresTechValidatedItemsChild[j].FormViewerDetails
                          .BasicDetails.SelectedsupplyInstruction != null &&
                          this.PresTechValidatedItems[i]
                            .PresTechValidatedItemsChild[j].FormViewerDetails
                            .BasicDetails.SelectedsupplyInstruction.Count >
                            0) ||
                        !String.IsNullOrEmpty(
                          this.PresTechValidatedItems[i]
                            .PresTechValidatedItemsChild[j].FormViewerDetails
                            .BasicDetails.Supplycomments
                        ) ||
                        DateTime.NotEquals(this.PresTechValidatedItems[i]
                          .PresTechValidatedItemsChild[j].FormViewerDetails
                          .BasicDetails.NextSupplyDate, DateTime.MinValue) ||
                        (this.PresTechValidatedItems[i]
                          .PresTechValidatedItemsChild[j].FormViewerDetails
                          .TechValidateDetails != null &&
                          this.PresTechValidatedItems[i]
                            .PresTechValidatedItemsChild[j].FormViewerDetails
                            .TechValidateDetails.TechValidatedItems != null &&
                          this.PresTechValidatedItems[i]
                            .PresTechValidatedItemsChild[j].FormViewerDetails
                            .TechValidateDetails.TechValidatedItems.Count >
                            0)) &&
                      IsComponentEdited
                    ) {
                      oPrescItem =
                        new IPPManagePrescSer.TechnicalValidationInfo();
                      oPrescItem = this.GetTechValidateChildItems(
                        this.PresTechValidatedItems[i]
                          .PresTechValidatedItemsChild[j],
                        'MCIChild'
                      );
                      lstPrescItems.Add(oPrescItem);
                      oPrescItem = null;
                      IsChildGridEdited = true;
                    }
                  }
                }
                if (!IsChildGridEdited) {
                  oPrescItem = this.GetTechValidateChildItems(
                    this.PresTechValidatedItems[i],
                    'MCIParent'
                  );
                  lstPrescItems.Add(oPrescItem);
                  oPrescItem = null;
                }
              }
            }
          }
        }
        let oDispense: IPPManagePrescSer.Dispensinginstructionhistory =
          new Dispensinginstructionhistory();
        if (this.sdischargeinslaunch || this.DispensingInstruction != null) {
          if (this.DispensingInstruction != null) {
            oDispense.DispensingInstruction =
              new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
            this.DispensingInstruction.forEach((objDispInfo) => {
              oDispense.DispensingInstruction.Add(
                ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                  Code: objDispInfo.Value,
                  Name: objDispInfo.DisplayText,
                })
              );
              if (
                String.Compare(
                  objDispInfo.Value,
                  CConstants.Other,
                  StringComparison.InvariantCultureIgnoreCase
                ) == 0
              ) {
                oDispense.OtherDispensingInstruction =
                  this.OtherDispensingInstruction;
              }
            });
          }
        } else {
          oDispense.DispensingInstruction =
            new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
          if (
            this.PresTechValidatedItems[0] != null &&
            this.PresTechValidatedItems[0].formViewerDetails != null &&
            this.PresTechValidatedItems[0].formViewerDetails.BasicDetails !=
              null &&
            this.PresTechValidatedItems[0].formViewerDetails.BasicDetails
              .DispensingInstruction != null
          ) {
            this.PresTechValidatedItems[0].formViewerDetails.BasicDetails.DispensingInstruction.forEach(
              (objDispInfo) => {
                oDispense.DispensingInstruction.Add(
                  ObjectHelper.CreateObject(
                    new IPPManagePrescSer.ObjectInfo(),
                    {
                      Code: objDispInfo.Value,
                      Name: objDispInfo.DisplayText,
                    }
                  )
                );
                if (
                  String.Compare(
                    objDispInfo.Value,
                    CConstants.Other,
                    StringComparison.InvariantCultureIgnoreCase
                  ) == 0
                ) {
                  oDispense.OtherDispensingInstruction =
                    objDispInfo.DisplayText;
                } else if (
                  !String.IsNullOrEmpty(
                    this.PresTechValidatedItems[0].FormViewerDetails
                      .BasicDetails.OtherDispensingInstruction
                  )
                ) {
                  oDispense.OtherDispensingInstruction =
                    this.PresTechValidatedItems[0].FormViewerDetails.BasicDetails.OtherDispensingInstruction;
                }
                if (
                  String.Compare(
                    objDispInfo.Value,
                    CConstants.Addtionalcomments,
                    StringComparison.InvariantCultureIgnoreCase
                  ) == 0
                ) {
                  oDispense.Additionalcomments = objDispInfo.DisplayText;
                }
              }
            );
          }
        }
        oDispense.EncounterOid = PatientContext.EncounterOid;
        if (!String.IsNullOrEmpty(this.sAdditionalcomments)) {
          oDispense.DispensingInstruction.Add(
            ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
              Code: CConstants.Addtionalcomments,
              Name: this.sAdditionalcomments,
            })
          );
          oDispense.Additionalcomments = this.sAdditionalcomments;
        }
        let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
          new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        let objReqTechFill: IPPManagePrescSer.CReqMsgSubmitTechValidationItems =
          new IPPManagePrescSer.CReqMsgSubmitTechValidationItems();
        objReqTechFill.oContextInformation = Common.FillContext();
        objReqTechFill.oTechnicalValidationInfoBC =
          new ObservableCollection<IPPManagePrescSer.TechnicalValidationInfo>(
            lstPrescItems
          );
        objReqTechFill.oDispensinginstructionhistoryBC =
          new Dispensinginstructionhistory();
        if (objReqTechFill.oTechnicalValidationInfoBC != null) {
          oDispense.CACode = objReqTechFill.oTechnicalValidationInfoBC
            .Where((x) => !String.IsNullOrEmpty(x.RequisitionCACode))
            .Select((x) => x.RequisitionCACode)
            .FirstOrDefault();
        }
        oDispense.EncounterType = PatientContext.EncounterType;
        oDispense.PresType = PatientContext.PrescriptionType;
        objReqTechFill.oDispensinginstructionhistoryBC = oDispense;
        let IncludeMedicationDispenseBehaviour: boolean =
          ContextManager.Instance['IncludeMedicationDispenseBehaviour'] !=
            null &&
          ContextManager.Instance['IncludeMedicationDispenseBehaviour']
            .ToString()
            .Equals('true', StringComparison.OrdinalIgnoreCase);
        let objMsg: iMessageBox = new iMessageBox();
        objMsg.MessageButton = MessageBoxButton.YesNoCancel;
        objMsg.IconType = MessageBoxType.Question;
        objMsg.Title = 'Lorenzo';
        if (
          liPrescriptionItems.Count == 0 ||
          !IncludeMedicationDispenseBehaviour
        ) {
          objServiceProxy.SubmitTechValidationItemsCompleted = (s, e) => {
            this.objServiceProxy_SubmitTechValidationItemsCompleted(s, e);
          };
          // this code is added because of oTechnicalValidationInfoBC field should be empty if no length is 0
          if (objReqTechFill.oTechnicalValidationInfoBC && objReqTechFill.oTechnicalValidationInfoBC.Count == 0) {
            objReqTechFill.oTechnicalValidationInfoBC = {} as any;
          }
          objServiceProxy.SubmitTechValidationItemsAsync(objReqTechFill);
        } else {
          objMsg.MessageBoxClose = (o: Object, e: MessageEventArgs) => {
            if (e.MessageBoxResult == MessageBoxResult.Cancel) {
              Busyindicator.SetStatusIdle('FINISH');
              return;
            } else {
              objReqTechFill.oDispensinginstructionhistoryBC.IgnoreIfRequestExists =
                e.MessageBoxResult == MessageBoxResult.No;
              objServiceProxy.SubmitTechValidationItemsCompleted = (s, e) => {
                this.objServiceProxy_SubmitTechValidationItemsCompleted(s, e);
              };
              objServiceProxy.SubmitTechValidationItemsAsync(objReqTechFill);
            }
          };
          objMsg.Message = String.Format(
            Resource.TechValidate.ResentRequestMessage,
            String.Join('\n\n\t', liPrescriptionItems.ToArray())
          );
          objMsg.Height = 300;
          objMsg.Width = 420;
          objMsg.Show();
          ObjectHelper.stopScreenFreezeEvent(true);
        }
      }
      //Add for zero count
      else {
        Busyindicator.SetStatusIdle('FINISH');
        if (this.OnSubmitCompleted != null) {
          this.OnSubmitCompleted(true, String.Empty);
        }
      }
    } else {
      Busyindicator.SetStatusIdle('FINISH');
      if (this.OnSubmitCompleted != null) {
        this.OnSubmitCompleted(true, String.Empty);
      }
    }
  }
  objServiceProxy_SubmitTechValidationItemsCompleted(
    sender: Object,
    e: IPPManagePrescSer.SubmitTechValidationItemsCompletedEventArgs
  ): void {
    let sPrescriptionOID: string = String.Empty;
    let sPrescriptionItemOID: string = String.Empty;
    let _ErrorID: number = 80000001;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateVM, Method:SubmitDrugsCompleted()';
    if (e.Error == null) {
      try {
        let oRes: IPPManagePrescSer.CResMsgSubmitTechValidationItems = e.Result;
        if (
          oRes != null &&
          oRes.oContextInformation != null &&
          oRes.oContextInformation.Errors != null &&
          oRes.oContextInformation.Errors.Count > 0 &&
          oRes.oContextInformation.Errors[0] != null
        ) {
          let oMsgBox: iMessageBox = new iMessageBox();
          oMsgBox.MessageBoxClose = (s, e) => {
            this.oMsgBox_MessageBoxClose(s, e);
          };
          oMsgBox.Title = Resource.TechValidate.ErrLor;
          oMsgBox.MessageButton = MessageBoxButton.OK;
          oMsgBox.IconType = MessageBoxType.Critical;
          if (oRes.oContextInformation.Errors[0].ErrorID == 900025) {
            oMsgBox.Message = Resource.MedicationErrors._900025_Msg;
          } else {
            oMsgBox.Message = oRes.oContextInformation.Errors[0].Message;
          }
          oMsgBox.Show();
        } else {
          if (this.OnSubmitCompleted != null) {
            let sPrescriptionOIDs: string = String.Empty;
            let delimeter: string = ',';
            if (this.PrescriptionIDS_FromGrid != null)
            {
              sPrescriptionOIDs =this.PrescriptionIDS_FromGrid.Distinct().ToArray().join();
            }
           /*    sPrescriptionOIDs =
                this.PrescriptionIDS_FromGrid.Distinct().Aggregate(
                  (i, j) => i.ToString() + delimeter + j.ToString()
                ); */
              
            if (!String.IsNullOrEmpty(sPrescriptionOIDs))
              this.OnSubmitCompleted(true, sPrescriptionOIDs);
          }
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    }
  }
  oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {}
  public get PresTechValidatedItems(): ObservableCollection<PrescriptionItemVM> {
    return this._propTechPresItem;
  }
  public set PresTechValidatedItems(
    value: ObservableCollection<PrescriptionItemVM>
  ) {
    if (ObjectHelper.ReferenceEquals(this._propTechPresItem, value) != true) {
      this._propTechPresItem = value;
      this.NotifyPropertyChanged("PresTechValidatedItems");
    }
  }

  private NotifyPropertyChanged(prop: string) {
    let e:PropertyChangedEventArgs = { PropertyName: prop};
      if (this.PropertyChanged)
        this.PropertyChanged({},e);
  }
  private _dispensingInstruction: ObservableCollection<CListItem>;
  public get DispensingInstruction(): ObservableCollection<CListItem> {
    return this._dispensingInstruction;
  }
  public set DispensingInstruction(value: ObservableCollection<CListItem>) {
    if (!ObjectHelper.ReferenceEquals(this._dispensingInstruction, value)) {
      this._dispensingInstruction = value;
      //NotifyPropertyChanged("DispensingInstruction");
    }
  }
  public sdischargeinslaunch: boolean = false;
  private _OtherDispensingInstruction: string;
  public get OtherDispensingInstruction(): string {
    return this._OtherDispensingInstruction;
  }
  public set OtherDispensingInstruction(value: string) {
    if (
      !ObjectHelper.ReferenceEquals(this._OtherDispensingInstruction, value)
    ) {
      this._OtherDispensingInstruction = value;
      //NotifyPropertyChanged("OtherDispensingInstruction");
    }
  }
  private _DispensingInstructionsList: ObservableCollection<CListItem>;
  private _sOtherInstructions: string = String.Empty;
  private _sadditionalcomments: string = String.Empty;
  public get DispensingInstructionsList(): ObservableCollection<CListItem> {
    return this._DispensingInstructionsList;
  }
  public set DispensingInstructionsList(
    value: ObservableCollection<CListItem>
  ) {
    this._DispensingInstructionsList = value;
    //NotifyPropertyChanged("DispensingInstructionsList");
  }
  public get sOtherInstructions(): string {
    return this._sOtherInstructions;
  }
  public set sOtherInstructions(value: string) {
    this._sOtherInstructions = value;
    //NotifyPropertyChanged("sOtherInstructions");
  }
  public get sAdditionalcomments(): string {
    return this._sadditionalcomments;
  }
  public set sAdditionalcomments(value: string) {
    this._sadditionalcomments = value;
    //NotifyPropertyChanged("sAdditionalcomments");
  }
  public get Technicalvalidateupdate(): boolean {
    return this.TechnicalvalidateupdateField;
  }
  public set Technicalvalidateupdate(value: boolean) {
    if (this.TechnicalvalidateupdateField.Equals(value) != true) {
      this.TechnicalvalidateupdateField = value;
      //NotifyPropertyChanged("Technicalvalidateupdate");
    }
  }
  public set SelectedPrescItem(value: PrescriptionItemVM) {
    if (ObjectHelper.ReferenceEquals(this._SelectedPrescItem, value) != true) {
      this._SelectedPrescItem = value;
      if (value != null) {
        this.IsMciChildSelected = false;
        if (this.SelectedPrescItem != null)
          this.SelectedPrescItem.IsNonformulary = '1';
      }
      if (this.OnSelectedPrescItemChanged != null) {
        this.OnSelectedPrescItemChanged(this.SelectedPrescItem);
      }
      //NotifyPropertyChanged("SelectedPrescItem");
    }
  }
  public get SelectedPrescItem(): PrescriptionItemVM {
    return this._SelectedPrescItem;
  }
  public set SelectedChildPresItem(value: PrescriptionItemVM) {
    if (
      ObjectHelper.ReferenceEquals(this._SelectedChildPresItem, value) != true
    ) {
      this._SelectedChildPresItem = value;
      this.IsMciChildSelected = true;
      if (value != null) {
      }
      if (this.OnSelectedPrescItemChanged != null) {
        this.OnSelectedPrescItemChanged(this.SelectedChildPresItem);
      }
      //NotifyPropertyChanged("SelectedChildPresItem");
    }
  }
  public get SelectedChildPresItem(): PrescriptionItemVM {
    return this._SelectedChildPresItem;
  }
  private quantitys: ObservableCollection<CListItem>;
  public get Quantitys(): ObservableCollection<CListItem> {
    return this.quantitys;
  }
  public set Quantitys(value: ObservableCollection<CListItem>) {
    this.quantitys = value;
    //super.NotifyPropertyChanged("Quantitys");
  }
  private DisposeVMEvents(): void {
    this.OnSelectedPrescItemChanged = null;
    this.OnDeactivatedPrescItemsFound = null;
    this.OnSelectedChldPrescItemChanged = null;
    this.OnSubmitCompleted = null;
    this.OnLoadMCIQuantityFound = null;
  }
  public DoCleanUP(): void {
    InfHumdificationConceptCodeData.ConceptCodes = null;
    MedicationCommonConceptCodeData.ConceptCodes = null;
    MedicationCommonConceptCodeData.ViewConceptCodes = null;
    InfusionTypeConceptCodeData.ConceptCodes = null;
    this.DisposeVMEvents();
  }
}
