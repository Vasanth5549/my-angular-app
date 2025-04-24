
import DateTime from 'epma-platform/DateTime';
import { ObjectHelper } from 'epma-platform/helper';
import { AppContextInfo, CListItem, CValuesetTerm, List, ObservableCollection, RTEEventargs, StringComparison, StringSplitOptions, Visibility } from 'epma-platform/models';
import { CommonBB, ContextManager, Convert, iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, ProcessRTE, SLQueryCollection, StringBuilder } from 'epma-platform/services';
import 'epma-platform/stringextension';
// import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/arrayextension';
import 'epma-platform/booleanextension';
import { Dictionary } from 'epma-platform/dictionary';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { DispenseStatusListConceptCodeData, MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import {
    CReqMsgGetSupplyDispenseDetail, CReqMsgGetSupplyHistoryDetails, CResMsgGetSupplyDispenseDetail, CResMsgGetSupplyHistoryDetails, CResMsgSubmitSupplyItems, Dispensinginstructionhistory, DrugItemBasicData, GetSupplyDispenseDetailCompletedEventArgs, GetSupplyHistoryDetailsCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient, MedDispensingDetail, ObjectInfo, SubmitSupplyItemsCompletedEventArgs,
    SupplyHistoryDetails, TechnicalValidationInfo, TechValidatedItem, WardStockPresItemDetails
} from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Environment } from '../../product/shared/models/Common';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Resource } from '../resource';
import { Common } from '../utilities/common';
import { CConstants, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { ProfileData } from '../utilities/profiledata';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { TechValidateVM } from './TechValidateVM';

export class SupplyDispensingInstructionsVM extends ViewModelBase {
    private _sDrugName: string = String.Empty;
    private _Medlinecontent: Object = null;
    private _SupplyInstructionsList: ObservableCollection<CListItem>;
    private _SelectedSupplyInstruction: ObservableCollection<CListItem>;
    private _sOtherInstructions: string = String.Empty;
    private _bOtherInstructions: boolean = false;
    private _spSupplyVisibility: Visibility = Visibility.Collapsed;
    private _spWardStockVisibility: Visibility = Visibility.Collapsed;
    private _spPrepStatusVisibility: Visibility = Visibility.Collapsed;
    private _SupplyCommentsVisibility: Visibility = Visibility.Collapsed;
    //public delegate void MedLineItemRefreshDelegate();
    public MedLineItemRefresfEvent: Function;
    private _ProductVisibility: Visibility = Visibility.Collapsed;
    public sPrescriptionOID: string;
    private _SelectedSupInstruction: string = String.Empty;
    refreshIntervalId: any;
    rteLoaded: boolean = false;
    public get SelectedSupInstruction(): string {
        return this._SelectedSupInstruction;
    }
    public set SelectedSupInstruction(value: string) {
        this._SelectedSupInstruction = value;
    }
    private _GivenSupplycomments: string = String.Empty;
    public get GivenSupplycomments(): string {
        return this._GivenSupplycomments;
    }
    public set GivenSupplycomments(value: string) {
        this._GivenSupplycomments = value;
    }
    private _DisableProductVisibility: Visibility = Visibility.Visible;
    private _DisableStockhistorygrid: Visibility = Visibility.Visible;
    private _MedlineVisibility: Visibility = Visibility.Collapsed;
    private _DrugVisibility: Visibility = Visibility.Collapsed;
    private _DisableNextSupplyDTTM: Visibility = Visibility.Collapsed;
    private _IdentifyingType: string = String.Empty;
    public get IdentifyingType(): string {
        return this._IdentifyingType;
    }
    public set IdentifyingType(value: string) {
        this._IdentifyingType = value;
    }
    private _isNextSupply: boolean = false;
    public get IsNextSupply(): boolean {
        return this._isNextSupply;
    }
    public set IsNextSupply(value: boolean) {
        this._isNextSupply = value;
        //NotifyPropertyChanged("IsNextSupply");
    }
    private _bAvoidNextSupplyFirsttime: boolean = true;
    public get bAvoidNextSupplyFirsttime(): boolean {
        return this._bAvoidNextSupplyFirsttime;
    }
    public set bAvoidNextSupplyFirsttime(value: boolean) {
        if (this._bAvoidNextSupplyFirsttime != value) {
            this._bAvoidNextSupplyFirsttime = value;
            //NotifyPropertyChanged("bAvoidNextSupplyFirsttime");
        }
    }
    private _SelectedPrepStatus: CListItem;
    private _Supplycomments: string = String.Empty;
    public sPrescriptionOIDs: string = String.Empty;
    public sIdentifyingOIDs: string = String.Empty;
    public sIdentifyingTypes: string = String.Empty;
    public _dNextSupplyDTTM: DateTime = DateTime.MinValue;
    public _RangeEndNextSup: DateTime = DateTime.MaxValue.Date;
    public _RangeStartNextSup: DateTime = DateTime.MinValue.Date;
    sCancelMedReqDispText: string = String.Empty;
    sCancelMedReqConceptCode: string = String.Empty;
    bCalledFromEPR: boolean = false;
    bSuppInstrInvokedFromPresChart: boolean = false;
    bSuppInstrInvokedFromTVCA: boolean = false;
    lPrescriptionItemOID: number = 0;
    lPresMultiCompitemOID: number = 0;
    lFluidPrescribableItemListOID: number = 0;
    bSuppInstrInvokedFromEPRPresChart: boolean = false;
    //public delegate void DlgtOnSubmitCompleted(bool IsTechValSubmitted, string sPrescriptionOIDs);
    public OnSubmitCompleted: Function;
    private IsTechValSuppDisp: boolean = false;
    public get NextSupDTTM(): DateTime {
        return this._dNextSupplyDTTM;
    }
    public set NextSupDTTM(value: DateTime) {
        if (this._dNextSupplyDTTM != value) {
            this._dNextSupplyDTTM = value;
            //NotifyPropertyChanged("NextSupDTTM");
        }
    }
    public get RangeStartNextSup(): DateTime {
        return this._RangeStartNextSup;
    }
    public set RangeStartNextSup(value: DateTime) {
        if (this._RangeStartNextSup != value) {
            this._RangeStartNextSup = value;
        }
    }
    public get RangeEndNextSup(): DateTime {
        return this._RangeEndNextSup;
    }
    public set RangeEndNextSup(value: DateTime) {
        if (this._RangeEndNextSup != value) {
            this._RangeEndNextSup = value;
        }
    }
    private _iSupplyrequest: ObservableCollection<CListItem>;
    public get iSupplyrequest(): ObservableCollection<CListItem> {
        return this._iSupplyrequest;
    }
    public set iSupplyrequest(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._iSupplyrequest, value)) {
            this._iSupplyrequest = value;
            //NotifyPropertyChanged("iSupplyrequest");
        }
    }
    private _SelectedSupplyrequest: CListItem;
    public get SelectedSupplyrequest(): CListItem {
        return this._SelectedSupplyrequest;
    }
    public set SelectedSupplyrequest(value: CListItem) {
        if (this._SelectedSupplyrequest != value) {
            this._SelectedSupplyrequest = value;
            //NotifyPropertyChanged("SelectedSupplyrequest");
            if (this._SelectedSupplyrequest != null && this._SelectedSupplyrequest.DisplayText != null)
                this.SupplyreqDisplay = this._SelectedSupplyrequest.DisplayText;
        }
    }
    private _SupplyreqDisplay: string;
    public get SupplyreqDisplay(): string {
        return this._SupplyreqDisplay;
    }
    public set SupplyreqDisplay(value: string) {
        this._SupplyreqDisplay = value;
        //NotifyPropertyChanged("SupplyreqDisplay");
    }
    public ProductName: string;
    public get ProductVisibility(): Visibility {
        return this._ProductVisibility;
    }
    public set ProductVisibility(value: Visibility) {
        this._ProductVisibility = value;
        //NotifyPropertyChanged("ProductVisibility");
    }
    public get DisableProductVisibility(): Visibility {
        return this._DisableProductVisibility;
    }
    public set DisableProductVisibility(value: Visibility) {
        this._DisableProductVisibility = value;
        //NotifyPropertyChanged("DisableProductVisibility");
    }
    public get DisableNextSupplyDTTM(): Visibility {
        return this._DisableNextSupplyDTTM;
    }
    public set DisableNextSupplyDTTM(value: Visibility) {
        this._DisableNextSupplyDTTM = value;
        //NotifyPropertyChanged("DisableNextSupplyDTTM");
    }
    public get MedlineVisibility(): Visibility {
        return this._MedlineVisibility;
    }
    public set MedlineVisibility(value: Visibility) {
        this._MedlineVisibility = value;
        //NotifyPropertyChanged("MedlineVisibility");
    }
    public get DrugVisibility(): Visibility {
        return this._DrugVisibility;
    }
    public set DrugVisibility(value: Visibility) {
        this._DrugVisibility = value;
        //NotifyPropertyChanged("DrugVisibility");
    }
    public get DisableStockhistorygrid(): Visibility {
        return this._DisableStockhistorygrid;
    }
    public set DisableStockhistorygrid(value: Visibility) {
        this._DisableStockhistorygrid = value;
        //NotifyPropertyChanged("DisableStockhistorygrid");
    }
    public get sDrugName(): string {
        return this._sDrugName;
    }
    public set sDrugName(value: string) {
        this._sDrugName = value;
        //NotifyPropertyChanged("sDrugName");
    }
    public get MedlineContent(): Object {
        return this._Medlinecontent;
    }
    public set MedlineContent(value: Object) {
        this._Medlinecontent = value;
        //NotifyPropertyChanged("MedlineContent");
    }
    public oPresMedline: PrescriptionItemVM;
    public previouscomment: string;
    public get Supplycomments(): string {
        return this._Supplycomments;
    }
    public set Supplycomments(value: string) {
        this._Supplycomments = value;
        //NotifyPropertyChanged("Supplycomments");
    }
    public get SupplyInstructionsList(): ObservableCollection<CListItem> {
        return this._SupplyInstructionsList;
    }
    public set SupplyInstructionsList(value: ObservableCollection<CListItem>) {
        this._SupplyInstructionsList = value;
        //NotifyPropertyChanged("SupplyInstructionsList");
    }
    public get SelectedSupplyInstruction(): ObservableCollection<CListItem> {
        return this._SelectedSupplyInstruction;
    }
    public set SelectedSupplyInstruction(value: ObservableCollection<CListItem>) {
        this._SelectedSupplyInstruction = value;
        //NotifyPropertyChanged("SelectedSupplyInstruction");
    }
    public get SelectedPrepStatus(): CListItem {
        return this._SelectedPrepStatus;
    }
    public set SelectedPrepStatus(value: CListItem) {
        this._SelectedPrepStatus = value;
        //NotifyPropertyChanged("SelectedPrepStatus");
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
    public get spSupplyVisibility(): Visibility {
        return this._spSupplyVisibility;
    }
    public set spSupplyVisibility(value: Visibility) {
        this._spSupplyVisibility = value;
        //NotifyPropertyChanged("spSupplyVisibility");
    }
    public get spWardStockVisibility(): Visibility {
        return this._spWardStockVisibility;
    }
    public set spWardStockVisibility(value: Visibility) {
        this._spWardStockVisibility = value;
        //NotifyPropertyChanged("spWardStockVisibility");
    }
    public get SupplyCommentsVisibility(): Visibility {
        return this._SupplyCommentsVisibility;
    }
    public set SupplyCommentsVisibility(value: Visibility) {
        this._SupplyCommentsVisibility = value;
        //NotifyPropertyChanged("SupplyCommentsVisibility");
    }
    private _WardStockPresItemDetailsList: ObservableCollection<WardStockPresItemDetails>;
    public get WardStockPresItemDetailsList(): ObservableCollection<WardStockPresItemDetails> {
        return this._WardStockPresItemDetailsList;
    }
    public set WardStockPresItemDetailsList(value: ObservableCollection<WardStockPresItemDetails>) {
        this._WardStockPresItemDetailsList = value;
        //NotifyPropertyChanged("WardStockPresItemDetailsList");
    }
    private _NextSupplyDTTM: DateTime;
    public get NextSupplyDTTM(): DateTime {
        return this._NextSupplyDTTM;
    }
    public set NextSupplyDTTM(value: DateTime) {
        if (ObjectHelper.ReferenceEquals(this._NextSupplyDTTM, value) != true) {
            this._NextSupplyDTTM = value;
            //NotifyPropertyChanged("NextSupplyDTTM");
        }
    }
    private _IsenableNextSupplyDTTM: boolean = false;
    public get IsenableNextSupplyDTTM(): boolean {
        return this._IsenableNextSupplyDTTM;
    }
    public set IsenableNextSupplyDTTM(value: boolean) {
        if (value != this._IsenableNextSupplyDTTM) {
            this._IsenableNextSupplyDTTM = value;
        }
    }
    private _SupplyHistoryList: ObservableCollection<SupplyHistoryDetails> = new ObservableCollection<SupplyHistoryDetails>();
    public get SupplyHistoryList(): ObservableCollection<SupplyHistoryDetails> {
        return this._SupplyHistoryList;
    }
    public set SupplyHistoryList(value: ObservableCollection<SupplyHistoryDetails>) {
        this._SupplyHistoryList.CopyFrom(value);
        // this._SupplyHistoryList = value;
        //NotifyPropertyChanged("SupplyHistoryList");
    }
    public submitsupplyinstructions(): void {
        let lstPrescItems: List<IPPManagePrescSer.TechnicalValidationInfo> = new List<IPPManagePrescSer.TechnicalValidationInfo>();
        this.sPrescriptionOIDs = PatientContext.PrescriptionOID;
        this.sIdentifyingOIDs = PatientContext.IdentifyingOids;
        this.sIdentifyingTypes = PatientContext.IdentifyingTypes;
        if (!String.IsNullOrEmpty(this.sPrescriptionOIDs)) {
            let items: List<string> = this.sPrescriptionOIDs.Split(',').ToList();
            let Identifyingoid: List<string> = this.sIdentifyingOIDs != null ? this.sIdentifyingOIDs.Split(',').ToList() : null;
            let Identifyingtype: List<string> = this.sIdentifyingTypes != null ? this.sIdentifyingTypes.Split(',').ToList() : null;
            if (items.Count > 0) {
                let itemsCount: number = items.Count;
                for (let i: number = 0; i < itemsCount; i++) {
                    let presoid: string = items[i];
                    // items.forEach( (presoid)=> {
                    if (String.Equals(presoid, "undefined")) {
                        continue;
                    }
                    let oPrescItem: IPPManagePrescSer.TechnicalValidationInfo = new IPPManagePrescSer.TechnicalValidationInfo();
                    oPrescItem.IncludeFluid = true;
                    oPrescItem.TechValidatedItems = new ObservableCollection<TechValidatedItem>();
                    oPrescItem.EncounterOID = Convert.ToInt64(PatientContext.EncounterOid);
                    if (this.SelectedSupplyrequest != null) {
                        if (String.Equals(this.SelectedSupplyrequest.Value, Resource.TechValidate.CCSup, StringComparison.InvariantCultureIgnoreCase))
                            oPrescItem.IsSupplyRequested = '1';
                        else if (String.Equals(this.SelectedSupplyrequest.Value, Resource.TechValidate.CCDontSup, StringComparison.InvariantCultureIgnoreCase))
                            oPrescItem.IsSupplyRequested = '2';
                        else if (String.Equals(this.SelectedSupplyrequest.Value, Resource.TechValidate.CCCancelSup, StringComparison.InvariantCultureIgnoreCase))
                            oPrescItem.IsSupplyRequested = '3';
                        else oPrescItem.IsSupplyRequested = '0';
                    }
                    oPrescItem.NextSupplyDTTM = this.NextSupDTTM;
                    oPrescItem.RequisitionCACode = Resource.TechValidate.ReqCACode;
                    oPrescItem.IsSuppInstrInvokedFromEPR = (this.bCalledFromEPR || this.bSuppInstrInvokedFromPresChart) ? true : false;
                    oPrescItem.LocationOID = MedChartData.LocationOID;
                    oPrescItem.ServiceOID = MedChartData.ServiceOID;
                    oPrescItem.RoleOID = Convert.ToInt64(AppContextInfo.JobRoleOID);
                    if (PatientContext.MergedPatientOID != PatientContext.PatientOID)
                        oPrescItem.IsMergePatient = "1";
                    else oPrescItem.IsMergePatient = "0";
                    let oTechDetail: IPPManagePrescSer.TechValidatedItem = new IPPManagePrescSer.TechValidatedItem();
                    let oSupplyInstrItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>(this.SupplyInstructionsList.Where(c => c.IsSelected).Select(s => s).Distinct());
                    if (oSupplyInstrItems != null && oSupplyInstrItems.Count > 0) {
                        oTechDetail.SupplyInstruction = new ObservableCollection<ObjectInfo>();
                        let nCount: number = oSupplyInstrItems.Count;
                        for (let i: number = 0; i < nCount; i++) {
                            oTechDetail.SupplyInstruction.Add(ObjectHelper.CreateObject(new ObjectInfo(), {
                                Code: oSupplyInstrItems[i].Value,
                                Name: oSupplyInstrItems[i].DisplayText
                            }));
                        }
                    }
                    oTechDetail.DrugItem = new DrugItemBasicData();
                    oTechDetail.DrugItem.PrescribableItemListOID = Convert.ToInt64(presoid);
                    oTechDetail.OperationMode = "M";
                    oTechDetail.DrugItem.OperationMode = "M";
                    oTechDetail.DrugItem.MCVersionNo = AppSessionInfo.AMCV;
                    let indexsupply: number = items.IndexOf(presoid);
                    if (indexsupply != -1) {
                        oTechDetail.DrugItem.IdentifyingOID = Identifyingoid != null && Identifyingoid[indexsupply] != null ? Convert.ToInt64(Identifyingoid[indexsupply]) : 0;
                        oTechDetail.DrugItem.IdentifyingType = Identifyingtype != null && Identifyingtype[indexsupply] != null ? Identifyingtype[indexsupply] : null;
                    }
                    oTechDetail.IsDoseCombinationsDefined = '0';
                    oTechDetail.QuantityPerDose = String.Empty;
                    oTechDetail.TotalQuantity = String.Empty;
                    oTechDetail.QuantityPerDoseUOM = new ObjectInfo();
                    oTechDetail.QuantityPerDoseUOM.OID = 0;
                    oTechDetail.TotalQuantityUOM = new ObjectInfo();
                    oTechDetail.TotalQuantityUOM.OID = 0;
                    if (!String.IsNullOrEmpty(this.Supplycomments)) {
                        if (oTechDetail.SupplyInstruction == null)
                            oTechDetail.SupplyInstruction = new ObservableCollection<ObjectInfo>();
                        oTechDetail.SupplyInstruction.Add(ObjectHelper.CreateObject(new ObjectInfo(), {
                            Code: CConstants.Supplycomments,
                            Name: this.Supplycomments
                        }));
                        oTechDetail.OtherDispensingInstruction = this.Supplycomments;
                    }
                    oPrescItem.TechValidatedItems.Add(oTechDetail);
                    oPrescItem.PrescriptionItemOID = Convert.ToInt64(presoid);
                    lstPrescItems.Add(oPrescItem);
                    // });
                }
            }
        }
        let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        let objReqTechFill: IPPManagePrescSer.CReqMsgSubmitSupplyItems = new IPPManagePrescSer.CReqMsgSubmitSupplyItems();
        objReqTechFill.oContextInformation = Common.FillContext();
        objReqTechFill.oTechnicalValidationInfoBC = new ObservableCollection<TechnicalValidationInfo>(lstPrescItems);
        objReqTechFill.oDispensinginstructionhistoryBC = new Dispensinginstructionhistory();
        objServiceProxy.SubmitSupplyItemsCompleted = (s, e) => { this.objServiceProxy_SubmitSupplyItemsCompleted(s, e); }
        if (objReqTechFill.oTechnicalValidationInfoBC != null) {
            objReqTechFill.oDispensinginstructionhistoryBC.CACode = objReqTechFill.oTechnicalValidationInfoBC.Where(x => !String.IsNullOrEmpty(x.RequisitionCACode)).Select(x => x.RequisitionCACode).FirstOrDefault();
            if (PatientContext.EncounterOid > 0) {
                objReqTechFill.oDispensinginstructionhistoryBC.EncounterOid = PatientContext.EncounterOid;
            }
        }
        objReqTechFill.oDispensinginstructionhistoryBC.EncounterType = PatientContext.EncounterType;
        objReqTechFill.oDispensinginstructionhistoryBC.PresType = PatientContext.PrescriptionType;
        if (this.objMsgResponse != null) {
            objReqTechFill.oDispensinginstructionhistoryBC.IgnoreIfRequestExists = this.objMsgResponse == MessageBoxResult.No;
        }
        objServiceProxy.SubmitSupplyItemsAsync(objReqTechFill);

    }
    private objServiceProxy_SubmitSupplyItemsCompleted(sender: Object, e: SubmitSupplyItemsCompletedEventArgs): void {
        let _ErrorID: number = 80000001;
        let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:TechValidateVM, Method:SubmitDrugsCompleted()";
        if (e.Error == null) {
            let oRes: CResMsgSubmitSupplyItems = e.Result;
            if (oRes != null && oRes.oContextInformation != null && oRes.oContextInformation.Errors != null && oRes.oContextInformation.Errors.Count > 0 && oRes.oContextInformation.Errors[0] != null) {
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
                oMsgBox.Title = Resource.TechValidate.ErrLor;
                oMsgBox.MessageButton = MessageBoxButton.OK;
                // oMsgBox.MessageButton = LORENZO.BlueBird.Controls.MessageBoxButton.OK;
                oMsgBox.IconType = MessageBoxType.Critical;
                if (oRes.oContextInformation.Errors[0].ErrorID == 900025) {
                    oMsgBox.Message = Resource.MedicationErrors._900025_Msg;
                }
                else {
                    oMsgBox.Message = oRes.oContextInformation.Errors[0].Message;
                }
                oMsgBox.Show();
            }
            else {
                if (this.OnSubmitCompleted != null) {
                    if (!String.IsNullOrEmpty(this.sPrescriptionOIDs))
                        this.OnSubmitCompleted(true, this.sPrescriptionOIDs);
                }
            }
        }
    }
    oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {

    }
    oPrescriptionItemVM: PrescriptionItemVM = null;
    constructor(supplyinstructions?: PrescriptionItemVM | string);
    constructor(supplyinstructions?: PrescriptionItemVM | string, supcomments?: string, sLorenzoID?: string, IdentifyingType?: string, IsMCIComp?: boolean, IsCallForFluid?: boolean, SuppInstrInvokedFromPresChart?: boolean);
    constructor(supplyinstructions?: PrescriptionItemVM | string, supcomments?: string, sLorenzoID?: string, IdentifyingType?: string, IsMCIComp?: boolean, IsCallForFluid?: boolean, SuppInstrInvokedFromPresChart?: boolean) {
        super();
        let oItemVM: PrescriptionItemVM = null;
        if (supplyinstructions && supplyinstructions instanceof PrescriptionItemVM) {
            oItemVM = supplyinstructions;
        }

        let sDomainCodes: string = String.Empty;
        switch (arguments.length) {
            case 7:
                this.SelectedSupInstruction = <string>supplyinstructions;
                this.bSuppInstrInvokedFromPresChart = SuppInstrInvokedFromPresChart;
                this.bSuppInstrInvokedFromEPRPresChart = true;
                if (supcomments.Contains(";~@")) {
                    supcomments = supcomments.Replace(";~@", "\r");
                }
                this.GivenSupplycomments = supcomments;
                this.IdentifyingType = IdentifyingType;
                this.SupplyCommentsVisibility = Visibility.Visible;
                this.spSupplyVisibility = Visibility.Visible;
                this.spWardStockVisibility = Visibility.Visible;
                this.DisableProductVisibility = Visibility.Visible;
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient))) {
                    this.DisableNextSupplyDTTM = Visibility.Visible;
                }
                if ((PatientContext.PrescriptionOID.Split(',').Length == 1) && !String.IsNullOrEmpty(IdentifyingType)) {
                    this.DisableStockhistorygrid = Visibility.Visible;
                }
                else {
                    this.DisableStockhistorygrid = Visibility.Collapsed;
                }
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, ValueDomain.Supplystatus, (s, e) => { this.OnRTEResult_SupplyStatus(s); });

                sDomainCodes = ValueDomain.SupplyInstruction + "," + ValueDomain.DispensingInstruction + ",MedCLMSDispenseStat";
                if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID) && !String.IsNullOrEmpty(IdentifyingType)) {
                    let P: string[] = PatientContext.PrescriptionOID.Split(',');
                    if (P.length == 1) {
                        if ((sLorenzoID == null || sLorenzoID == "") && (String.Compare(IdentifyingType, CConstants.NONCATALOGUEITEM) == 0 || String.Compare(IdentifyingType, CConstants.Precatalog) == 0)) {
                            sLorenzoID = "PI-000";
                        }
                        this.GetSupplyHistory(sLorenzoID, IsMCIComp, IsCallForFluid);
                    }
                }
                else if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
                    this.GetSupplyDispenseDetail();
                }
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, sDomainCodes, (s, e) => { this.OnRTEResult(s); });
                if (String.IsNullOrEmpty(PatientContext.EncounterType) && ContextManager.Instance["EncounterType"] != null) {
                    PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
                }
                break;
            case 1:
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, ValueDomain.Supplystatus, (s, e) => { this.OnRTEResult_SupplyStatus(s); });
                if (oItemVM != null) {
                    this.oPrescriptionItemVM = oItemVM;
                    if (this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                        this.bSuppInstrInvokedFromTVCA = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.LaunchedFromTechValidate;
                        this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Supplycomments;
                        // Sai Added for parent and Child difference--
                        if (this.oPrescriptionItemVM.FormViewerDetails?.TechValidateDetails?.IslaunchedFromProductOptions) {
                            this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SupplyComments;
                        }
                        this.previouscomment = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Supplycomments;
                        if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails == null || (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions)) {
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.PrevSupplyComments = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Supplycomments;
                            this.NextSupDTTM = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.NextSupplyDate;
                        }
                        this.SupplyCommentsVisibility = Visibility.Visible;
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName.Contains('~')) {
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName.Substring(0, this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName.IndexOf('~'));
                        }
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
                            this.MedlineVisibility = Visibility.Visible;
                            this.DrugVisibility = Visibility.Collapsed;
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = false;
                        }
                        else {
                            this.MedlineVisibility = Visibility.Collapsed;
                            this.DrugVisibility = Visibility.Visible;
                            this.sDrugName = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                        }
                    }
                    this.IsTechValSuppDisp = this.oPrescriptionItemVM.IsTechValidate;
                    if ((PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient) && !String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode)) {
                        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                            this.sDrugName = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                            this.spSupplyVisibility = Visibility.Visible;
                            this.spWardStockVisibility = Visibility.Visible;
                        }
                    }
                    this.oPresMedline = oItemVM;
                    this.ProductName = String.Empty;
                    if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null) {
                        if (this.oPrescriptionItemVM.drugProductDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == true) {
                            if (!String.IsNullOrEmpty(this.oPrescriptionItemVM.drugProductDetails.IdentifyingName) && this.oPrescriptionItemVM.drugProductDetails.IdentifyingName != "") {
                                this.ProductName = this.oPrescriptionItemVM.drugProductDetails.IdentifyingName;
                            }
                            if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SupplyComments != null) {
                                this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SupplyComments;
                            }
                            else {
                                this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Supplycomments;
                            }
                        }
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem.IdentifyingName) && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == false) {
                            this.ProductName = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem.IdentifyingName;
                            if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SupplyComments != null) {
                                this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SupplyComments;
                            }
                            else {
                                this.Supplycomments = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.SupComments;
                            }
                        }
                    }
                    else {
                        this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                        this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                    }
                    if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false) {
                        this.ProductVisibility = Visibility.Visible;
                        this.DisableProductVisibility = Visibility.Collapsed;
                        this.DisableNextSupplyDTTM = Visibility.Collapsed;
                    }
                    else {
                        this.DisableProductVisibility = Visibility.Visible;
                        if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient))) {
                            this.DisableNextSupplyDTTM = Visibility.Visible;
                        }
                    }
                    if ((oItemVM.LorenzoID == null || oItemVM.LorenzoID == "") && (String.Compare(oItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM) == 0 || String.Compare(oItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog) == 0)) {
                        oItemVM.LorenzoID = "PI-000";
                    }
                    if (oItemVM.LorenzoID != null && Convert.ToString(oItemVM.LorenzoID) != "") {
                        let IsGetSupplyHistoryRequired: boolean = true;
                        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && ((!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) || (this.oPrescriptionItemVM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemSubType) && String.Compare(this.oPrescriptionItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0 && String.Compare(this.oPrescriptionItemVM.LorenzoID, "PI-001", StringComparison.OrdinalIgnoreCase) == 0)) && this.oPrescriptionItemVM.PrescriptionItemOID == 0) {
                            IsGetSupplyHistoryRequired = false;
                        }
                        if (IsGetSupplyHistoryRequired) {
                            this.GetSupplyHistory(oItemVM.LorenzoID, oItemVM.IsMCIComponent, oItemVM.IsCallForFluid);
                        }
                    }
                }
                else {
                    this.DisableProductVisibility = Visibility.Visible;
                    this.DisableStockhistorygrid = Visibility.Collapsed;
                    if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient))) {
                        this.DisableNextSupplyDTTM = Visibility.Visible;
                    }
                    if (this.oPrescriptionItemVM != null)
                        this.IsTechValSuppDisp = this.oPrescriptionItemVM.IsTechValidate;
                    if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode))
                        this.SupplyCommentsVisibility = Visibility.Visible;
                }

                sDomainCodes = ValueDomain.SupplyInstruction + "," + ValueDomain.DispensingInstruction + ",MedCLMSDispenseStat";
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, sDomainCodes, (s, e) => { this.OnRTEResult(s); });
                if (String.IsNullOrEmpty(PatientContext.EncounterType) && ContextManager.Instance["EncounterType"] != null) {
                    PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
                }
                break;
        }
    }

    //public delegate void ShowValidation();
    public OnValidationError: Function;
    OnRTEResult_SupplyStatus(args: RTEEventargs): void {
        let sDomainCodes: string = String.Empty;
        sDomainCodes = ValueDomain.Supplystatus;
        let bSelected: boolean = false;
        let sSelectedSupplyInstruction: string = String.Empty;
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, sDomainCodes) == 0) {
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach((objDomainDetail) => {
                    switch (objDomainDetail.Key.ToUpper()) {
                        case ValueDomain.Supplystatus:
                            {
                                this.iSupplyrequest = new ObservableCollection<CListItem>();
                                let objList: List<CListItem> = new List<CListItem>();
                                objList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: "<Select>",
                                    Value: "CC_Empty"
                                }));
                                objList.AddRange(<List<CListItem>>objDomainDetail.Value);
                                objList.forEach((oCListItem) => {
                                    if (!String.Equals(oCListItem.Value, CConstants.CancelSupplycode, StringComparison.InvariantCultureIgnoreCase)) {
                                        this.iSupplyrequest.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: oCListItem.DisplayText,
                                            Value: oCListItem.Value,
                                            IsSelected: bSelected
                                        }));
                                    }
                                    else if (String.Equals(oCListItem.Value, CConstants.CancelSupplycode, StringComparison.InvariantCultureIgnoreCase)) {
                                        this.sCancelMedReqDispText = oCListItem.DisplayText;
                                        this.sCancelMedReqConceptCode = oCListItem.Value;
                                    }
                                });
                                break;
                            }
                    }
                });
            }
        }
        //bala
        sDomainCodes = ValueDomain.SupplyInstruction + "," + ValueDomain.DispensingInstruction + ",MedCLMSDispenseStat";
        this.rteLoaded = false;
        ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, sDomainCodes, (s, e) => {
            this.OnRTEResult(s);
            this.rteLoaded = true;
        });
        if (String.IsNullOrEmpty(PatientContext.EncounterType) && ContextManager.Instance["EncounterType"] != null) {
            PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        let sDomainCodes: string = String.Empty;
        sDomainCodes = ValueDomain.SupplyInstruction + "," + ValueDomain.DispensingInstruction + ",MedCLMSDispenseStat";
        let bSelected: boolean = false;
        let sSelectedSupplyInstruction: string = String.Empty;
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, sDomainCodes) == 0) {
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach((objDomainDetail) => {
                    switch (objDomainDetail.Key.ToUpper()) {
                        case ValueDomain.SupplyInstruction:
                            this.SupplyInstructionsList = new ObservableCollection<CListItem>();
                            bSelected = false;
                            (<List<CListItem>>objDomainDetail.Value).forEach((oCListItem) => {
                                this.SupplyInstructionsList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: oCListItem.DisplayText,
                                    Value: oCListItem.Value,
                                    ConceptProperties: oCListItem.ConceptProperties,
                                    IsSelected: bSelected
                                }));
                            });
                            break;
                    }
                    switch (objDomainDetail.Key) {
                        case "MedCLMSDispenseStat":
                            {
                                if (DispenseStatusListConceptCodeData.ConceptCodes == null) {
                                    DispenseStatusListConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        DispenseStatusListConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                }
                                break;
                            }
                    }
                });
                let oTempSelectedsupplyInst: ObservableCollection<CListItem> = null;
                let oTempCLinicalVerifySupplyInst: ObservableCollection<CListItem> = null;
                if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode) && this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.IsClinicallyVerify) {
                    oTempCLinicalVerifySupplyInst = new ObservableCollection<CListItem>();
                    if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.OperationMode == null && !this.oPrescriptionItemVM.bIsSupplyDispensingInstructionSet) {
                        if (!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel)) {
                            sSelectedSupplyInstruction = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel;
                            if (!String.IsNullOrEmpty(sSelectedSupplyInstruction)) {
                                let sSplitedSupplyInsVal: string[] = sSelectedSupplyInstruction.Split("~~", StringSplitOptions.None);
                                if (sSplitedSupplyInsVal != null) {
                                    if (sSplitedSupplyInsVal.length > 1) {
                                        this.Supplycomments = sSplitedSupplyInsVal[1] != null ? sSplitedSupplyInsVal[1] : String.Empty;
                                    }
                                    let objSuplyInst: string[] = sSplitedSupplyInsVal[0] != null ? sSplitedSupplyInsVal[0].Split(';') : null;
                                    if (objSuplyInst != null && objSuplyInst.Count() > 0) {
                                        objSuplyInst.forEach(SupplyInstr => {
                                            if (oTempCLinicalVerifySupplyInst != null && oTempCLinicalVerifySupplyInst.Where(x => String.Equals(x.Value, SupplyInstr)).Count() == 0) {
                                                oTempCLinicalVerifySupplyInst.Add(ObjectHelper.CreateObject(new CListItem(), { Value: SupplyInstr }));
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                            if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                                oTempCLinicalVerifySupplyInst = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                            }
                            sSelectedSupplyInstruction = !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal) ? this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal : String.Empty;
                            if (!String.IsNullOrEmpty(sSelectedSupplyInstruction)) {
                                let sSplitedSupplyInsVal: string[] = sSelectedSupplyInstruction.Split(';');
                                if (sSplitedSupplyInsVal != null) {
                                    sSplitedSupplyInsVal.forEach(SupplyInstr => {
                                        if (oTempCLinicalVerifySupplyInst != null && oTempCLinicalVerifySupplyInst.Where(x => String.Equals(x.Value, SupplyInstr)).Count() == 0) {
                                            oTempCLinicalVerifySupplyInst.Add(ObjectHelper.CreateObject(new CListItem(), { Value: SupplyInstr }));
                                        }
                                    });
                                }
                            }
                        }
                        sSelectedSupplyInstruction = !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText) ? this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText : String.Empty;
                        if (!String.IsNullOrEmpty(sSelectedSupplyInstruction)) {
                            let sSplitedSupplyInsVal: string[] = sSelectedSupplyInstruction.Split("~~", StringSplitOptions.None);
                            if (sSplitedSupplyInsVal != null) {
                                if (sSplitedSupplyInsVal.length > 1) {
                                    this.Supplycomments = sSplitedSupplyInsVal[1] != null ? sSplitedSupplyInsVal[1] : String.Empty;
                                }
                                let objSuplyInst: string[] = sSplitedSupplyInsVal[0] != null ? sSplitedSupplyInsVal[0].Split(';') : null;
                                if (objSuplyInst != null && objSuplyInst.Count() > 0) {
                                    objSuplyInst.forEach(SupplyInstr => {
                                        if (oTempCLinicalVerifySupplyInst != null && oTempCLinicalVerifySupplyInst.Where(x => String.Equals(x.Value, SupplyInstr)).Count() == 0) {
                                            oTempCLinicalVerifySupplyInst.Add(ObjectHelper.CreateObject(new CListItem(), { Value: SupplyInstr }));
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.OperationMode == "UA" && !this.oPrescriptionItemVM.bIsSupplyDispensingInstructionSet) {
                                if (!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel)) {
                                    sSelectedSupplyInstruction = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel;
                                    if (!String.IsNullOrEmpty(sSelectedSupplyInstruction)) {
                                        let sSplitedSupplyInsVal: string[] = sSelectedSupplyInstruction.Split("~~", StringSplitOptions.None);
                                        if (sSplitedSupplyInsVal != null) {
                                            if (sSplitedSupplyInsVal.length > 1) {
                                                this.Supplycomments = sSplitedSupplyInsVal[1] != null ? sSplitedSupplyInsVal[1] : String.Empty;
                                            }
                                            let objSuplyInst: string[] = sSplitedSupplyInsVal[0] != null ? sSplitedSupplyInsVal[0].Split(';') : null;
                                            if (objSuplyInst != null && objSuplyInst.Count() > 0) {
                                                objSuplyInst.forEach(SupplyInstr => {
                                                    if (oTempCLinicalVerifySupplyInst != null && oTempCLinicalVerifySupplyInst.Where(x => String.Equals(x.Value, SupplyInstr)).Count() == 0) {
                                                        oTempCLinicalVerifySupplyInst.Add(ObjectHelper.CreateObject(new CListItem(), { Value: SupplyInstr }));
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.SupplyInstructionsList != null && oTempCLinicalVerifySupplyInst != null && this.SupplyInstructionsList.Count > 0 && oTempCLinicalVerifySupplyInst.Count > 0 && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == true) {
                        this.SupplyInstructionsList.ForEach(Reinsert => {
                            if (Reinsert.Value != null) {
                                let Tocheck = oTempCLinicalVerifySupplyInst.Where(c => c.Value != null && String.Equals(c.Value, Reinsert.Value)).Select(s => s).FirstOrDefault();
                                if (Tocheck != null) {
                                    Reinsert.IsSelected = true;
                                    Tocheck = null;
                                }
                            }
                        });
                    }
                }
                else {
                    if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                        if (this.IsTechValSuppDisp && ((this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) || (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null)) && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == true) {
                            if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null) {
                                oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                                oTempSelectedsupplyInst = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                            }
                            else if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                                oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                                oTempSelectedsupplyInst = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                                if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails == null || (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions)) {
                                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                                }
                            }
                        }
                        else {
                            if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction.Count > 0) {
                                oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                                oTempSelectedsupplyInst = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                            }
                            else {
                                oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                                sSelectedSupplyInstruction = this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.FollowUpStatLaunch.Equals('S') && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal) && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction == null && !this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IsNoInstructionsSelected && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0 ? this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal : String.Empty;
                                if (!String.IsNullOrEmpty(sSelectedSupplyInstruction)) {
                                    let splittedSupplyInsVal: string[] = sSelectedSupplyInstruction.Split(';');
                                    splittedSupplyInsVal.forEach(Supplyins => {
                                        oTempSelectedsupplyInst.Add(ObjectHelper.CreateObject(new CListItem(), { Value: Supplyins }));
                                    });
                                }
                                if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails == null || (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions)) {
                                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.PrevSelectedsupplyInstruction = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                                }
                            }
                        }
                    }
                    if (this.SupplyInstructionsList != null && oTempSelectedsupplyInst != null && this.SupplyInstructionsList.Count > 0 && oTempSelectedsupplyInst.Count > 0) {
                        this.SupplyInstructionsList.ForEach(Reinsert => {
                            if (Reinsert.Value != null) {
                                let Tocheck = oTempSelectedsupplyInst.Where(c => c.Value != null && String.Equals(c.Value, Reinsert.Value)).Select(s => s).FirstOrDefault();
                                if (Tocheck != null) {
                                    Reinsert.IsSelected = true;
                                    Tocheck = null;
                                }
                            }
                        });
                    }
                }
                if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem != null) {
                    if ((this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions) &&
                        this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction !== null) {
                        oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                        oTempSelectedsupplyInst = this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction;
                    }
                    else {
                        oTempSelectedsupplyInst = new ObservableCollection<CListItem>();
                        oTempSelectedsupplyInst = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction;
                    }
                    if (this.SupplyInstructionsList != null && oTempSelectedsupplyInst != null && this.SupplyInstructionsList.Count > 0 && oTempSelectedsupplyInst.Count > 0) {
                        this.SupplyInstructionsList.ForEach(Reinsert => {
                            if (Reinsert.Value != null) {
                                let Tocheck = oTempSelectedsupplyInst.Where(c => c.Value != null && String.Equals(c.Value, Reinsert.Value)).Select(s => s).FirstOrDefault();
                                if (Tocheck != null) {
                                    Reinsert.IsSelected = true;
                                    Tocheck = null;
                                }
                            }
                        });
                    }
                }
                if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.SelectedSupplyreq != null && this.iSupplyrequest != null) {
                    let objselectedval: CListItem = this.iSupplyrequest.Where(x => String.Equals(x.Value, this.oPrescriptionItemVM.SelectedSupplyreq.Value)).FirstOrDefault();
                    this.SelectedSupplyrequest = objselectedval;
                }
                else if (this.iSupplyrequest != null) {
                    let objselectedval: CListItem = this.iSupplyrequest.Where(x => String.Equals(x.Value, "CC_Empty")).FirstOrDefault();
                    this.SelectedSupplyrequest = objselectedval;
                }
                if (!String.IsNullOrEmpty(this.SelectedSupInstruction) && this.SelectedSupInstruction.length > 0) {
                    let SupInsList: string[] = this.SelectedSupInstruction.Split(';');
                    if (SupInsList != null && SupInsList.length > 0) {
                        let nCount: number = SupInsList.length;
                        for (let i: number = 0; i < nCount; i++) {
                            this.SupplyInstructionsList.ForEach(Reinsert => {
                                if (Reinsert.Value != null) {
                                    if (String.Equals(SupInsList[i], Reinsert.Value, StringComparison.InvariantCultureIgnoreCase)) {
                                        Reinsert.IsSelected = true;
                                    }
                                }
                            });
                        }
                    }
                }
                if (!String.IsNullOrEmpty(this.GivenSupplycomments)) {
                    this.Supplycomments = this.GivenSupplycomments;
                }
            }
            Busyindicator.SetStatusIdle("SupplyDispensingInstructions");
        }
    }
    public GetSupplyHistory(sLorenzoID: string, IsMCIComp: boolean, IsCallForFluid: boolean): void {
        let oReq: CReqMsgGetSupplyHistoryDetails = new CReqMsgGetSupplyHistoryDetails();
        oReq.sLorenzoIDBC = sLorenzoID;
        oReq.oContextInformation = Common.FillContext();
        oReq.lnPatientoidBC = PatientContext.PatientOID;
        oReq.lnEncounteroidBC = PatientContext.EncounterOid;
        oReq.IsMCICompBC = IsMCIComp;
        oReq.IsCallForFluidBC = IsCallForFluid;
        oReq.IsCallFromCABC = true;
        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) || (this.oPrescriptionItemVM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemSubType) && String.Compare(this.oPrescriptionItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0 && String.Compare(this.oPrescriptionItemVM.LorenzoID, "PI-001", StringComparison.OrdinalIgnoreCase) == 0)) {
            oReq.PrescriptionItemOIDBC = this.oPrescriptionItemVM.PrescriptionItemOID;
        }
        else {
            let menuCode: string = SLQueryCollection.GetQueryStringValue("MenuCode");
            if (PatientContext.PrescriptionOID != null && !String.IsNullOrEmpty(menuCode) && menuCode.Equals("MN_SUPINSTR_P2", StringComparison.OrdinalIgnoreCase)) {
                let PresItemOIDs: string[] = PatientContext.PrescriptionOID.Split(',');
                if (PresItemOIDs.length == 1) {
                    oReq.PrescriptionItemOIDBC = Convert.ToInt64(PresItemOIDs[0]);
                }
            }
        }
        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.PrescriptionItemOID != 0) {
            oReq.PrescriptionItemOIDForMedDispDtlBC = this.oPrescriptionItemVM.PrescriptionItemOID;
        }
        else if (oReq.PrescriptionItemOIDBC != 0) {
            oReq.PrescriptionItemOIDForMedDispDtlBC = oReq.PrescriptionItemOIDBC;
        }
        if (this.oPrescriptionItemVM != null) {
            if (IsMCIComp) {
                this.lPresMultiCompitemOID = this.oPrescriptionItemVM.PresMultiCompitemOID;
            }
            else if (IsCallForFluid) {
                this.lFluidPrescribableItemListOID = this.oPrescriptionItemVM.FluidPrescribableItemListOID;
            }
            this.lPrescriptionItemOID = this.oPrescriptionItemVM.PrescriptionItemOID;
        }
        let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objServiceProxy.GetSupplyHistoryDetailsCompleted = (s, e) => {
            if (this.rteLoaded) {
                this.objServiceProxy_GetSupplyHistoryDetailsCompleted(s, e);
            }
            else {
                this.refreshIntervalId = setInterval(() => {
                    if (this.rteLoaded) {
                        clearInterval(this.refreshIntervalId);
                        this.objServiceProxy_GetSupplyHistoryDetailsCompleted(s, e);
                    }
                }, 100);
            };
        }
        objServiceProxy.GetSupplyHistoryDetailsAsync(oReq);
    }
    lstDispensePendingItems: List<string> = new List<string>();
    public objServiceProxy_GetSupplyHistoryDetailsCompleted(sender: Object, e: GetSupplyHistoryDetailsCompletedEventArgs): void {
        if (e.Error == null || e.Result != null) {
            let oRes: CResMsgGetSupplyHistoryDetails = e.Result;
            if (oRes != null && oRes.oMedDispensingDetail != null && oRes.oMedDispensingDetail.Length > 0) {
                let ProductOptionsCnt: number = 0;
                let IsRecdExists: boolean = false;
                if (ContextManager.Instance["SUPPLYINSTRUCTIONFROMEPR"] != null && ContextManager.Instance["SUPPLYINSTRUCTIONFROMEPR"].ToString() == "TRUE") {
                    this.bCalledFromEPR = true;
                    ContextManager.Instance["SUPPLYINSTRUCTIONFROMEPR"] = "FALSE";
                }
                else {
                    this.bCalledFromEPR = false;
                }
                if (!String.IsNullOrEmpty(this.sCancelMedReqDispText) && !String.IsNullOrEmpty(this.sCancelMedReqConceptCode)) {
                    if (this.bCalledFromEPR || this.bSuppInstrInvokedFromPresChart) {
                        ProductOptionsCnt = oRes.oMedDispensingDetail.Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                        IsRecdExists = oRes.oMedDispensingDetail.All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                    }
                    else if (this.lPrescriptionItemOID > 0 && this.bSuppInstrInvokedFromTVCA) {
                        if (this.lPresMultiCompitemOID == 0 && this.lFluidPrescribableItemListOID == 0) {
                            ProductOptionsCnt = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                            IsRecdExists = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                        }
                        else if (this.lPresMultiCompitemOID != 0) {
                            ProductOptionsCnt = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == this.lPresMultiCompitemOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                            IsRecdExists = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == this.lPresMultiCompitemOID).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                        }
                        else if (this.lFluidPrescribableItemListOID != 0) {
                            ProductOptionsCnt = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == this.lFluidPrescribableItemListOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                            IsRecdExists = oRes.oMedDispensingDetail.Where(x => x.PrescriptionItemOID > 0 && x.PrescriptionItemOID == this.lPrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == this.lFluidPrescribableItemListOID).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                        }
                    }
                    if (IsRecdExists && ProductOptionsCnt > 0) {
                        this.iSupplyrequest.Add(ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: this.sCancelMedReqDispText,
                            Value: this.sCancelMedReqConceptCode,
                            IsSelected: false
                        }));
                        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.SelectedSupplyreq != null && this.iSupplyrequest != null) {
                            let objselectedval: CListItem = this.iSupplyrequest.Where(x => String.Equals(x.Value, this.oPrescriptionItemVM.SelectedSupplyreq.Value)).FirstOrDefault();
                            this.SelectedSupplyrequest = objselectedval;
                        }
                    }
                }
                this.lstDispensePendingItems = oRes.oMedDispensingDetail.Where(x => x != null && (x.DispenseStatus != null && CConstants.MedDispenseRequestSent.Equals(x.DispenseStatus, StringComparison.OrdinalIgnoreCase))).Select(x => !String.IsNullOrEmpty(x.DrugName) ? x.DrugName : String.Empty).Where(x => !String.IsNullOrEmpty(x)).Distinct().ToList();
                if (this.lstDispensePendingItems != null && this.lstDispensePendingItems.Count > 0) {
                    let sDrugName: string = this.lstDispensePendingItems[0];
                    if (!String.IsNullOrEmpty(sDrugName) && sDrugName.Equals("Multiple component item", StringComparison.InvariantCultureIgnoreCase)) {
                        let dtPresStartDTTM: DateTime = oRes.oMedDispensingDetail.Where(x => x != null && (x.DispenseStatus != null && CConstants.MedDispenseRequestSent.Equals(x.DispenseStatus, StringComparison.OrdinalIgnoreCase))).Select(x => x.PrescribeStartDTTM).FirstOrDefault();
                        if (DateTime.NotEquals(dtPresStartDTTM, DateTime.MinValue)) {
                            this.lstDispensePendingItems.Remove(sDrugName);
                            let IsDST: boolean, IsAmbiguous, IsInvalid;
                            let sPresStartDTTM: string = dtPresStartDTTM.ConvertToUser(_IsDST => { IsDST = _IsDST; }, (_IsAmbiguous) => { IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { IsInvalid = _IsInvalid; }).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateHMFormat);
                            sDrugName = sDrugName + " (" + sPresStartDTTM + ")";
                            this.lstDispensePendingItems.Add(sDrugName);
                        }
                    }
                }
            }
            if (oRes != null && oRes.arrSupplyHistoryDetails != null && oRes.arrSupplyHistoryDetails.Count > 0) {
                if (this.bSuppInstrInvokedFromEPRPresChart || (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.IsclinicallyVerifyAddSupplylink)) {
                    this.bAvoidNextSupplyFirsttime = false;
                    this.NextSupDTTM = DateTime.MinValue;
                    let oSupplyHistoryDetails = oRes.arrSupplyHistoryDetails.OrderByDescending(x => x.SuppliedDTTM).FirstOrDefault();
                    if (oSupplyHistoryDetails != null && oSupplyHistoryDetails.PrescriptionMultiComponentOID == 0 && oSupplyHistoryDetails.FluidPrescribableItemListOID == 0 && oSupplyHistoryDetails.IsDoseCombinationsDefined.Equals('0') && DateTime.NotEquals(oSupplyHistoryDetails.NextSupplyDTTM, DateTime.MinValue) && oSupplyHistoryDetails.Prescriptiontype.Equals(PrescriptionTypes.ForAdministration)) {
                        this.NextSupDTTM = oSupplyHistoryDetails.NextSupplyDTTM;
                    }
                    else {
                        this.NextSupDTTM = DateTime.MinValue;
                    }
                }
                this.SupplyHistoryList = new ObservableCollection<SupplyHistoryDetails>();
                oRes.arrSupplyHistoryDetails.forEach((objSupplyHistoryDetails) => {
                    let oSupplyHistoryDetails: SupplyHistoryDetails = new SupplyHistoryDetails();
                    oSupplyHistoryDetails.Drugname = objSupplyHistoryDetails.Drugname;
                    oSupplyHistoryDetails.IsDoseCombinationsDefined = objSupplyHistoryDetails.IsDoseCombinationsDefined;
                    oSupplyHistoryDetails.LocationName = objSupplyHistoryDetails.LocationName;
                    oSupplyHistoryDetails.ServiceName = objSupplyHistoryDetails.ServiceName;
                    oSupplyHistoryDetails.SupplieddBy = objSupplyHistoryDetails.SupplieddBy;
                    oSupplyHistoryDetails.SuppliedDTTM = objSupplyHistoryDetails.SuppliedDTTM;
                    oSupplyHistoryDetails.SortingDTTM = objSupplyHistoryDetails.SortingDTTM;
                    oSupplyHistoryDetails.PresItemstatusCode = objSupplyHistoryDetails.PresItemstatusCode;
                    oSupplyHistoryDetails.DispenseStatus = objSupplyHistoryDetails.DispenseStatus;
                    if (objSupplyHistoryDetails.IsDoseCombinationsDefined == '0' && !String.Equals(objSupplyHistoryDetails.SupplystatusCode, "CC_SUPPLYEMPTY", StringComparison.CurrentCultureIgnoreCase)) {
                        let sCode = objSupplyHistoryDetails.SupplystatusCode == "CC_SUPPLY" ? "CC_Supply" : objSupplyHistoryDetails.SupplystatusCode == "CC_MEDDONTSUPPLY" ? "CC_MedDontSupply" : objSupplyHistoryDetails.SupplystatusCode
                        if (MedicationCommonConceptCodeData.ViewConceptCodes == undefined || MedicationCommonConceptCodeData.ViewConceptCodes.Count == 0)
                            sCode = objSupplyHistoryDetails.SupplystatusCode == "CC_SUPPLY" ? "Supply" : objSupplyHistoryDetails.SupplystatusCode == "CC_MEDDONTSUPPLY" ? "Do not supply" : objSupplyHistoryDetails.SupplystatusCode //Bug id 50720
                        oSupplyHistoryDetails.SupplystatusCode = (CommonBB.GetText(sCode, MedicationCommonConceptCodeData.ViewConceptCodes));


                    }
                    if (String.IsNullOrEmpty(oSupplyHistoryDetails.SupplieddBy)) {
                        oSupplyHistoryDetails.SuppliedDTTM = DateTime.MinValue;
                    }
                    if (!String.IsNullOrEmpty(objSupplyHistoryDetails.Prescriptiontype))
                        oSupplyHistoryDetails.Prescriptiontype = PrescriptionHelper.GetPrescriptionType(objSupplyHistoryDetails.Prescriptiontype);
                    let sSupplyinscomments: StringBuilder = new StringBuilder();
                    if ((!String.IsNullOrEmpty(objSupplyHistoryDetails.Supplyinstruction) && (!String.Equals(objSupplyHistoryDetails.Supplyinstruction, CConstants.Supplycomments)))) {
                        let _arrSupplyInstruction: string = objSupplyHistoryDetails.Supplyinstruction;
                        let nSeparatorCount: number = _arrSupplyInstruction.Split(';').length;
                        if (nSeparatorCount > 0) {
                            let _sbSupplyInstructionsText: StringBuilder = new StringBuilder();
                            for (let _i: number = 0; _i < nSeparatorCount; _i++) {
                                // let sSupplyInstruction: string = String.Empty;
                                // if (MedicationCommonConceptCodeData.ViewConceptCodes != null) {
                                //     sSupplyInstruction = CommonBB.GetText(_arrSupplyInstruction.Split(';')[_i], MedicationCommonConceptCodeData.ViewConceptCodes);
                                // }
                                // if (String.IsNullOrEmpty(sSupplyInstruction) && MedicationCommonConceptCodeData.ConceptCodes != null) {
                                //     sSupplyInstruction = CommonBB.GetText(_arrSupplyInstruction.Split(';')[_i], MedicationCommonConceptCodeData.ConceptCodes);
                                // }
                                _sbSupplyInstructionsText.Append(_arrSupplyInstruction.Split(';')[_i]);
                                if (_i < nSeparatorCount - 1) {
                                    _sbSupplyInstructionsText.Append(";");
                                }
                            }
                            sSupplyinscomments.Append(_sbSupplyInstructionsText.ToString());
                        }
                        else {
                            sSupplyinscomments.Append(CommonBB.GetText(objSupplyHistoryDetails.Supplyinstruction, MedicationCommonConceptCodeData.ViewConceptCodes));
                        }
                    }
                    if (!String.IsNullOrEmpty(objSupplyHistoryDetails.SupplyComments)) {
                        if (sSupplyinscomments != null && !String.IsNullOrEmpty(sSupplyinscomments.ToString()))
                            sSupplyinscomments.Append(Environment.NewLine);
                        sSupplyinscomments.Append(Resource.Supplyhistory.Comments + objSupplyHistoryDetails.SupplyComments);
                    }
                    oSupplyHistoryDetails.Supplyinstruction = sSupplyinscomments.ToString();
                    oSupplyHistoryDetails.NextSupplyDTTM = objSupplyHistoryDetails.NextSupplyDTTM;
                    oSupplyHistoryDetails.SortingDTTM = objSupplyHistoryDetails.SortingDTTM;
                    this.SupplyHistoryList.Add(oSupplyHistoryDetails);
                });
            }
        }
        this.bAvoidNextSupplyFirsttime = true;
    }
    public GetSupplyDispenseDetail(): void {
        let oReq: CReqMsgGetSupplyDispenseDetail = new CReqMsgGetSupplyDispenseDetail();
        oReq.oContextInformation = Common.FillContext();
        oReq.lnPatientoidBC = PatientContext.PatientOID;
        oReq.PrescriptionItemOIDsBC = PatientContext.PrescriptionOID;
        let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objServiceProxy.GetSupplyDispenseDetailCompleted = (s, e) => { this.objServiceProxy_GetSupplyDispenseDetailCompleted(s, e); };
        objServiceProxy.GetSupplyDispenseDetailAsync(oReq);
    }
    public objServiceProxy_GetSupplyDispenseDetailCompleted(sender: Object, e: GetSupplyDispenseDetailCompletedEventArgs): void {
        if (e.Error == null) {
            let oRes: CResMsgGetSupplyDispenseDetail = e.Result;
            if (oRes != null && oRes.oMedDispensingDetail != null && oRes.oMedDispensingDetail.Length > 0) {
                let sDrugName: string = String.Empty;
                for (let i: number = 0; i < oRes.oMedDispensingDetail.Length; i++) {
                    let objMedDispDet: MedDispensingDetail = oRes.oMedDispensingDetail[i];
                    {
                        sDrugName = !String.IsNullOrEmpty(objMedDispDet.DrugName) ? objMedDispDet.DrugName : String.Empty;
                        if (!String.IsNullOrEmpty(objMedDispDet.LorenzoID) && objMedDispDet.LorenzoID.Equals(CConstants.ADHOC_ITEM_LORENZOID, StringComparison.InvariantCultureIgnoreCase) && DateTime.NotEquals(objMedDispDet.PrescribeStartDTTM, DateTime.MinValue)) {
                            let IsDST: boolean, IsAmbiguous, IsInvalid;
                            let sPresStartDTTM: string = objMedDispDet.PrescribeStartDTTM.ConvertToUser(_IsDST => { IsDST = _IsDST; }, (_IsAmbiguous) => { IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { IsInvalid = _IsInvalid; }).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateHMFormat);
                            sDrugName = sDrugName + " (" + sPresStartDTTM + ")";
                        }
                        this.lstDispensePendingItems.Add(sDrugName.Trim('\r', '\n'));
                    }
                }
            }
        }
    }
    public DoCleanup(): void {

    }
    objMsgResponse: MessageBoxResult;
    public ValidateSupplyInsOnSubmit(): boolean {
        let bValid: boolean = false;
        if (this.SelectedSupplyrequest != null && !String.IsNullOrEmpty(this.SelectedSupplyrequest.Value) && this.SelectedSupplyrequest.Value.Equals(CConstants.Supplycode, StringComparison.InvariantCultureIgnoreCase)) {
            if (this.lstDispensePendingItems != null) {
                let IncludeMedicationDispenseBehaviour: boolean = ContextManager.Instance["IncludeMedicationDispenseBehaviour"] != null && ContextManager.Instance["IncludeMedicationDispenseBehaviour"].ToString().Equals("true", StringComparison.OrdinalIgnoreCase);
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.MessageButton = MessageBoxButton.YesNoCancel;
                objMsg.IconType = MessageBoxType.Question;
                objMsg.Title = "Lorenzo";
                if (this.lstDispensePendingItems.Count == 0 || !IncludeMedicationDispenseBehaviour) {
                    bValid = true;
                }
                else {
                    objMsg.MessageBoxClose = (o: Object, e: MessageEventArgs) => {
                        if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                            bValid = false;
                        }
                        else {
                            this.objMsgResponse = e.MessageBoxResult;
                            bValid = true;
                            Busyindicator.SetStatusBusy("FINISH");
                            this.submitsupplyinstructions();
                            Busyindicator.SetStatusIdle("FINISH");
                        }
                    };
                    objMsg.Message = String.Format(Resource.TechValidate.ResentRequestMessage, String.Join("\n\n\t", this.lstDispensePendingItems.ToArray()));
                    objMsg.Height = 280;
                    objMsg.Width = 420;
                    objMsg.Show();
                }
            }
        }
        else {
            bValid = true;
        }
        return bValid;
    }
}