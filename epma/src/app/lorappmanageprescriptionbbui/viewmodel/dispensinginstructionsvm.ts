import { ProcessRTE } from 'epma-platform/services';
import {
  StringComparison,
  ObservableCollection,
  CListItem,
  List,
  RTEEventargs,
} from 'epma-platform/models';
import {
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import 'epma-platform/stringextension';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { Dictionary } from 'epma-platform/dictionary';
import { MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import {
  CReqMsgGetDispensinginstDetails,
  CResMsgGetDispensinginstDetails,
  GetDispensinginstDetailsCompletedEventArgs,
  IPPMAManagePrescriptionWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Resource } from '../resource';
import { CConstants, ValueDomain } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Common } from '../utilities/common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';

export class DispensingInstructionsVM extends ViewModelBase {
  private _DispensingInstructionsList: ObservableCollection<CListItem>;
  private _sOtherInstructions: string = String.Empty;
  private _bOtherInstructions: boolean = false;
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
  public get bOtherInstructions(): boolean {
    return this._bOtherInstructions;
  }
  public set bOtherInstructions(value: boolean) {
    this._bOtherInstructions = value;
    //NotifyPropertyChanged("bOtherInstructions");
  }
  private _DispensinginstructionDetails: ObservableCollection<DispensinginstructionHistory> =
    new ObservableCollection<DispensinginstructionHistory>();
  public get DispensinginstructionDetails(): ObservableCollection<DispensinginstructionHistory> {
    return this._DispensinginstructionDetails;
  }
  public set DispensinginstructionDetails(
    value: ObservableCollection<DispensinginstructionHistory>
  ) {
    if (value != null) {
      this._DispensinginstructionDetails.CopyFrom(value);
    }

    //NotifyPropertyChanged("DispensinginstructionDetails");
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
  private _sadditionalcomments: string = String.Empty;
  public get sAdditionalcomments(): string {
    return this._sadditionalcomments;
  }
  public set sAdditionalcomments(value: string) {
    this._sadditionalcomments = value;
    //NotifyPropertyChanged("sAdditionalcomments");
  }
  private _IstxtOtherInstructionsEnable: boolean = false;
  public get IstxtOtherInstructionsEnable(): boolean {
    return this._IstxtOtherInstructionsEnable;
  }
  public set IstxtOtherInstructionsEnable(value: boolean) {
    this._IstxtOtherInstructionsEnable = value;
    //NotifyPropertyChanged("IstxtOtherInstructionsEnable");
  }
  public _isOtherinstructionMandatory: boolean = false;
  public get isOtherinstructionMandatory(): boolean {
    return this._isOtherinstructionMandatory;
  }
  public set isOtherinstructionMandatory(value: boolean) {
    if (value != this._isOtherinstructionMandatory) {
      this._isOtherinstructionMandatory = value;
      //super.NotifyPropertyChanged("isOtherinstructionMandatory");
    }
  }
  oPrescriptionItemVM: PrescriptionItemVM = null;
  constructor(pVM: PrescriptionItemVM) {
    super();
    this.GetDispensingDetails(PatientContext.EncounterOid);
    this.oPrescriptionItemVM = pVM;
    if (
      this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
        .DispensingInstructionsList == null
    )
      ProcessRTE.GetHierarchicalValuesByDomains(
        CConstants.CodingSchemeName,
        CConstants.Version,
        CConstants.FilterType,
        ContextInfo.Culture,
        ValueDomain.DispensingInstruction,
        (s,e) => {this.OnRTEResult(s);}
      );
    else this.BindValuestoControl();
  }
  //public delegate void ShowValidation();
  public OnValidationError: Function;
  OnRTEResult(args: RTEEventargs): void {
    let bSelected: boolean = false;
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (String.Compare(args.Request, ValueDomain.DispensingInstruction) == 0) {
      if (args.Result instanceof Dictionary) {
        let objResult: Dictionary<string, List<CListItem>> = <
          Dictionary<string, List<CListItem>>
        >args.Result;
        objResult.forEach((objDomainDetail) => {
          this.DispensingInstructionsList =
            new ObservableCollection<CListItem>();
          this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstructionsList =
            new ObservableCollection<CListItem>();
          bSelected = false;
          this.bOtherInstructions = false;
          this.sOtherInstructions = String.Empty;
          this.sAdditionalcomments = String.Empty;
          let MatchedDispensingInstruction: CListItem = null;
          (<List<CListItem>>objDomainDetail.Value).forEach((oCListItem) => {
            if (
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                .PresTechValidatedItems != null &&
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                .PresTechValidatedItems.Count > 0 &&
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                .PresTechValidatedItems[0].formViewerDetails != null &&
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                .PresTechValidatedItems[0].formViewerDetails.BasicDetails !=
                null
            ) {
              if (
                this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                  .PresTechValidatedItems[0].formViewerDetails.BasicDetails
                  .DispensingInstruction != null &&
                this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                  .PresTechValidatedItems[0].formViewerDetails.BasicDetails
                  .DispensingInstruction.Count > 0
              ) {
                MatchedDispensingInstruction =
                  this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].formViewerDetails.BasicDetails.DispensingInstruction.Where(
                    (x) =>
                      x.IsSelected &&
                      String.Compare(
                        x.Value,
                        oCListItem.Value,
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0
                  ).FirstOrDefault();
              }
              if (MatchedDispensingInstruction != null) {
                this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction =
                  this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].formViewerDetails.BasicDetails.DispensingInstruction;
                bSelected = true;
                if (
                  bSelected &&
                  String.Compare(
                    oCListItem.Value,
                    CConstants.Other,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0
                ) {
                  this.bOtherInstructions = true;
                  if (
                    !String.IsNullOrEmpty(
                      this.oPrescriptionItemVM.FormViewerDetails
                        .TechvalidateCADetails.PresTechValidatedItems[0]
                        .formViewerDetails.BasicDetails
                        .OtherDispensingInstruction
                    )
                  ) {
                    this.sOtherInstructions =
                      this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].formViewerDetails.BasicDetails.OtherDispensingInstruction;
                  }
                  this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction =
                    this.sOtherInstructions;
                }
              } else {
                bSelected = false;
              }
              if (
                !String.IsNullOrEmpty(
                  this.oPrescriptionItemVM.FormViewerDetails
                    .TechvalidateCADetails.PresTechValidatedItems[0]
                    .formViewerDetails.BasicDetails.DispensingAdditionalComments
                )
              ) {
                this.sAdditionalcomments =
                  this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].formViewerDetails.BasicDetails.DispensingAdditionalComments;
                this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.sAdditionalcomments =
                  this.sAdditionalcomments;
              }
            }
            this.DispensingInstructionsList.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: oCListItem.DisplayText,
                Value: oCListItem.Value,
                IsSelected: bSelected,
              })
            );
            this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstructionsList =
              this.DispensingInstructionsList;
          });
        });
      }
      if (this.bOtherInstructions) {
        this.isOtherinstructionMandatory = this.IstxtOtherInstructionsEnable =
          true;
      }
      Busyindicator.SetStatusIdle('SupplyDispensingInstructions');
    }
  }
  private BindValuestoControl(): void {
    if (
      this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
        .DispensingInstructionsList != null
    ) {
      let bSelected: boolean = false;
      this.DispensingInstructionsList = new ObservableCollection<CListItem>();
      this.bOtherInstructions = false;
      this.sOtherInstructions = String.Empty;
      this.sAdditionalcomments = String.Empty;
      let MatchedDispensingInstruction: CListItem = null;
      this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstructionsList.forEach(
        (oCListItem) => {
          if (
            this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
              .DispensingInstruction != null &&
            this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
              .DispensingInstruction.Count > 0
          ) {
            MatchedDispensingInstruction =
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction.Where(
                (x) =>
                  x.IsSelected &&
                  String.Compare(
                    x.Value,
                    oCListItem.Value,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0
              ).FirstOrDefault();
          }
          if (MatchedDispensingInstruction != null) {
            bSelected = true;
            if (
              bSelected &&
              String.Compare(
                oCListItem.Value,
                CConstants.Other,
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            ) {
              this.bOtherInstructions = true;
              if (
                !String.IsNullOrEmpty(
                  this.oPrescriptionItemVM.FormViewerDetails
                    .TechvalidateCADetails.OtherDispensingInstruction
                )
              ) {
                this.sOtherInstructions =
                  this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction;
              }
            }
          } else {
            bSelected = false;
          }
          this.DispensingInstructionsList.Add(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oCListItem.DisplayText,
              Value: oCListItem.Value,
              IsSelected: bSelected,
            })
          );
          if (
            !String.IsNullOrEmpty(
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails
                .sAdditionalcomments
            )
          ) {
            this.sAdditionalcomments =
              this.oPrescriptionItemVM.FormViewerDetails.TechvalidateCADetails.sAdditionalcomments;
          }
        }
      );
      if (this.bOtherInstructions) {
        this.isOtherinstructionMandatory = this.IstxtOtherInstructionsEnable =
          true;
      }
    }
    Busyindicator.SetStatusIdle('SupplyDispensingInstructions');
  }
  public BindValtoCntrlFrmGrid(oDis: DispensinginstructionHistory): void {
    this.sAdditionalcomments = oDis.Additionalcomments;
    this.sOtherInstructions = oDis.OtherDispensingInstruction;
    for (let i: number = 0; i < this.DispensingInstructionsList.Count; i++) {
      let oSelectedList = oDis.DispensingInstruction.Where(
        (y) => y.Code == this.DispensingInstructionsList[i].Value
      );
      if (oSelectedList != null && oSelectedList.Any()) {
        this.DispensingInstructionsList[i].IsSelected = true;
      } else this.DispensingInstructionsList[i].IsSelected = false;
    }
  }
  GetDispensingDetails(EncounterOID: number): void {
    let oReq: CReqMsgGetDispensinginstDetails =
      new CReqMsgGetDispensinginstDetails();
    oReq.EncounterOIDBC = EncounterOID;
    oReq.oContextInformation = Common.FillContext();
    let objServiceProxy: IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetDispensinginstDetailsCompleted = (s, e) => {
      this.objServiceProxy_GetDispensinginstDetailsCompleted(s, e);
    };
    objServiceProxy.GetDispensinginstDetailsAsync(oReq);
  }
  objServiceProxy_GetDispensinginstDetailsCompleted(
    sender: Object,
    e: GetDispensinginstDetailsCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: CResMsgGetDispensinginstDetails = e.Result;
      if (
        oRes != null &&
        oRes.arrDispensinginstructionhistory != null &&
        oRes.arrDispensinginstructionhistory.Count > 0
      ) {
        let sDispense: string[] = null;
        this.DispensinginstructionDetails =
          new ObservableCollection<DispensinginstructionHistory>();
        oRes.arrDispensinginstructionhistory.forEach(
          (objDispensinginstructionhistory) => {
            let sotherins: string = String.Empty;
            let oDispensinginstructionhistory: DispensinginstructionHistory =
              new DispensinginstructionHistory();
            if (
              oDispensinginstructionhistory.EncounterOid !=
              objDispensinginstructionhistory.EncounterOid
            ) {
              oDispensinginstructionhistory.DispensingInstruction =
                new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
              oDispensinginstructionhistory.Dispensinginstructions =
                objDispensinginstructionhistory.Dispensinginstructions;
              if (
                !String.IsNullOrEmpty(
                  oDispensinginstructionhistory.Dispensinginstructions
                )
              ) {
                sDispense =
                  oDispensinginstructionhistory.Dispensinginstructions.Split(
                    '^'
                  );
                let nlength: number = sDispense.length;
                for (let j: number = 0; j < nlength; j++) {
                  oDispensinginstructionhistory.DispensingInstruction.Add(
                    ObjectHelper.CreateObject(
                      new IPPManagePrescSer.ObjectInfo(),
                      { Code: sDispense[j] }
                    )
                  );
                  if (
                    !String.Equals(sDispense[j], CConstants.Addtionalcomments)
                  ) {
                    if (String.Equals(sDispense[j], CConstants.Other))
                      sotherins =
                        CConstants.OtherInstruction +
                        ' : ' +
                        objDispensinginstructionhistory.OtherDispensingInstruction +
                        ';';
                    else {
                      let dispensinginstructions: string = String.Empty;
                      dispensinginstructions = CommonBB.GetText(
                        sDispense[j],
                        MedicationCommonConceptCodeData.ViewConceptCodes
                      );
                      if (!String.IsNullOrEmpty(dispensinginstructions))
                          oDispensinginstructionhistory.DispensinginstructionsName = 
                          (oDispensinginstructionhistory.DispensinginstructionsName ?? '') +  dispensinginstructions + ';';
                    }
                  }
                }
                if(typeof(oDispensinginstructionhistory.DispensinginstructionsName) == 'undefined' || oDispensinginstructionhistory.DispensinginstructionsName == null){
                  oDispensinginstructionhistory.DispensinginstructionsName = '';
                }
                oDispensinginstructionhistory.DispensinginstructionsName +=
                  sotherins;
                sotherins = String.Empty;
              }
              if (
                !String.IsNullOrEmpty(
                  oDispensinginstructionhistory.DispensinginstructionsName
                )
              ) {
                oDispensinginstructionhistory.DispensinginstructionsName =
                  oDispensinginstructionhistory.DispensinginstructionsName.TrimEnd(
                    ';'
                  );
              }
              oDispensinginstructionhistory.Additionalcomments =
                objDispensinginstructionhistory.Additionalcomments;
              oDispensinginstructionhistory.OtherDispensingInstruction =
                objDispensinginstructionhistory.OtherDispensingInstruction;
              oDispensinginstructionhistory.EncounterOid =
                objDispensinginstructionhistory.EncounterOid;
              oDispensinginstructionhistory.EncounterDetail =
                objDispensinginstructionhistory.EncounterDetail;
              this.DispensinginstructionDetails.Add(
                oDispensinginstructionhistory
              );
            }
          }
        );
      }
    }
  }
  public chkInstructions_OnSelect(Conceptcode: string): void {
    if (
      String.Equals(
        Conceptcode,
        CConstants.Other,
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      this.isOtherinstructionMandatory = this.IstxtOtherInstructionsEnable =
        true;
    }
  }
  public chkInstructions_OnUnSelect(Conceptcode: string): void {
    if (
      String.Equals(
        Conceptcode,
        CConstants.Other,
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      this.isOtherinstructionMandatory = this.IstxtOtherInstructionsEnable =
        false;
      this.sOtherInstructions = String.Empty;
    }
  }
  public CheckValidation(): boolean {
    if (
      this.DispensingInstructionsList != null &&
      this.DispensingInstructionsList.Any(
        (o) =>
          o != null &&
          String.Compare(
            o.Value,
            CConstants.Other,
            StringComparison.InvariantCultureIgnoreCase
          ) == 0 &&
          o.IsSelected
      ) &&
      String.IsNullOrEmpty(this.sOtherInstructions)
    ) {
      if (this.OnValidationError != null) this.OnValidationError();
      else
        iMessageBox.Show(
          Resource.Dispensinginstruction.sLorenzoTitle,
          Resource.Dispensinginstruction.sMandatoryMessage,
          MessageBoxType.Information,
          MessageBoxButton.OK
        );
      return false;
    }
    return true;
  }
}

export class DispensinginstructionHistory extends IPPManagePrescSer.Dispensinginstructionhistory {
  // implements I NotifyPropertyChanged{
  private _DispensinginstructionsName: string;
  public get DispensinginstructionsName(): string {
    return this._DispensinginstructionsName;
  }
  public set DispensinginstructionsName(value: string) {
    this._DispensinginstructionsName = value;
    // RaisePropertyChanged("DispensinginstructionsName");
  }
}
