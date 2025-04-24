import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE } from 'epma-platform/services';
import { StringSplitOptions,Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, IEnumerable, ChildWindow } from 'epma-platform/models';
import { AppDialog, iTabItem } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import {Resource}  from '../resource'
import {Resource as resource}  from '../../lorappmedicationcommonbb/resource'
//import {List} from "epma-platform/models"
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { InfHumdificationConceptCodeData, InfusionTypeConceptCodeData, MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import { Visibility } from 'epma-platform/models';
import { CConstants,PrescriptionTypes,ValueDomain } from '../utilities/constants';
import { ObservableCollection,List,EventContextModel,ContextType,ContextEventargs,
    RTEEventargs,termModel,Constants,CListItem,ContextInfo } from "epma-platform/models";
import { FormviewerComboValues } from '../utilities/globalvariable';
import { ActivityTypes } from '../model/common';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Common } from '../utilities/common';
import { CustomTechValidatedItem } from './customtechvalidateditem';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'
import { Environment } from '../../product/shared/models/Common';
import { AppContextInfo, AppSessionInfo, ClerkFormViewDeftBehaviour, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { FormViewerVM } from './formviewervm';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { Exception } from 'src/app/shared/epma-platform/models/Exception';
import { MulticomponentChildVM } from './MulticomponentVM';
import { PresItemDRCVM } from './PresItemDRCVM';
import { BasicDetailsVM } from './BasicDetailsVM';
import { SupplyDispensingInstructionsVM } from './SupplyDispensingInstructionsVM';
import { CResMsgGetRelatedOptions, DrugItemBasicInfo, ObjectInfo, TechnicalValidationInfo } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { medsupplydispensinginstructionstab } from '../view/medsupplydispensinginstructionstab';
import { medsupplydispensinginstructions } from '../view/medsupplydispensinginstructions';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';

    export class TechValidateVM extends ClonableViewModelBase implements IViewModelBase {
        //public delegate void DlgtOnSelPrescItemChanged(PrescriptionItemVM oPrescItemVM);
        public OnSelectedPrescItemChanged: Function;
        //public delegate void DlgtOnDeactivatedPrescItemsFound(string sPrescItems, string sCompItems);
        public OnDeactivatedPrescItemsFound: Function;
        //public delegate void DlgtOnSelChildPrescItemChanged(PrescriptionItemVM oPrescItemVM);
        public OnSelectedChldPrescItemChanged: Function;
        //public delegate void DlgtOnSubmitCompleted(bool IsTechValSubmitted);
        public IsMciChildSelected: boolean = false;
        public IsTechQtyUOM: boolean = false;
        public IsContextLoad: boolean = false;
        public TotalQuantityMand: boolean = false;
        public QuantityMand: boolean = false;
        public launchTechvalsupplyinstrmezzanineCheck: boolean = false;
        public FetchfrombasicDetails: boolean = false;
        public IslaunchedFromProductOptions: boolean = false;
        public frmtechDynamicForm : boolean = false;
        private _SelectedsupplyInstruction_ProductClick: ObservableCollection<CListItem>;
        PropertyChanged: Function;
        public get SelectedsupplyInstruction_ProductClick(): ObservableCollection<CListItem> {
            return this._SelectedsupplyInstruction_ProductClick;
        }
        public set SelectedsupplyInstruction_ProductClick(value: ObservableCollection<CListItem>) {
            this._SelectedsupplyInstruction_ProductClick = value;
           //NotifyPropertyChanged("SelectedsupplyInstruction");
        }
        //public delegate void DlgtOnLoadQuantityFound(ObservableCollection < CListItem > Quantitys);
        public OnLoadMCIQuantityFound: Function;
        //public delegate void DlgtOngrdPrescribeRowUnSelected();
        public OngrdPrescribeRowUnSelected: Function;
        private _supplyhyperlinktext: string;
        public get supplyhyperlinktext(): string {
            return this._supplyhyperlinktext;
        }
        public set supplyhyperlinktext(value: string) {
            this._supplyhyperlinktext = value;
           //super.NotifyPropertyChanged("supplyhyperlinktext");
        }
        private _supplyheadertext: string;
        public get supplyheadertext(): string {
            return this._supplyheadertext;
        }
        public set supplyheadertext(value: string) {
            this._supplyheadertext = value;
           //super.NotifyPropertyChanged("supplyheadertext");
        }
        private _supplyhyperlinktooltiptext: string;
        public get supplyhyperlinktooltiptext(): string {
            return this._supplyhyperlinktooltiptext;
        }
        public set supplyhyperlinktooltiptext(value: string) {
            this._supplyhyperlinktooltiptext = value;
           //super.NotifyPropertyChanged("supplyhyperlinktooltiptext");
        }
        private _IsNoInstructionsSelected: boolean = false;
        public get IsNoInstructionsSelected(): boolean {
            return this._IsNoInstructionsSelected;
        }
        public set IsNoInstructionsSelected(value: boolean) {
            if (this._IsNoInstructionsSelected != value) {
                this._IsNoInstructionsSelected = value;
               //NotifyPropertyChanged("IsNoInstructionsSelected");
            }
        }
        public LoadPrescriptionData(): void {
            if (this.GetContextInfo() == 0) {
                this.IsContextLoad = true;
            }
            let sDomainCodes: string = String.Empty;
            sDomainCodes = ValueDomain.SupplyInstruction + "," + ValueDomain.INFUSIONTYPE + "," + ValueDomain.HUMIDIFICATION;
            ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, sDomainCodes, (s,e) => {this.OnRTEResult(s);});
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null) {
                let _ErrorID: number = 80000067;
                let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateVM, Method:OnRTEResult()";
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, new Exception("Error while fetching Supply instructions domain values"));
            }
            else {
                if (String.Compare(args.Request, ValueDomain.SupplyInstruction + "," + ValueDomain.INFUSIONTYPE + "," + ValueDomain.HUMIDIFICATION) == 0) {
                    if (args.Result instanceof Dictionary) {
                        FormviewerComboValues.SupplyInstructions = new ObservableCollection<CValuesetTerm>();
                        let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                        objResult.forEach( (objDomainDetail)=> {
                            switch (objDomainDetail.Key) {
                                case ValueDomain.SupplyInstruction:
                                    {
                                        if (MedicationCommonConceptCodeData.ConceptCodes == null)
                                            MedicationCommonConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            FormviewerComboValues.SupplyInstructions.Add(ObjectHelper.CreateObject(new CValuesetTerm(), {
                                                csCode: oCListItem.Value,
                                                csDescription: oCListItem.DisplayText
                                            }));
                                            MedicationCommonConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), {
                                                csCode: oCListItem.Value,
                                                csDescription: oCListItem.DisplayText
                                            }));
                                        });
                                        break;
                                    }
                                case ValueDomain.INFUSIONTYPE:
                                    if (InfusionTypeConceptCodeData.ConceptCodes == null)
                                        InfusionTypeConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    objDomainDetail.Value.forEach( (oCListItem)=> {
                                        InfusionTypeConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                case ValueDomain.HUMIDIFICATION:
                                    if (InfHumdificationConceptCodeData.ConceptCodes == null)
                                        InfHumdificationConceptCodeData.ConceptCodes = new ObservableCollection<CListItem>();
                                    objDomainDetail.Value.forEach( (oCListItem)=> {
                                        InfHumdificationConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText }));
                                    });
                                    break;
                            }
                        });
                    }
                }
            }
        }
        public IsTechnicallyValidateCA: boolean = false;
        sAllPrescItemOIDs: string = String.Empty;
        sCDPrescItemOIDs: string = String.Empty;
        sNonCDPrescItemOIDs: string = String.Empty;
        sTmpPrescItemOID: string = String.Empty;
        private _DeactivatedPrescItems: string;
        private _DeactivatedCompItems: string;
        public ConstructChildItemVM(oPrescItemView: MulticomponentChildVM, PresItemTech: number, oParentItem: PrescriptionItemVM, oTempPresTmVM: PrescriptionItemVM): PrescriptionItemVM {
            let oTempPrescItemVM: PrescriptionItemVM = new PrescriptionItemVM();
            oTempPrescItemVM.FormViewerDetails = new FormViewerVM();
            oTempPrescItemVM.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
            oTempPrescItemVM.FormViewerDetails.BasicDetails = new BasicDetailsVM(null);
            oTempPrescItemVM.FormViewerDetails.TechValidateDetails = new TechValidateVM();
            let lstTermtext: IEnumerable<CValuesetTerm>;
            let sTmpTermText: string = String.Empty;
            let oCListItem: CListItem;
            let sConcpCode: string = String.Empty;
            if (oPrescItemView != null) {
                oTempPrescItemVM.UniqueMCRowId = oPrescItemView.UniqueMCRowID;
                if (oPrescItemView.IsUpto)
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName = oPrescItemView.ComponentName + " up to " + oPrescItemView.Quantity + " " + oPrescItemView.MCUomName + "~" + oPrescItemView.DrugProperties;
                else oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName = oPrescItemView.ComponentName + " " + oPrescItemView.Quantity + " " + oPrescItemView.MCUomName + "~" + oPrescItemView.DrugProperties;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.MCIchildIdentifyingName = oPrescItemView.ComponentName;
                oTempPrescItemVM.VMVPIdentifyingName = oPrescItemView.VMVPMCIdentifyingName;
                oTempPrescItemVM.PresMultiCompitemOID = oPrescItemView.OID;
                oTempPrescItemVM.PrescriptionItemOID = oPrescItemView.PrescriptionItemOID;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.Route = this.SelectedPrescItem.FormViewerDetails.BasicDetails.Route;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.DosageForm = this.SelectedPrescItem.FormViewerDetails.BasicDetails.DosageForm;
                oTempPrescItemVM.NonFormularyReason = this.SelectedPrescItem.NonFormularyReason;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingOID = oPrescItemView.IdentifyingOID;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType = oPrescItemView.IdentifyingType;
                oTempPrescItemVM.OperationMode = "UM";
                oTempPrescItemVM.SupDisText = Resource.TechValidate.SupplyDisp_Add_Text;
                oTempPrescItemVM.supToolTipDisText = Resource.TechValidate.AddsupinstChild;
                oTempPrescItemVM.PresTechItemOID = PresItemTech;
                oTempPrescItemVM.IsWardStock = oPrescItemView.IsWardStock;
                oTempPrescItemVM.MCIUniqueRowID = oPrescItemView.UniqueMCRowID;
                if (this != null && this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.SelectedPrescItem.FormViewerDetails.BasicDetails.TechSupplyDTTM, DateTime.MinValue) && oTempPrescItemVM != null && oTempPrescItemVM.FormViewerDetails != null && oTempPrescItemVM.FormViewerDetails.BasicDetails != null) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM = this.SelectedPrescItem.FormViewerDetails.BasicDetails.TechSupplyDTTM;
                }
                switch (oPrescItemView.IsSupplyRequested) {
                    case '1':
                    case '2':
                        oTempPrescItemVM.IsOriginalSupplyRequested = oTempPrescItemVM.IsSupplyRequested = true;
                        break;
                    default:
                        oTempPrescItemVM.IsSupplyRequested = false;
                        break;
                }
                oTempPrescItemVM.IsSupplyRequestedEnable = true;
                oTempPrescItemVM.RequisitionCACode = oPrescItemView.RequisitionCACode;
                oTempPrescItemVM.LorenzoID = oPrescItemView.LorenzoID;
                oTempPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem = oParentItem;
                oTempPrescItemVM.IsMCIComponent = true;
                if (oTempPrescItemVM.IsSupplyRequested)
                    oTempPrescItemVM.EnableParentMCIItem = false;
                if (oPrescItemView.SupplyInstruction != null && oPrescItemView.SupplyInstruction.Count > 0 && !oParentItem.IsSupplyRecordedViaCV) {
                    let oSupplyText: StringBuilder = new StringBuilder();
                    let oSupplyValue: StringBuilder = new StringBuilder();
                    let UnresolvedSupInst: StringBuilder = new StringBuilder();
                    if (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction == null)
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction = new ObservableCollection<CListItem>();
                    let nSupplyInstCnt: number = oPrescItemView.SupplyInstruction.Count;
                    let bSupplyInstResolved: boolean = false;
                    for (let i: number = 0; i < nSupplyInstCnt; i++) {
                        bSupplyInstResolved = false;
                        if (!String.Equals(oPrescItemView.SupplyInstruction[i].Code, CConstants.Supplycomments)) {
                            if ((MedicationCommonConceptCodeData.ViewConceptCodes.Where(x => x.csCode == oPrescItemView.SupplyInstruction[i].Code).Any())) {
                                lstTermtext = MedicationCommonConceptCodeData.ViewConceptCodes.Where(x => x.csCode == oPrescItemView.SupplyInstruction[i].Code);
                                if (lstTermtext != null) {
                                    sTmpTermText += lstTermtext.First().csDescription;
                                    sConcpCode = oPrescItemView.SupplyInstruction[i].Code;
                                }
                                oSupplyValue.Append(oPrescItemView.SupplyInstruction[i].Code);
                                oSupplyValue.Append(";");
                                oSupplyText.Append(lstTermtext.First().csDescription);
                                oSupplyText.Append(";");
                                if (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(c => c.Value == oPrescItemView.SupplyInstruction[i].Code).Count() == 0) {
                                    if (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(x => x.Value == oPrescItemView.SupplyInstruction[i].Code).Count() == 0) {
                                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: lstTermtext.First().csDescription,
                                            Value: oPrescItemView.SupplyInstruction[i].Code
                                        }));
                                    }
                                }
                            }
                            else {
                                oSupplyValue.Append(oPrescItemView.SupplyInstruction[i].Code);
                                oSupplyValue.Append(";");
                                bSupplyInstResolved = true;
                            }
                        }
                    }
                    if (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null) {
                        if (oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction == null)
                            oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction = new ObservableCollection<CListItem>();
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach( (instruction)=> {
                            if (oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.Where(x => x.Value == instruction.Value).Count() == 0) {
                                oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.Add(instruction);
                            }
                        });
                    }
                    if (oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst != null && !String.Equals(oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst.Value, CConstants.Supplycomments, StringComparison.InvariantCultureIgnoreCase)) {
                        let supplyTextChk = MedicationCommonConceptCodeData.ConceptCodes.Where(supplyText =>supplyText.csCode==oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst.Value).Select(supplyText => supplyText);
                        if (supplyTextChk != null && supplyTextChk.Count() > 0) {
                            oTempPrescItemVM.SupDisText = Resource.TechValidate.SupplyDisp_Update_Text;
                            oTempPrescItemVM.supToolTipDisText = Resource.TechValidate.Supplyinst + oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValSupplyInst.DisplayText + Environment.NewLine;
                        }
                    }
                }
                if (!oParentItem.IsSupplyRecordedViaCV) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments = !String.IsNullOrEmpty(oPrescItemView.SupplyComments) ? oPrescItemView.SupplyComments : String.Empty;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyComments = !String.IsNullOrEmpty(oPrescItemView.SupplyComments) ? oPrescItemView.SupplyComments : String.Empty;
                }
                if (oPrescItemView.NextSupplyDTTM != undefined && DateTime.NotEquals(oPrescItemView.NextSupplyDTTM, DateTime.MinValue)) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate = oPrescItemView.NextSupplyDTTM;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevNextSupplyDate = oPrescItemView.NextSupplyDTTM;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalNextSupplyDate = oPrescItemView.NextSupplyDTTM;
                }
                if (!String.IsNullOrEmpty(oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments) || (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0)) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID = 1;
                    if (oParentItem.ActionCode == ActivityTypes.Reorder) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.TecValOperationMode = "N";
                    }
                }
                if (!String.IsNullOrEmpty(oPrescItemView.OperationMode)) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.TecValOperationMode = oPrescItemView.OperationMode;
                }
                if (oTempPresTmVM != null && oTempPresTmVM.FormViewerDetails != null && oTempPresTmVM.FormViewerDetails.BasicDetails != null) {
                    oTempPrescItemVM.EditedGridID = oTempPresTmVM.EditedGridID;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID = oTempPresTmVM.FormViewerDetails.BasicDetails.EditedGridID;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments = oTempPresTmVM.FormViewerDetails.BasicDetails.Supplycomments;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyComments = oTempPresTmVM.FormViewerDetails.BasicDetails.ExistingSupplyComments;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate = oTempPresTmVM.FormViewerDetails.BasicDetails.NextSupplyDate;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.OriginalNextSupplyDate = oTempPresTmVM.FormViewerDetails.BasicDetails.OriginalNextSupplyDate;
                    if (!String.IsNullOrEmpty(oTempPresTmVM.FormViewerDetails.BasicDetails.TecValOperationMode)) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.TecValOperationMode = oTempPresTmVM.FormViewerDetails.BasicDetails.TecValOperationMode;
                    }
                    if (!String.IsNullOrEmpty(oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments)) {
                        oTempPrescItemVM.EditedGridID = 1;
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID = 1;
                    }
                    if (!oTempPresTmVM.EnableChildMCIComp) {
                        oTempPrescItemVM.EnableChildMCIComp = oTempPresTmVM.EnableChildMCIComp;
                    }
                    if (oTempPresTmVM.FormViewerDetails.BasicDetails.ParentMCIItem != null && !oTempPresTmVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem = oTempPresTmVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem;
                    }
                    if (oTempPresTmVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null) {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction = new ObservableCollection<CListItem>();
                        oTempPresTmVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach( (sSelSupInst)=> {
                            if (oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(x => x.Value == sSelSupInst.Value).Count() == 0) {
                                oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Add(ObjectHelper.CreateObject(new CListItem(), { Value: sSelSupInst.Value, DisplayText: sSelSupInst.DisplayText }));
                            }
                        });
                        let schildToolTipValue: string = String.Empty;
                        let schildToolTipText: string = String.Empty;
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(oTempPresTmVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction, (o1) => {schildToolTipText=o1},(o2) => {schildToolTipValue=o2});
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal = schildToolTipValue;
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsText = schildToolTipText;
                    }
                    else {
                        oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction = null;
                    }
                    if (oTempPresTmVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction != null) {
                        if (oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction == null)
                            oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction = new ObservableCollection<CListItem>();
                        oTempPresTmVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.forEach( (instruction)=> {
                            if (oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.Where(x => x.Value == instruction.Value).Count() == 0) {
                                oTempPrescItemVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.Add(instruction);
                            }
                        });
                    }
                    if (oTempPrescItemVM.iSSupplyrequest == null) {
                        oTempPrescItemVM.iSSupplyrequest = new ObservableCollection<CListItem>();
                    }
                    if (oTempPresTmVM.iSSupplyrequest != null) {
                        oTempPrescItemVM.iSSupplyrequest = oTempPresTmVM.iSSupplyrequest;
                    }
                    if (oTempPresTmVM.SelectedSupplyreq != null) {
                        oTempPrescItemVM.SelectedSupplyreq = ObjectHelper.CreateObject(new CListItem(), { Value: oTempPresTmVM.SelectedSupplyreq.Value, DisplayText: oTempPresTmVM.SelectedSupplyreq.DisplayText });
                    }
                }
                if (oTempPresTmVM != null && oTempPresTmVM.FormViewerDetails != null && oTempPresTmVM.FormViewerDetails.TechValidateDetails != null) {
                    oTempPrescItemVM.FormViewerDetails.TechValidateDetails = oTempPresTmVM.FormViewerDetails.TechValidateDetails;
                }
                if (oTempPresTmVM != null && oTempPresTmVM.TechValidatedItems != null) {
                    oTempPrescItemVM.TechValidatedItems = oTempPresTmVM.TechValidatedItems;
                }
                if (oParentItem.IsAmendMCISupplyClear && oTempPrescItemVM != null && oTempPrescItemVM.FormViewerDetails != null && oTempPrescItemVM.FormViewerDetails.BasicDetails != null) {
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsText = Resource.MedicationForm.lblSupplyInstructionsText_Tooltip;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal = String.Empty;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments = Resource.MedicationForm.lblSupplyInstructionsText_Tooltip;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments = String.Empty;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText = String.Empty;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction = null;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction = null;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.SupplyInstResetAmend = true;
                    oTempPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate = DateTime.MinValue;
                }
                if (this.SelectedPrescItem != null && String.Compare(this.SelectedPrescItem.IsDeactivate, "Y", StringComparison.InvariantCultureIgnoreCase) == 0) {
                    oTempPrescItemVM.IsSupplyRequestedEnable = false;
                }
                if (oPrescItemView.IsControlledDrug) 
                    oTempPrescItemVM.IsControlledDrug = Convert.ToChar(oPrescItemView.IsControlledDrug);
            }
            return oTempPrescItemVM;
        }
        private GetContextInfo(): number {
            let nTmpOID: number;
            let bnResult: boolean = true;
            if (ContextManager.Instance["PatientID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PatientID"].ToString())) {
                bnResult = Number.TryParse(ContextManager.Instance["PatientID"].ToString(),(o) => nTmpOID = o );
                PatientContext.PatientOID = nTmpOID;
                if (!bnResult)
                    return -1;
            }
            if (ContextManager.Instance["PRESCRIPTIONOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PRESCRIPTIONOID"].ToString())) {
                PatientContext.PrescriptionOID = ContextManager.Instance["PRESCRIPTIONOID"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["PrescType"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PrescType"].ToString())) {
                PatientContext.PrescriptionType = ContextManager.Instance["PrescType"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["SecurityToken"] != null && !String.IsNullOrEmpty(ContextManager.Instance["SecurityToken"].ToString())) {
                ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["OrganisationOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["OrganisationOID"].ToString())) {
                AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["UserOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["UserOID"].ToString())) {
                let objUserOid: number;
                Number.TryParse(ContextManager.Instance["UserOID"].ToString(),(o)=> objUserOid=o);
                ContextInfo.UserOID = objUserOid;
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["ReleaseVersion"] != null && !String.IsNullOrEmpty(ContextManager.Instance["ReleaseVersion"].ToString())) {
               // let objReleaseVer: Byte;
                //Byte.TryParse(, (o)=>objReleaseVer=o);
                ContextInfo.ReleaseVersion = ContextManager.Instance["ReleaseVersion"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["AMCV"] != null && !String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString())) {
                AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["EncounterOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["EncounterOID"].ToString())) {
                let objEncOid: number;
                Number.TryParse(ContextManager.Instance["EncounterOID"].ToString(),(o)=> objEncOid = o);
                PatientContext.EncounterOid = objEncOid;
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["MergedPatientOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["MergedPatientOID"].ToString())) {
                let objMergedPatientOID: number;
                Number.TryParse(ContextManager.Instance["MergedPatientOID"].ToString(), (o) => objMergedPatientOID= o);
                PatientContext.MergedPatientOID = objMergedPatientOID;
            }
            else {
                return -1;
            }
            if (ContextManager.Instance["JobRoleOID"] != null) {
                AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
            }
            if (ContextManager.Instance["ServiceOID"] != null) {
                let ServiceOID: number = 0;
                Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(),(o)=> ServiceOID=o);
                MedChartData.ServiceOID = ServiceOID;
            }
            if (ContextManager.Instance["LocationOID"] != null) {
                let LocationOID: number = 0;
                Number.TryParse(ContextManager.Instance["LocationOID"].ToString(), (o)=>LocationOID=o);
                MedChartData.LocationOID = LocationOID;
            }
            return 0;
        }
        public GetProductOptions(): void {
            Busyindicator.SetStatusIdle("Reorder");
            Busyindicator.SetStatusBusy("TechValidate_Productoptions");
            let objReqProcess: IPPManagePrescSer.CReqMsgGetRelatedOptions = new IPPManagePrescSer.CReqMsgGetRelatedOptions();
            objReqProcess.oDrugItemInputDataBC = new IPPManagePrescSer.IPPDrugItemInputData();
            if (this.IsMciChildSelected) {
                if (this.SelectedChildPresItem != null) {
                    objReqProcess.oDrugItemInputDataBC.IdentifyingOID = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.IdentifyingOID;
                    objReqProcess.oDrugItemInputDataBC.IdentifyingType = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.IdentifyingType;
                }
            }
            else {
                if (this.SelectedPrescItem != null) {
                    objReqProcess.oDrugItemInputDataBC.IdentifyingOID = this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingOID;
                    objReqProcess.oDrugItemInputDataBC.IdentifyingType = this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType;
                }
            }
            if(this.SelectedPrescItem != null && this.SelectedPrescItem.IsDynamicForm == true){
                Busyindicator.SetStatusIdle("TechValidate_Productoptions");
                this.SelectedPrescItem.IsDynamicForm = false;
            }
            let lnRouteOID: number = 0;
            let lnDosageFormOID: number = 0;
            if (this.IsMciChildSelected) {
                if (this.SelectedChildPresItem != null) {
                    if (this.SelectedChildPresItem.FormViewerDetails.BasicDetails.Route != null)
                        Number.TryParse(this.SelectedChildPresItem.FormViewerDetails.BasicDetails.Route.Value, (o)=>lnRouteOID = o);
                    if (this.SelectedChildPresItem.FormViewerDetails.BasicDetails.DosageForm != null)
                        Number.TryParse(this.SelectedChildPresItem.FormViewerDetails.BasicDetails.DosageForm.Value,(o)=>lnDosageFormOID = o);
                }
            }
            else {
                if (this.SelectedPrescItem != null) {
                    if (this.SelectedPrescItem.FormViewerDetails.BasicDetails.Route != null)
                        Number.TryParse(this.SelectedPrescItem.FormViewerDetails.BasicDetails.Route.Value, (o) => lnRouteOID = o);
                    if (this.SelectedPrescItem.FormViewerDetails.BasicDetails.DosageForm != null)
                        Number.TryParse(this.SelectedPrescItem.FormViewerDetails.BasicDetails.DosageForm.Value,(o)=> lnDosageFormOID=o);
                }
            }
            if (this.sAllProdCheckedValue == "1") {
                lnRouteOID = 0;
                lnDosageFormOID = 0;
            }
            if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null && !this.SelectedPrescItem.FormViewerDetails.BasicDetails.NonFDBRouteFlag && this.SelectedPrescItem.FormViewerDetails.BasicDetails.CDItemLevelVM) {
                objReqProcess.oDrugItemInputDataBC.RouteOID = 0;
                objReqProcess.oDrugItemInputDataBC.FormOID = 0;
            }
            else {
                objReqProcess.oDrugItemInputDataBC.RouteOID = lnRouteOID;
                objReqProcess.oDrugItemInputDataBC.FormOID = lnDosageFormOID;
            }
            objReqProcess.oDrugItemInputDataBC.IsTechValidateCA = '1';
            if (this.IsMciChildSelected) {
                if (this.SelectedChildPresItem != null) {
                    objReqProcess.oDrugItemInputDataBC.IsFormulary = this.SelectedChildPresItem.IsNonformulary == '1' ? true : false;
                }
            }
            else {
                if (this.SelectedPrescItem != null) {
                    objReqProcess.oDrugItemInputDataBC.IsFormulary = this.SelectedPrescItem.IsNonformulary == '1' ? true : false;
                }
            }
            objReqProcess.oDrugItemInputDataBC.MatchIdentifyingTypes = new IPPManagePrescSer.ArrayOfString();
            objReqProcess.oDrugItemInputDataBC.MatchIdentifyingTypes.Add("VIRTUALPRODUCT");
            objReqProcess.oDrugItemInputDataBC.MCVersionNo = AppSessionInfo.AMCV;
            if (this.SelectedChildPresItem != null && this.SelectedChildPresItem.PrescriptionItemOID > 0) {
                objReqProcess.oDrugItemInputDataBC.PrescriptionItemId = this.SelectedChildPresItem.PrescriptionItemOID.ToString();
            }
            if (this.sAllProdCheckedValue == "1") {
                lnRouteOID = 0;
                lnDosageFormOID = 0;
                objReqProcess.oDrugItemInputDataBC.RouteOIDs = String.Empty;
                objReqProcess.oDrugItemInputDataBC.RouteOID = lnRouteOID;
                objReqProcess.oDrugItemInputDataBC.FormOID = lnDosageFormOID;
            }
            else {
                if (this.IsMciChildSelected) {
                    if (this.SelectedChildPresItem != null) {
                        objReqProcess.oDrugItemInputDataBC.RouteOIDs = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.Route != null ? this.SelectedChildPresItem.FormViewerDetails.BasicDetails.Route.Value : String.Empty;
                    }
                }
                else {
                    if (this.SelectedPrescItem != null) {
                        if (this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null && !this.SelectedPrescItem.FormViewerDetails.BasicDetails.NonFDBRouteFlag && this.SelectedPrescItem.FormViewerDetails.BasicDetails.CDItemLevelVM) {
                            objReqProcess.oDrugItemInputDataBC.RouteOIDs = String.Empty;
                        }
                        else {
                            objReqProcess.oDrugItemInputDataBC.RouteOIDs = this.SelectedPrescItem.FormViewerDetails.BasicDetails.Route != null ? this.SelectedPrescItem.FormViewerDetails.BasicDetails.Route.Value : String.Empty;
                        }
                    }
                }
            }
            objReqProcess.oDrugItemInputDataBC.ServiceOID = MedChartData.ServiceOID;
            objReqProcess.oDrugItemInputDataBC.LocationOID = MedChartData.LocationOID;
            objReqProcess.oDrugItemInputDataBC.EncounterOID = PatientContext.EncounterOid;
            objReqProcess.oContextInformation = Common.FillContext();
            if (objReqProcess.oDrugItemInputDataBC.IdentifyingOID > 0 && !String.IsNullOrEmpty(objReqProcess.oDrugItemInputDataBC.IdentifyingType) && !(String.Equals(objReqProcess.oDrugItemInputDataBC.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(objReqProcess.oDrugItemInputDataBC.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) {
                let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objService.GetRelatedOptionsCompleted  = (s,e) => { this.objService_GetRelatedOptionsCompleted(s,e); } ;
                objService.GetRelatedOptionsAsync(objReqProcess);
            }
            else {
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) {
                    this.GetProductOptionsforTypeIn();
                }
                Busyindicator.SetStatusIdle("TechValidate_Productoptions");
            }
        }
        public GetProductOptionsforTypeIn(): void {
            let oDrugItemInfo: ObservableCollection<DrugItemBasicInfo> = new ObservableCollection<DrugItemBasicInfo>();
            if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                let sb: StringBuilder = new StringBuilder();
                if (this.SelectedPrescItem.FormViewerDetails.BasicDetails.DefaultDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys != null) {
                    sb.Append(this.SelectedPrescItem.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys[0].Value.ToString());
                    sb.Append("*");
                    sb.Append(this.SelectedPrescItem.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys[0].DisplayText);
                }
                oDrugItemInfo.Add(ObjectHelper.CreateObject(new DrugItemBasicInfo(), {
                    IdentifyingOID: this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingOID,
                    IdentifyingType: this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType,
                    IdentifyingName: this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingName,
                    TechQtyUomName: sb.ToString()
                }));
                this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo = oDrugItemInfo;
            }
            if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems == null) {
                this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
            }
            else {
                if (this.SelectedPrescItem != null) {
                    this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems);
                }
            }
            Busyindicator.SetStatusIdle("Reorder");
            Busyindicator.SetStatusIdle("TechValidate_Productoptions");
        }
        objService_GetRelatedOptionsCompleted(sender: Object, e: IPPManagePrescSer.GetRelatedOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000064;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Medfrmviewtechvalidate, Method:objService_GetRelatedOptionsCompleted()";
            if (e.Error == null) {
                try {
                    let objResProcess: CResMsgGetRelatedOptions = e.Result;
                    this.oDrugItemBasicInfo = null;
                    let sParentSelected: boolean = false;
                    if (objResProcess != null && objResProcess.oRelatedDrugs != null) {
                        let oDrugItemInfo: ObservableCollection<DrugItemBasicInfo> = new ObservableCollection<DrugItemBasicInfo>();
                        let lIdentifyingOid: number;
                        let sIdentifyingType: string;
                        let sIdentifyingName: string;
                        let sMciItem: string = String.Empty;
                        let cMcicount: number = 0;
                        if (this.IsMciChildSelected) {
                            lIdentifyingOid = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.IdentifyingOID;
                            sIdentifyingType = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.IdentifyingType;
                            if (!String.IsNullOrEmpty(this.SelectedChildPresItem.FormViewerDetails.BasicDetails.MCIchildIdentifyingName))
                                sIdentifyingName = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.MCIchildIdentifyingName;
                            else sIdentifyingName = this.SelectedChildPresItem.FormViewerDetails.BasicDetails.IdentifyingName;
                        }
                        else {
                            lIdentifyingOid = this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingOID;
                            sIdentifyingType = this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingType;
                            sIdentifyingName = this.SelectedPrescItem.FormViewerDetails.BasicDetails.IdentifyingName;
                            if (!String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.OriginalIdentifyingName) && !String.Equals(this.SelectedPrescItem.FormViewerDetails.BasicDetails.OriginalIdentifyingName, CConstants.SelectBrand, StringComparison.InvariantCultureIgnoreCase))
                                sIdentifyingName = this.SelectedPrescItem.FormViewerDetails.BasicDetails.OriginalIdentifyingName;
                            sMciItem = this.SelectedPrescItem.FormViewerDetails.BasicDetails.mCIItemDisplay;
                            if (!String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType) && (String.Compare(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType, "CC_MULCMPNTITM", StringComparison.InvariantCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(sMciItem)) {
                                cMcicount = sMciItem.Split('^').length - 1;
                                if (cMcicount < 5) {
                                    sIdentifyingName = sMciItem.Replace("^", "\n");
                                }
                            }
                            if (!String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType) && String.Equals(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType, "CC_MULCMPNTITM") && String.Equals(this.SelectedPrescItem.LorenzoID, "PI-001", StringComparison.CurrentCultureIgnoreCase)) {
                                sParentSelected = true;
                            }
                        }
                        if (!String.IsNullOrEmpty(sIdentifyingType) && (String.Compare(sIdentifyingType, "CATALOGUEITEM", StringComparison.CurrentCultureIgnoreCase) == 0 || sIdentifyingType.Equals(CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) && cMcicount == 0) {
                            objResProcess.oRelatedDrugs.forEach( (oInfo)=> {
                                let Wardstock: boolean = false;
                                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) && !this.SelectedPrescItem.IsFormViewerDisable) {
                                    Wardstock = oInfo.IsWardStock;
                                }
                                oInfo.PrescribableItemListOID = lIdentifyingOid;
                                oInfo.IsWardStock = Wardstock;
                            });
                            this.oDrugItemBasicInfo = objResProcess.oRelatedDrugs;
                        }
                        else {
                            objResProcess.oRelatedDrugs.forEach( (oInfo)=> {
                                oDrugItemInfo = new ObservableCollection<DrugItemBasicInfo>();
                                let sArrDrugName: string[] = null;
                                let sDrugName: string = sIdentifyingName;
                                let sTechQtyUomName: string = String.Empty;
                                if (sIdentifyingName.Contains('~')) {
                                    sArrDrugName = sIdentifyingName.Split('~');
                                    if (sArrDrugName != null && sArrDrugName.length > 1 && !String.IsNullOrEmpty(sArrDrugName[0]))
                                        sDrugName = sArrDrugName[0];
                                }
                                if (!sParentSelected) {
                                    sTechQtyUomName = oInfo.TechQtyUomName;
                                }
                                let Wardstock: boolean = false;
                                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) && !this.SelectedPrescItem.IsFormViewerDisable) {
                                    Wardstock = oInfo.IsWardStock;
                                }
                                oDrugItemInfo.Add(ObjectHelper.CreateObject(new DrugItemBasicInfo(), {
                                    IdentifyingOID: lIdentifyingOid,
                                    IdentifyingType: sIdentifyingType,
                                    IdentifyingName: sDrugName,
                                    TechQtyUomName: sTechQtyUomName,
                                    IsWardStock: Wardstock
                                }));
                                if (this.SelectedPrescItem != null) {
                                    if (this.SelectedPrescItem.IsNonformulary == '1' && objResProcess.oRelatedDrugs[0].IsFormulary == "0")
                                        this.SelectedPrescItem.TechValformularycheck = false;
                                    else if (!String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType) && String.Compare(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType, "CC_MULCMPNTITM", StringComparison.CurrentCultureIgnoreCase) == 0)
                                        this.SelectedPrescItem.TechValformularycheck = false;
                                }
                            });
                            if (!this.IsMciChildSelected && (!String.IsNullOrEmpty(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType) && String.Compare(this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType, "CC_MULCMPNTITM", StringComparison.CurrentCultureIgnoreCase) == 0) && (String.Compare(this.SelectedPrescItem.LorenzoID, "PI-001", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                this.oDrugItemBasicInfo = new ObservableCollection<DrugItemBasicInfo>();
                            }
                            else {
                                this.oDrugItemBasicInfo = oDrugItemInfo;
                            }
                        }
                    }
                    else {
                        this.oDrugItemBasicInfo = new ObservableCollection<DrugItemBasicInfo>();
                    }
                    if (this.OngrdPrescribeRowUnSelected != null && this.oDrugItemBasicInfo != null && this.oDrugItemBasicInfo.Count == 0) {
                        this.OngrdPrescribeRowUnSelected();
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (this.IsMciChildSelected) {
                if (this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails == null) {
                    this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails = ObjectHelper.CreateObject(new TechValidateVM(), { Quantity: String.Empty, TotalQuantity: String.Empty });
                    this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo = this.oDrugItemBasicInfo;
                }
                if (this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems == null && this.TechValidatedItems == null) {
                    this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
                }
                else if (this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0) {
                    this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems);
                    Busyindicator.SetStatusIdle("TechValidate_PrescItemSelected");
                    Busyindicator.SetStatusIdle("FormViewer");
                }
            }
            else if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType == CConstants.SUBTYPE) {
                if (this.TechValidatedItems == null) {
                    if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails.TechValidateDetails == null)
                        this.SelectedPrescItem.FormViewerDetails.TechValidateDetails = ObjectHelper.CreateObject(new TechValidateVM(), { Quantity: String.Empty, TotalQuantity: String.Empty });
                    if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems == null) {
                        this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
                    }
                    else {
                        if (this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.SelectedChildPresItem.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0) {
                            this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems);
                        }
                        Busyindicator.SetStatusIdle("TechValidate_PrescItemSelected");
                        Busyindicator.SetStatusIdle("FormViewer");
                    }
                }
            }
            else {
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails.TechValidateDetails == null)
                    this.SelectedPrescItem.FormViewerDetails.TechValidateDetails = ObjectHelper.CreateObject(new TechValidateVM(), { Quantity: String.Empty, TotalQuantity: String.Empty });
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems == null) {
                    this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
                }
                else {
                    if (this.SelectedPrescItem != null) {
                        this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.TechValidatedItems);
                    }
                    Busyindicator.SetStatusIdle("TechValidate_PrescItemSelected");
                    Busyindicator.SetStatusIdle("FormViewer");
                }
            }
            Busyindicator.SetStatusIdle("TechParentSelect");
            Busyindicator.SetStatusIdle("FormViewer");
            Busyindicator.SetStatusIdle("TechValidate_Productoptions");
            Busyindicator.SetStatusIdle("FormViewer");
        }
        public GetTechValidateChildItems(PresTechValidChildItems: PrescriptionItemVM, sMCIMode: string, sMode: String, orgTechValinfo: ObservableCollection<TechnicalValidationInfo>, intVal: number, mcOID: number): IPPManagePrescSer.TechnicalValidationInfo {
            let lstPrescItems: List<IPPManagePrescSer.TechnicalValidationInfo> = new List<IPPManagePrescSer.TechnicalValidationInfo>();
            let lstTechnicaldetails: List<IPPManagePrescSer.TechValidatedItem>;
            let oTechDetail: IPPManagePrescSer.TechValidatedItem;
            let oPrescChldItem: IPPManagePrescSer.TechnicalValidationInfo;
            oPrescChldItem = new IPPManagePrescSer.TechnicalValidationInfo();
            if (PresTechValidChildItems != null) {
                if (PresTechValidChildItems != null && PresTechValidChildItems.SelectedSupplyreq != null) {
                    if (String.Compare(PresTechValidChildItems.SelectedSupplyreq.Value, CConstants.Supplycode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        oPrescChldItem.IsSupplyRequested = '1';
                    }
                    else if (String.Compare(PresTechValidChildItems.SelectedSupplyreq.Value, CConstants.DonotSupplycode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        oPrescChldItem.IsSupplyRequested = '2';
                    }
                    else if (String.Equals(PresTechValidChildItems.SelectedSupplyreq.Value, CConstants.CancelSupplycode, StringComparison.InvariantCultureIgnoreCase)) {
                        oPrescChldItem.IsSupplyRequested = '3';
                    }
                    else {
                        oPrescChldItem.IsSupplyRequested = '0';
                    }
                }
                else {
                    oPrescChldItem.IsSupplyRequested = '0';
                }
                if (DateTime.NotEquals(PresTechValidChildItems.FormViewerDetails.BasicDetails.NextSupplyDate, DateTime.MinValue)) {
                    oPrescChldItem.NextSupplyDTTM = PresTechValidChildItems.FormViewerDetails.BasicDetails.NextSupplyDate;
                }
                oPrescChldItem.IsWardStock = PresTechValidChildItems.IsWardStock;
                oPrescChldItem.RequisitionCACode = "MN_MED_VALIDATE_S_P2";
                oPrescChldItem.LorenzoID = PresTechValidChildItems.LorenzoID;
                oPrescChldItem.LocationOID = MedChartData.LocationOID;
                oPrescChldItem.ServiceOID = MedChartData.ServiceOID;
                oPrescChldItem.RoleOID = Convert.ToInt64(AppContextInfo.JobRoleOID);
                if (PatientContext.MergedPatientOID != PatientContext.PatientOID)
                    oPrescChldItem.IsMergePatient = "1";
                else oPrescChldItem.IsMergePatient = "0";
                oPrescChldItem.PrescriptionItemOID = PresTechValidChildItems.PrescriptionItemOID;
                oPrescChldItem.PresMutliCompOid = PresTechValidChildItems.PresMultiCompitemOID;
                if (!String.IsNullOrEmpty(PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments)) {
                    oPrescChldItem.SupplyComments = PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments;
                }
                if (PresTechValidChildItems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && PresTechValidChildItems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                    oPrescChldItem.SupplyInstruction = new ObservableCollection<ObjectInfo>();
                    for (let i: number = 0; i < PresTechValidChildItems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count; i++) {
                        oPrescChldItem.SupplyInstruction.Add(ObjectHelper.CreateObject(new ObjectInfo(), {
                            Code: PresTechValidChildItems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction[i].Value,
                            Name: PresTechValidChildItems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction[i].DisplayText
                        }));
                    }
                }
                if (!String.IsNullOrEmpty(PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments)) {
                    if (oPrescChldItem.SupplyInstruction == null)
                        oPrescChldItem.SupplyInstruction = new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
                    oPrescChldItem.SupplyInstruction.Add(ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                        Code: CConstants.Supplycomments,
                        Name: PresTechValidChildItems.FormViewerDetails.BasicDetails.Supplycomments
                    }));
                }
                oPrescChldItem.OperationMode = PresTechValidChildItems.FormViewerDetails.BasicDetails.TecValOperationMode;
                oPrescChldItem.IsChildEdited = Convert.ToByte(PresTechValidChildItems.FormViewerDetails.BasicDetails.EditedGridID) == 1 || Convert.ToByte(PresTechValidChildItems.EditedGridID) == 1 ? Convert.ToByte(1) : Convert.ToByte(0);
                lstTechnicaldetails = new List<IPPManagePrescSer.TechValidatedItem>();
                if (PresTechValidChildItems.FormViewerDetails.TechValidateDetails != null && PresTechValidChildItems.FormViewerDetails.TechValidateDetails.TechValidatedItems != null) {
                    PresTechValidChildItems.FormViewerDetails.TechValidateDetails.TechValidatedItems.forEach( (oTechItemChild)=> {
                        oTechDetail = new IPPManagePrescSer.TechValidatedItem();
                        if (String.IsNullOrEmpty(oTechItemChild.QuantityPerDose))
                            oTechDetail.QuantityPerDose = String.Empty;
                        else oTechDetail.QuantityPerDose = oTechItemChild.QuantityPerDose;
                        if (String.IsNullOrEmpty(oTechItemChild.TotalQuantity))
                            oTechDetail.TotalQuantity = String.Empty;
                        else oTechDetail.TotalQuantity = oTechItemChild.TotalQuantity;
                        oTechDetail.QuantityPerDoseUOM = new IPPManagePrescSer.ObjectInfo();
                        oTechDetail.QuantityPerDoseUOM.OID = oTechItemChild.QuantityPerDoseUOM.OID;
                        oTechDetail.TotalQuantityUOM = new IPPManagePrescSer.ObjectInfo();
                        oTechDetail.TotalQuantityUOM.OID = oTechItemChild.TotalQuantityUOM.OID;
                        if (oTechItemChild.SupplyInstruction != null && oTechItemChild.SupplyInstruction.Count > 0) {
                            oTechDetail.SupplyInstruction = new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
                            oTechItemChild.SupplyInstruction.forEach( (objSupInfo)=> {
                                oTechDetail.SupplyInstruction.Add(ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                                    Code: objSupInfo.Code,
                                    Name: objSupInfo.Name
                                }));
                            });
                        }
                        if (!String.IsNullOrEmpty(oTechItemChild.SupComments)) {
                            if (oTechDetail.SupplyInstruction == null)
                                oTechDetail.SupplyInstruction = new ObservableCollection<IPPManagePrescSer.ObjectInfo>();
                            oTechDetail.SupplyInstruction.Add(ObjectHelper.CreateObject(new IPPManagePrescSer.ObjectInfo(), {
                                Code: CConstants.Supplycomments,
                                Name: oTechItemChild.SupComments
                            }));
                        }
                        oTechDetail.OperationMode = oTechItemChild.OperationMode;
                        if (String.Equals(oTechDetail.OperationMode, "M", StringComparison.InvariantCultureIgnoreCase) || String.Equals(oTechDetail.OperationMode, "D", StringComparison.InvariantCultureIgnoreCase))
                            oTechDetail.PrescriptionItemTechOID = oTechItemChild.PrescriptionItemTechOID;
                        if (String.Equals(sMode, "ND", StringComparison.OrdinalIgnoreCase)) {
                            oTechDetail.PrescriptionItemTechOID = PresTechValidChildItems.PresTechItemOID;
                        }
                        oTechDetail.DrugItem = new IPPManagePrescSer.DrugItemBasicData();
                        oTechDetail.DrugItem.IdentifyingName = oTechItemChild.DrugItem.IdentifyingName;
                        oTechDetail.DrugItem.IdentifyingType = oTechItemChild.DrugItem.IdentifyingType;
                        oTechDetail.DrugItem.IdentifyingOID = oTechItemChild.DrugItem.IdentifyingOID;
                        oTechDetail.DrugItem.PrescribableItemListOID = oTechItemChild.DrugItem.PrescribableItemListOID;
                        if (oTechItemChild.IsDoseCombinationsDefined == '1')
                            oTechDetail.IsDoseCombinationsDefined = '1';
                        lstTechnicaldetails.Add(oTechDetail);
                    });
                }
                if (lstTechnicaldetails.Count > 0) {
                    oPrescChldItem.Technicalvalidateupdate = true;
                    oPrescChldItem.TechValidatedItems = new ObservableCollection<IPPManagePrescSer.TechValidatedItem>(lstTechnicaldetails);
                }
            }
            return oPrescChldItem;
        }
        oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {

        }
        private _propTechValItem: ObservableCollection<CustomTechValidatedItem> = new ObservableCollection<CustomTechValidatedItem>;
        private _prevTechValItem: ObservableCollection<CustomTechValidatedItem>;
        private _propTechPresItem: ObservableCollection<PrescriptionItemVM>;
        private _propDrugBasicInfo: ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo> = new ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo>();
        private _IsQuantityPerDoseMandatory: boolean = false;
        private _IsMandatoryQuantityUOM: boolean = false;
        private _IsMandatoryQntyUOM: boolean = false;
        private _quantity: string;
        private _totalQuantity: string;
        private _quantityUOM: string = '';
        private _totalquantityUOM: string = '';
        private TechnicalvalidateupdateField: boolean = false;
        private _IsMandatoryTechValSupplyInstr: boolean = false;
        private _SelectedPrescItem: PrescriptionItemVM;
        private _SelectedChildPresItem: PrescriptionItemVM;
        private _SelectedPresOpt: IPPManagePrescSer.DrugItemBasicInfo;
        public get TechValidatedItems(): ObservableCollection<CustomTechValidatedItem> {
            return this._propTechValItem;
        }
        public set TechValidatedItems(value: ObservableCollection<CustomTechValidatedItem>) {
            if (value) {
                this._propTechValItem.CopyFrom(value);
                // this._propTechValItem = value;
               //NotifyPropertyChanged("TechValidatedItems");
            }else{
                this._propTechValItem.Clear();
            }
        }
        public get PrevTechValidatedItems(): ObservableCollection<CustomTechValidatedItem> {
            return this._prevTechValItem;
        }
        public set PrevTechValidatedItems(value: ObservableCollection<CustomTechValidatedItem>) {
            if (this._prevTechValItem != value) {
                this._prevTechValItem = value;
            }
        }
        public get PresTechValidatedItems(): ObservableCollection<PrescriptionItemVM> {
            return this._propTechPresItem;
        }
        public set PresTechValidatedItems(value: ObservableCollection<PrescriptionItemVM>) {
            if (ObjectHelper.ReferenceEquals(this._propTechPresItem, value) != true) {
                this._SelectedPrescItem = null;
                this._propTechPresItem = value;
               //NotifyPropertyChanged("PresTechValidatedItems");
            }
        }
        private _TechQntyPerDosVisible: Visibility = Visibility.Collapsed;
        public get TechQntyPerDosVisible(): Visibility {
            return this._TechQntyPerDosVisible;
        }
        public set TechQntyPerDosVisible(value: Visibility) {
            if (value != this._TechQntyPerDosVisible) {
                this._TechQntyPerDosVisible = value;
               //super.NotifyPropertyChanged("TechQntyPerDosVisible");
            }
        }
        public get oDrugItemBasicInfo(): ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo> {
            return this._propDrugBasicInfo;
        }
        public set oDrugItemBasicInfo(value: ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo>) {
            if(this._propDrugBasicInfo == null) {
                this._propDrugBasicInfo = value;
            }
            if (this._propDrugBasicInfo != value) {
                this._propDrugBasicInfo.CopyFrom(value);
                if(this.frmtechDynamicForm == false){
                    this.NotifyPropertyChanged("oDrugItemBasicInfo");
                }else{
                    if(this.TotalQuantity == null || this.TotalQuantity == ''){
                        this.NotifyPropertyChanged("oDrugItemBasicInfo");
                        this.frmtechDynamicForm = false;
                    }
                }
                // this._propDrugBasicInfo = value;
               //NotifyPropertyChanged("oDrugItemBasicInfo");
            }
        }
         NotifyPropertyChanged(prop: string) {
            let e:PropertyChangedEventArgs = { PropertyName: prop};
              if (this.PropertyChanged)
                this.PropertyChanged({},e);
        }
        public get IsQuantityPerDoseMandatory(): boolean {
            return this._IsQuantityPerDoseMandatory;
        }
        public set IsQuantityPerDoseMandatory(value: boolean) {
            if (this._IsQuantityPerDoseMandatory != value) {
                this._IsQuantityPerDoseMandatory = value;
               //NotifyPropertyChanged("IsQuantityPerDoseMandatory");
            }
        }
        public get IsMandatoryQuantityUOM(): boolean {
            return this._IsMandatoryQuantityUOM;
        }
        public set IsMandatoryQuantityUOM(value: boolean) {
            if (this._IsMandatoryQuantityUOM != value) {
                this._IsMandatoryQuantityUOM = value;
               //NotifyPropertyChanged("IsMandatoryQuantityUOM");
            }
        }
        public get IsMandatoryQntyUOM(): boolean {
            return this._IsMandatoryQntyUOM;
        }
        public set IsMandatoryQntyUOM(value: boolean) {
            if (this._IsMandatoryQntyUOM != value) {
                this._IsMandatoryQntyUOM = value;
               //NotifyPropertyChanged("IsMandatoryQntyUOM");
            }
        }
        public get IsMandatoryTechValSupplyInstr(): boolean {
            return this._IsMandatoryTechValSupplyInstr;
        }
        public set IsMandatoryTechValSupplyInstr(value: boolean) {
            if (value != this._IsMandatoryTechValSupplyInstr) {
                this._IsMandatoryTechValSupplyInstr = value;
            }
           //super.NotifyPropertyChanged("IsMandatoryTechValSupplyInstr");
        }
        public _supplyinstrtext: string;
        public get supplyinstrtext(): string {
            return this._supplyinstrtext;
        }
        public set supplyinstrtext(value: string) {
            if (value != this._supplyinstrtext) {
                this._supplyinstrtext = value;
                if (!String.IsNullOrEmpty(value) && !String.Equals(value, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(this.SupplyComments)) {
                    this.SupplyInsTextWithComments = value + Environment.NewLine + "Comments:" + this.SupplyComments;
                }
                else if (!String.IsNullOrEmpty(value) && !String.Equals(this.supplyinstrtext, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.CurrentCultureIgnoreCase)) {
                    this.SupplyInsTextWithComments = value;
                }
                else if (!String.IsNullOrEmpty(this.SupplyComments)) {
                    this.SupplyInsTextWithComments = "Comments:" + this.SupplyComments;
                }
                else {
                    this.SupplyInsTextWithComments = Resource.TechValProdOpt.SelectSupInstrution;
                }
            }
           //super.NotifyPropertyChanged("supplyinstrtext");
        }
        public _supplyinstrvalue: string;
        public get supplyinstrvalue(): string {
            return this._supplyinstrvalue;
        }
        public set supplyinstrvalue(value: string) {
            if (value != this._supplyinstrvalue) {
                this._supplyinstrvalue = value;
            }
           //super.NotifyPropertyChanged("supplyinstrvalue");
        }
        public _SupplyComments: string;
        public get SupplyComments(): string {
            return this._SupplyComments;
        }
        public set SupplyComments(value: string) {
            if (value != this._SupplyComments) {
                this._SupplyComments = value;
                if (!String.IsNullOrEmpty(this.supplyinstrtext) && !String.Equals(this.supplyinstrtext, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(value)) {
                    this.SupplyInsTextWithComments = this.supplyinstrtext + Environment.NewLine + "Comments:" + value;
                }
                else if (!String.IsNullOrEmpty(this.supplyinstrtext) && !String.Equals(this.supplyinstrtext, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.CurrentCultureIgnoreCase)) {
                    this.SupplyInsTextWithComments = this.supplyinstrtext;
                }
                else if (!String.IsNullOrEmpty(value)) {
                    this.SupplyInsTextWithComments = "Comments:" + value;
                }
                else {
                    this.SupplyInsTextWithComments = Resource.TechValProdOpt.SelectSupInstrution;
                }
            }
           //super.NotifyPropertyChanged("SupplyComments");
        }
        private _SupplyInsTextWithComments: string;
        public get SupplyInsTextWithComments(): string {
            return this._SupplyInsTextWithComments;
        }
        public set SupplyInsTextWithComments(value: string) {
            this._SupplyInsTextWithComments = value;
           //super.NotifyPropertyChanged("SupplyInsTextWithComments");
        }
        private _SupplyByDate: string;
        public get SupplyByDate(): string {
            return this._SupplyByDate;
        }
        public set SupplyByDate(value: string) {
            this._SupplyByDate = value;
           //super.NotifyPropertyChanged("SupplyByDate");
        }
        getpreviousquantity: string = String.Empty;
        public get Quantity(): string {
            return this._quantity;
        }
        public set Quantity(value: string) {
            if (!ObjectHelper.ReferenceEquals(this._quantity, value)) {
                this.getpreviousquantity = this._quantity;
                this._quantity = value;
                if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if ((!String.IsNullOrEmpty(this._quantity) && Convert.ToDouble(this._quantity) != 0) && (!String.IsNullOrEmpty(this.TotalQuantity) && Convert.ToDouble(this.TotalQuantity) == 0)) {
                        this.TotalQuantity = "";
                        this.IsMandatoryTechValSupplyInstr = false;
                    }
                    else if ((!String.IsNullOrEmpty(this._quantity) && Convert.ToDouble(this._quantity) == 0) || (!String.IsNullOrEmpty(this.TotalQuantity) && Convert.ToDouble(this.TotalQuantity) == 0)) {
                        this.TotalQuantity = "0";
                        this.IsMandatoryTechValSupplyInstr = true;
                        if (this.IsMandatoryQuantityUOM || this.TotalQuantityMand) {
                            this.IsMandatoryQuantityUOM = false;
                        }
                        if (this.IsMandatoryQntyUOM || this.QuantityMand) {
                            this.IsMandatoryQntyUOM = false;
                        }
                    }
                    else {
                        this.IsMandatoryTechValSupplyInstr = false;
                        if (this.IsMandatoryQuantityUOM || this.TotalQuantityMand) {
                            this.IsMandatoryQuantityUOM = true;
                        }
                        if (this.IsMandatoryQntyUOM || this.QuantityMand) {
                            this.IsMandatoryQntyUOM = true;
                        }
                    }
                    if (!String.IsNullOrEmpty(this.getpreviousquantity) && Convert.ToDouble(this.getpreviousquantity) == 0 && !String.IsNullOrEmpty(this._quantity) && Convert.ToDouble(this._quantity) != 0 && !String.IsNullOrEmpty(this.getprevioustotquantity) && Convert.ToDouble(this.getprevioustotquantity) == 0 && this.supplyinstrtext != Resource.TechValProdOpt.SelectSupInstrution) {
                        this.launchTechvalsupplyinstrmezzanineCheck = true;
                        let objTech: iMessageBox = new iMessageBox();
                        objTech.Title = Resource.MedicationForm.MsgBoxTitleName;
                        objTech.MessageButton = MessageBoxButton.YesNo;
                        objTech.IconType = MessageBoxType.Question;
                        objTech.MessageBoxClose  = (s,e) => { this.objmsgtech_Close(s,e); } ;
                        objTech.Message = Resource.MedicationForm.SupplyinstrModify_Message;
                        objTech.Show();
                    }
                }
               //NotifyPropertyChanged("Quantity");
            }
        }
        objmsgtech_Close(sender: Object, e: MessageEventArgs): void {
            this.launchTechvalsupplyinstrmezzanineCheck = false;
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails.IsenableSupplyInstruction) {
                    this.ShowMultiSelectListWindow(ValueDomain.SupplyInstruction, this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue, this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrtext);
                }
            }
            if (e.MessageBoxResult == MessageBoxResult.No) {
                this.launchTechvalsupplyinstrmezzanineCheck = false;
            }
        }
        public ShowMultiSelectListWindow(strValueDomain: string, SelectedConceptCodes: string, SelectedDisplayTextDetails: string): void {
            let sTitle: string = String.Empty;
            let sDialogTitle: string = String.Empty;
            if (!String.IsNullOrEmpty(strValueDomain)) {
                if (!String.IsNullOrEmpty(SelectedConceptCodes)) {
                    SelectedConceptCodes = SelectedConceptCodes.Replace(';', ',');
                }
                if (!String.IsNullOrEmpty(SelectedDisplayTextDetails)) {
                    SelectedDisplayTextDetails = SelectedDisplayTextDetails.Replace(';', ',');
                }
                if (!String.IsNullOrEmpty(strValueDomain)) {
                    if (String.Compare(strValueDomain, ValueDomain.SupplyInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        sTitle = "Supply instructions - LORENZO";
                        sDialogTitle = "Supply instructions";
                    }
                    else if (String.Compare(strValueDomain, ValueDomain.MedicationClerking, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        sTitle = "Medication clerking source - LORENZO";
                        sDialogTitle = "Medication clerking source";
                    }
                }
                if (this._SelectedPrescItem != null) {
                    if (this._SelectedPrescItem.FormViewerDetails.TechValidateDetails == null) {
                        this._SelectedPrescItem.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                        this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                    }
                    else {

                    }
                    if (this._SelectedPrescItem != null && this._SelectedPrescItem.FormViewerDetails != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                        this._SelectedPrescItem.FormViewerDetails.BasicDetails.DisplayFlag = false;
                    }
                    this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = true;
                    let oSupInst: medsupplydispensinginstructionstab = new medsupplydispensinginstructionstab();
                    oSupInst.PrescriptionItemVM = this._SelectedPrescItem;
                    this._SelectedPrescItem.canLuanchProdOpt = true;
                    AppActivity.OpenWindow(Resource.TechValidate.Supply_Title, oSupInst,(s,e) => { this.supplydispensinginstruction_Close(s);}, Resource.TechValidate.SupplyDisp_Update_Text, false, 750, 880, false, WindowButtonType.OkCancel, null);
                }
            }
        }
        supplydispensinginstruction_Close(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            if (args.Result == AppDialogResult.Cancel) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.TechValidate.Titles,
                    Message: resource.disconcan1.Cancel_Error_Message,
                    MessageButton: MessageBoxButton.YesNo,
                    IconType: MessageBoxType.Question
                });
                iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_App(s,e); } ;
                iMsgBox.Show();
            }
            //Not Required for LHS. To be Re-Visited.
            
            else if (args.Result == AppDialogResult.Ok) {
                let oContent = ObjectHelper.CreateType<medsupplydispensinginstructionstab>(args.Content.Component, medsupplydispensinginstructionstab);
                let oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM = null;
                if (oContent != null && oContent.tab1 != null && oContent.tab1.Items.Count > 0) {
                    if (String.Compare(oContent.tab1.SelectedKey, Resource.TechValidate.SupDet) == 0) {
                        oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>(oContent.tab1.SelectedContent, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                    }
                    else {
                        oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>((ObjectHelper.CreateType<iTabItem>(oContent.tab1.Items[0], iTabItem)).Content, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                    }
                    if (oSupplyDispensingInstructionsVM != null && this._SelectedPrescItem != null) {
                        oSupplyDispensingInstructionsVM.SupplyHistoryList = null;
                        if (this._SelectedPrescItem != null && this._SelectedPrescItem.FormViewerDetails != null && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails != null) {
                            this._SelectedPrescItem = this.SetSupplyDispensingInstructions(this._SelectedPrescItem, oSupplyDispensingInstructionsVM);
                            this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
                        }
                        else {
                            this._SelectedPrescItem = this.SetSupplyDispensingInstructions(this._SelectedPrescItem, oSupplyDispensingInstructionsVM);
                            this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
                        }
                        this.oChildWindow.DialogResult = true;
                    }
                }
            }
            
        }
        SetSupplyDispensingInstructions(oSelectedItem: PrescriptionItemVM, oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM): PrescriptionItemVM {
            if (oSupplyDispensingInstructionsVM != null && oSelectedItem != null) {
                let oSupplyInstrItems: ObservableCollection<CListItem> = oSupplyDispensingInstructionsVM.SupplyInstructionsList;
                let updateobject: CustomTechValidatedItem = new CustomTechValidatedItem();
                if (this.TechValidatedItems == null) {
                    this.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
                }
                if (oSupplyInstrItems != null && oSupplyInstrItems.Count > 0) {
                    oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = new ObservableCollection<CListItem>(oSupplyInstrItems.Where(c => c.IsSelected).Select(s => s).Distinct());
                    // Sai Removed for child value can't to parent--
                    // oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =  oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                    if (oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null && oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction.Count > 0) {
                        let oSupplyInstTxt: string = String.Empty;
                        let oSupplyInstVal: string = String.Empty;
                        if (this._SelectedPrescItem != null && this._SelectedPrescItem.FormViewerDetails != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                            this._SelectedPrescItem.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction, (o1) => {oSupplyInstTxt=o1},(o2) => {oSupplyInstVal=o2});
                            this.supplyinstrtext = oSupplyInstTxt;
                            this.supplyinstrvalue = oSupplyInstVal;
                            if (this._SelectedPrescItem.FormViewerDetails.TechValidateDetails != null) {
                                this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrtext = oSupplyInstTxt;
                                this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue = oSupplyInstVal;
                            }
                            else {
                                this._SelectedPrescItem.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                                this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrtext = oSupplyInstTxt;
                                this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue = oSupplyInstVal;
                            }
                        }
                    }
                    else {
                        this.supplyinstrtext = Resource.TechValProdOpt.SelectSupInstrution;
                        this.supplyinstrvalue = String.Empty;
                    }
                }
                else {
                    this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue = String.Empty;
                }
                if (oSupplyDispensingInstructionsVM.Supplycomments != null) {
                    this.SupplyComments = String.Empty;
                    this.SupplyComments = oSupplyDispensingInstructionsVM.Supplycomments;
                    if (this._SelectedPrescItem != null && this._SelectedPrescItem.FormViewerDetails != null && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails != null) {
                        this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments = oSupplyDispensingInstructionsVM.Supplycomments;
                         // Sai Removed for child value can't to parent--
                        //oSelectedItem.FormViewerDetails.BasicDetails.Supplycomments = oSupplyDispensingInstructionsVM.Supplycomments;
                    }
                    else {
                        this._SelectedPrescItem.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                        this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments = oSupplyDispensingInstructionsVM.Supplycomments;
                    }
                }
                else {
                    this.SupplyComments = String.Empty;
                }
            }
            return oSelectedItem;
        }
        iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
            this.launchTechvalsupplyinstrmezzanineCheck = false;
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                let selectedsupply: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                if (this._SelectedPrescItem != null && this._SelectedPrescItem.FormViewerDetails != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails != null && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails != null) {
                    if (this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == false && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem != null) {
                        if (!String.IsNullOrEmpty(this.SupplyInsTextWithComments) && !String.Equals(this.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.InvariantCultureIgnoreCase)) {
                            if (this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions  && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction.Count > 0) {
                                selectedsupply = this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                            }
                            else if (this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction.Count > 0) {
                                selectedsupply = this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction;
                            }
                        }
                        let oSupplyInstTxt: string = String.Empty;
                        let oSupplyInstVal: string = String.Empty;
                        this._SelectedPrescItem.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(selectedsupply, (o1) => {oSupplyInstTxt=o1},(o2) => {oSupplyInstVal=o2});
                        this.supplyinstrtext = oSupplyInstTxt;
                        this.supplyinstrvalue = oSupplyInstVal;
                        if (!String.IsNullOrEmpty(this.SupplyInsTextWithComments) && !String.Equals(this.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.InvariantCultureIgnoreCase)) {
                            if (!String.IsNullOrEmpty(this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments)) {
                                this.SupplyComments = this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments;
                            }
                            else {
                                this.SupplyComments = this._SelectedPrescItem.FormViewerDetails.BasicDetails.CustomTechValidatedItem.SupComments;
                            }
                        }
                    }
                    if (this._SelectedPrescItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0 && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == true) {
                        selectedsupply = new ObservableCollection<CListItem>();
                        if (!String.IsNullOrEmpty(this.SupplyInsTextWithComments) && !String.Equals(this.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.InvariantCultureIgnoreCase)) {
                            if (this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions  && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null && this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction.Count > 0) {
                                selectedsupply = this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                            }
                            else if (this._SelectedPrescItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this._SelectedPrescItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                                selectedsupply = this._SelectedPrescItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                            }
                        }
                        let oSupplyInstTxt: string = String.Empty;
                        let oSupplyInstVal: string = String.Empty;
                        this._SelectedPrescItem.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(selectedsupply, (o1) => {oSupplyInstTxt=o1},(o2) => {oSupplyInstVal=o2});
                        this.supplyinstrtext = oSupplyInstTxt;
                        this.supplyinstrvalue = oSupplyInstVal;
                        if (!String.IsNullOrEmpty(this.SupplyInsTextWithComments) && !String.Equals(this.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.InvariantCultureIgnoreCase)) {
                            if (!String.IsNullOrEmpty(this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments)) {
                                this.SupplyComments = this._SelectedPrescItem.FormViewerDetails.TechValidateDetails.SupplyComments;
                            }
                            else {
                                this.SupplyComments = this._SelectedPrescItem.FormViewerDetails.BasicDetails.Supplycomments;
                            }
                        }
                    }
                }
                this.oChildWindow.DialogResult = true;
            }
            Busyindicator.SetStatusIdle("AddSupplyInstructionClicked");
        }
        public SetTechDetails(oNewItem: CustomTechValidatedItem, Action: string): void {
            if (this != null) {
                let uomValue: string = "";
                if (!String.IsNullOrEmpty(this.Quantity)) {
                    oNewItem.DoseComQuantityPerDoseUom = oNewItem.QuantityPerDose = this.Quantity;
                }
                else oNewItem.DoseComQuantityPerDoseUom = oNewItem.QuantityPerDose;
                if (oNewItem.QuantityPerDoseUOM == null)
                    oNewItem.QuantityPerDoseUOM = new ManagePrescSer.ObjectInfo();
                if (this.QuantityUOMList != null && !String.IsNullOrEmpty(this.QuantityUOM) && this.QuantityUOMList.Where(x => String.Equals(x.DisplayText, this.QuantityUOM, StringComparison.CurrentCultureIgnoreCase)).Count() > 0) {
                    uomValue = this.QuantityUOMList.Where(x => x.DisplayText == this.QuantityUOM).Select(x => x.Value).FirstOrDefault();
                    if (!String.IsNullOrEmpty(uomValue)) {
                        oNewItem.QuantityPerDoseUOM.OID = Convert.ToInt64(uomValue);
                    }
                }
                if (!String.IsNullOrEmpty(this.QuantityUOM)) {
                    oNewItem.QuantityPerDoseUOM.Name = this.QuantityUOM;
                }
                if (oNewItem.QuantityPerDoseUOM != null && !String.IsNullOrEmpty(oNewItem.QuantityPerDoseUOM.Name)) {
                    oNewItem.DoseComQuantityPerDoseUom = oNewItem.DoseComQuantityPerDoseUom + " " + oNewItem.QuantityPerDoseUOM.Name;
                }
                if (!String.IsNullOrEmpty(this.TotalQuantity)) {
                    oNewItem.DoseComTotalPerQuantityUom = oNewItem.TotalQuantity = this.TotalQuantity;
                }
                else oNewItem.DoseComTotalPerQuantityUom = oNewItem.TotalQuantity;
                if (oNewItem.TotalQuantityUOM == null)
                    oNewItem.TotalQuantityUOM = new ManagePrescSer.ObjectInfo();
                uomValue = null;
                if (this.TotalQuantityUOMList != null && !String.IsNullOrEmpty(this.TotalQuantityUOM) && this.QuantityUOMList.Where(x => x.DisplayText == this.TotalQuantityUOM).Count() > 0) {
                    uomValue = this.TotalQuantityUOMList.Where(x => x.DisplayText == this.TotalQuantityUOM).Select(x => x.Value).FirstOrDefault();
                    if (!String.IsNullOrEmpty(uomValue)) {
                        oNewItem.TotalQuantityUOM.OID = Convert.ToInt64(uomValue);
                    }
                }
                if (!String.IsNullOrEmpty(this.TotalQuantityUOM)) {
                    oNewItem.TotalQuantityUOM.Name = this.TotalQuantityUOM;
                }
                if (oNewItem.TotalQuantityUOM != null && !String.IsNullOrEmpty(oNewItem.TotalQuantityUOM.Name)) {
                    oNewItem.DoseComTotalPerQuantityUom = oNewItem.DoseComTotalPerQuantityUom + " " + oNewItem.TotalQuantityUOM.Name;
                }
                if (!String.Equals(Action,"LOAD", StringComparison.InvariantCultureIgnoreCase)) {
                    if (!String.IsNullOrEmpty(this.supplyinstrtext) && String.Compare(this.supplyinstrtext, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.OrdinalIgnoreCase) != 0) {
                        oNewItem.SupplyInstructionText = this.supplyinstrtext;
                    }
                    else {
                        oNewItem.SupplyInstructionText = String.Empty;
                    }
                    if (!String.IsNullOrEmpty(this.SupplyInsTextWithComments) && String.Compare(this.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution, StringComparison.OrdinalIgnoreCase) != 0) {
                        oNewItem.ProdSupplyInsWithComments = this.SupplyInsTextWithComments;
                        oNewItem.SupComments = this.SupplyComments;
                    }
                    else {
                        oNewItem.ProdSupplyInsWithComments = String.Empty;
                        oNewItem.SupComments = String.Empty;
                    }
                    oNewItem.SupplyInstruction = new ObservableCollection<ManagePrescSer.ObjectInfo>();
                    oNewItem.selectedSupplyInstruction = new ObservableCollection<CListItem>();
                    if (!String.IsNullOrEmpty(this.supplyinstrvalue)) {
                        let SupInstCode: string = this.supplyinstrvalue;
                        let SupInstText: string = this.supplyinstrtext;
                        if (this.supplyinstrvalue.IndexOf('~') > 0) {
                            SupInstCode = this.supplyinstrvalue.Split("~~", StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
                        }
                        let arrSupInstCode: string[] = SupInstCode.Split(';');
                        let arrSupInstText: string[] = SupInstText.Split(';');
                        if (arrSupInstCode instanceof Array && arrSupInstCode.length > 0) {
                            for (let i: number = 0; i < arrSupInstCode.length; i++) {
                                oNewItem.SupplyInstruction.Add(ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), { Code: arrSupInstCode[i], Name: arrSupInstText[i] }));
                                oNewItem.selectedSupplyInstruction.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: arrSupInstText[i], Value: arrSupInstCode[i] }));
                            }
                        }
                    }
                }
            }
        }
        private oChildWindow: ChildWindow;
        MultiSelectList_Closes(args: AppDialogEventargs): void {
            this.launchTechvalsupplyinstrmezzanineCheck = false;
            this.oChildWindow = args.AppChildWindow;
            //Not Required for LHS. To be Re-Visited.
            /*
            if (args.Result == AppDialogResult.Ok && args.Content != null) {
                let oMultiSelect: MultiSelectListWindow = ObjectHelper.CreateType<MultiSelectListWindow>(args.Content, MultiSelectListWindow);
                let bdialogresult: boolean = oMultiSelect.OKButton_Click();
                if (bdialogresult) {
                    this.SetSelectedValues(ObjectHelper.CreateType<List>(oMultiSelect.DataContext, List), oMultiSelect.ValueDomainCode);
                    oMultiSelect.appDialog.DialogResult = bdialogresult;
                }
                this.launchTechvalsupplyinstrmezzanineCheck = false;
            }
            else if (args.Result == AppDialogResult.Cancel && args.Content != null) {
                this.launchTechvalsupplyinstrmezzanineCheck = false;
                let oMultiSelect: MultiSelectListWindow = ObjectHelper.CreateType<MultiSelectListWindow>(args.Content, MultiSelectListWindow);
                oMultiSelect.CancelButton_Click();
            }
            else {
                this.oChildWindow.DialogResult = false;
            }
            */
        }
        private SetSelectedValues(oSelectedValues: List, sValueDomainCode: string): void {
            let strBuildText: StringBuilder = new StringBuilder();
            let strBuildValue: StringBuilder = new StringBuilder();
            if (oSelectedValues != null && oSelectedValues.Count > 0) {
                let nLen: number = oSelectedValues.Count;
                for (let i: number = 0; i < nLen; i++) {
                    let oListItems: CListItem = ObjectHelper.CreateType<CListItem>(oSelectedValues[i], CListItem);
                    if (String.Compare(oListItems.Value, "CC_OTHER", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        strBuildText.Append(oListItems.Tag);
                    }
                    else {
                        strBuildText.Append(oListItems.DisplayText);
                    }
                    strBuildValue.Append(oListItems.Value);
                    if (i < nLen - 1) {
                        strBuildText.Append(";");
                        strBuildValue.Append(";");
                    }
                }
            }
            if (String.Compare(sValueDomainCode, ValueDomain.SupplyInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (!String.IsNullOrEmpty(strBuildText.ToString())) {
                    this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrtext = strBuildText.ToString();
                }
                else {
                    this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrtext = "Select supply instructions to enter value(s)";
                }
                if (!String.IsNullOrEmpty(strBuildValue.ToString())) {
                    this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue = strBuildValue.ToString();
                }
                else {
                    this.SelectedPrescItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue = String.Empty;
                }
            }
        }
        getprevioustotquantity: string = String.Empty;
        public get TotalQuantity(): string {
            return this._totalQuantity;
        }
        public set TotalQuantity(value: string) {
            if (!ObjectHelper.ReferenceEquals(this._totalQuantity, value)) {
                this.getprevioustotquantity = this._totalQuantity;
                this._totalQuantity = value;
                if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if ((!String.IsNullOrEmpty(this._totalQuantity) && Convert.ToDouble(this._totalQuantity) != 0) && (!String.IsNullOrEmpty(this.Quantity) && Convert.ToDouble(this.Quantity) == 0)) {
                        this.Quantity = "";
                        this.IsMandatoryTechValSupplyInstr = false;
                    }
                    else if ((!String.IsNullOrEmpty(this._totalQuantity) && Convert.ToDouble(this._totalQuantity) == 0) || (!String.IsNullOrEmpty(this.Quantity) && Convert.ToDouble(this.Quantity) == 0)) {
                        this.Quantity = "0";
                        this.IsMandatoryTechValSupplyInstr = true;
                        if (this.IsMandatoryQuantityUOM || this.TotalQuantityMand) {
                            this.IsMandatoryQuantityUOM = false;
                        }
                        if (this.IsMandatoryQntyUOM || this.QuantityMand) {
                            this.IsMandatoryQntyUOM = false;
                        }
                    }
                    else {
                        this.IsMandatoryTechValSupplyInstr = false;
                        if (this.IsMandatoryQuantityUOM || this.TotalQuantityMand) {
                            this.IsMandatoryQuantityUOM = true;
                        }
                        if (this.IsMandatoryQntyUOM || this.QuantityMand) {
                            this.IsMandatoryQntyUOM = true;
                        }
                    }
                    if (!String.IsNullOrEmpty(this.getpreviousquantity) && Convert.ToDouble(this.getpreviousquantity) == 0 && !String.IsNullOrEmpty(this._totalQuantity) && Convert.ToDouble(this._totalQuantity) != 0 && !String.IsNullOrEmpty(this.getprevioustotquantity) && Convert.ToDouble(this.getprevioustotquantity) == 0 && this.supplyinstrtext != Resource.TechValProdOpt.SelectSupInstrution) {
                        this.launchTechvalsupplyinstrmezzanineCheck = true;
                        let objTech: iMessageBox = new iMessageBox();
                        objTech.Title = Resource.MedicationForm.MsgBoxTitleName;
                        objTech.MessageButton = MessageBoxButton.YesNo;
                        objTech.IconType = MessageBoxType.Question;
                        objTech.MessageBoxClose  = (s,e) => { this.objmsgtech_Close(s,e); } ;
                        objTech.Message = Resource.MedicationForm.SupplyinstrModify_Message;
                        objTech.Show();
                    }
                }
               //NotifyPropertyChanged("TotalQuantity");
            }
        }
        public get QuantityUOM(): string {
            return this._quantityUOM;
        }
        public set QuantityUOM(value: string) {
            if (!ObjectHelper.ReferenceEquals(this._quantityUOM, value)) {
                this._quantityUOM = value;
               //NotifyPropertyChanged("QuantityUOM");
            }
        }
        public get TotalQuantityUOM(): string {
            return this._totalquantityUOM;
        }
        public set TotalQuantityUOM(value: string) {
            if (!ObjectHelper.ReferenceEquals(this._totalquantityUOM, value)) {
                this._totalquantityUOM = value;
               //NotifyPropertyChanged("TotalQuantityUOM");
            }
        }
        private _QuantityUOMLst: ObservableCollection<CListItem>;
        public get QuantityUOMList(): ObservableCollection<CListItem> {
            return this._QuantityUOMLst;
        }
        public set QuantityUOMList(value: ObservableCollection<CListItem>) {
            if (this._QuantityUOMLst != value) {
                this._QuantityUOMLst = value;
            }
        }
        private _TotalQuantityUOMList: ObservableCollection<CListItem>;
        public get TotalQuantityUOMList(): ObservableCollection<CListItem> {
            return this._TotalQuantityUOMList;
        }
        public set TotalQuantityUOMList(value: ObservableCollection<CListItem>) {
            if (this._TotalQuantityUOMList != value) {
                this._TotalQuantityUOMList = value;
            }
        }
        public get Technicalvalidateupdate(): boolean {
            return this.TechnicalvalidateupdateField;
        }
        public set Technicalvalidateupdate(value: boolean) {
            if ((this.TechnicalvalidateupdateField.Equals(value) != true)) {
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
                    if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                        if (this.SelectedPrescItem.TechValSplitter == Visibility.Visible)
                            this.GetProductOptions();
                        else this.oDrugItemBasicInfo = null;
                    }
                    else {
                        if (this.SelectedPrescItem.TechValSplitter == Visibility.Visible) {
                            this.GetProductOptions();
                        }
                    }
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
            if (ObjectHelper.ReferenceEquals(this._SelectedChildPresItem, value) != true) {
                this._SelectedChildPresItem = value;
                if (this.OnSelectedPrescItemChanged != null) {
                    this.OnSelectedPrescItemChanged(this.SelectedChildPresItem);
                }
               //NotifyPropertyChanged("SelectedChildPresItem");
            }
        }
        public get SelectedChildPresItem(): PrescriptionItemVM {
            return this._SelectedChildPresItem;
        }
        public set SelectedPresOpt(value: DrugItemBasicInfo) {
            if (ObjectHelper.ReferenceEquals(this._SelectedPresOpt, value) != true) {
                this._SelectedPresOpt = value;
               //NotifyPropertyChanged("SelectedPresOpt");
            }
        }
        public get SelectedPresOpt(): DrugItemBasicInfo {
            return this._SelectedPresOpt;
        }
        private _bIsAllProdCheckedRelated: boolean = false;
        private sAllProdCheckedValue: string;
        public get IsAllProdCheckedRelated(): boolean {
            return this._bIsAllProdCheckedRelated;
        }
        public set IsAllProdCheckedRelated(value: boolean) {
            this._bIsAllProdCheckedRelated = value;
            if (value) {
                this.sAllProdCheckedValue = "1";
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                    if (this.SelectedPrescItem.TechValSplitter == Visibility.Visible)
                        this.GetProductOptions();
                    else this.oDrugItemBasicInfo = null;
                }
                else this.GetProductOptions();
            }
            else {
                this.sAllProdCheckedValue = "0";
                if (this.SelectedPrescItem != null && this.SelectedPrescItem.FormViewerDetails != null && this.SelectedPrescItem.FormViewerDetails.BasicDetails != null) {
                    if (this.SelectedPrescItem.TechValSplitter == Visibility.Visible)
                        this.GetProductOptions();
                    else this.oDrugItemBasicInfo = null;
                }
                else this.GetProductOptions();
            }
        }
        private quantitys: ObservableCollection<CListItem>;
        public get Quantitys(): ObservableCollection<CListItem> {
            return this.quantitys;
        }
        public set Quantitys(value: ObservableCollection<CListItem>) {
            this.quantitys = value;
           //super.NotifyPropertyChanged("Quantitys");
        }
        private _ProductSelectedsupplyInstruction: ObservableCollection<CListItem>;
        public get ProductSelectedsupplyInstruction(): ObservableCollection<CListItem> {
            return this._ProductSelectedsupplyInstruction;
        }
        public set ProductSelectedsupplyInstruction(value: ObservableCollection<CListItem>) {
            this._ProductSelectedsupplyInstruction = value;
           //NotifyPropertyChanged("SelectedsupplyInstruction");
        }
        private DisposeVMEvents(): void {
            this.OnSelectedPrescItemChanged = null;
            this.OnDeactivatedPrescItemsFound = null;
            this.OnSelectedChldPrescItemChanged = null;
            this.OnLoadMCIQuantityFound = null;
        }
        public DoCleanUP(): void {
            this.DisposeVMEvents();
        }
    }