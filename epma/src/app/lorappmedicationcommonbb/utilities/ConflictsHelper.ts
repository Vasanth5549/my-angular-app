import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, RTEEventargs, List, ContentControl } from 'epma-platform/models';
import { AppDialog, UserControl } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ConflictsVM } from '../viewmodel/conflictsvm';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'
import { WarningDetails } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';

import { Dictionary } from 'epma-platform/dictionary';
import { WarningConceptCode } from './profiledata';
import { CConstants, PrescriptionTypes, ValueDomain } from './constants';
import { medConflictsPGD } from '../child/medConflictsPGD/medConflictsPGD';

    export class ConflictsHelper {
        //public delegate void dlgtConflictsAcknowledged(bool ? IsOkClicked, ConflictAcknowledge[] conflicts);
        public OnConflictsAcknowledged: Function;
        objWarningItem: IPPManagePrescSer.WarningItems = null;
        WarngDetail: ObservableCollection<WarningDetails> = null;
        oAddGrid: ObservableCollection<ConflictsVM> = null;
        ConflictDetails: ObservableCollection<ConflictsVM> = null;
        public ConflictsReason: ObservableCollection<CListItem>;
        // omedConflictsPGD: medConflictsPGD = null; //Not Required for LHS. To be Re-Visited.
        public static CConstants_ItemSubType: string = "CC_MULCMPNTITM";
        public static DRUGDUPLICATION: string = "CC_DUPL_CHK";
        public static sDuplication: string = "Drug duplication";
        public static DRUGCONTRA: string = "CC_DRUG_CONTRA";
        public static sContraIndication: string = "Drug contraindication";
        public static DRUGINTRACT: string = "CC_INTERACTIONS";
        public static sInteract: string = "Drug interaction";
        public static Selectreason: string = "Select reason";
        public static Selectreasonstar: string = "Select reason*";
        public static sDrugInt: string = "Drug interaction";
        omedConflictsPGD: medConflictsPGD;
        public ShowConflicts(_objWarningItem: IPPManagePrescSer.WarningItems, _WarngDetail: ObservableCollection<WarningDetails>): void {
            this.objWarningItem = _objWarningItem;
            this.WarngDetail = _WarngDetail;
            if (this.WarngDetail != null) {
                for (let i: number = 0; i < this.WarngDetail.Count; i++) {
                    this.WarngDetail[i].UniqueMCRowID = i + 1;
                }
            }
            ProcessRTE.GetValuesByDomainCodes(ValueDomain.ConflictsReason, (s,e) =>{this.OnRTEResult(s);});
        }
        private OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            let objResult: Dictionary<string, List<CListItem>> = ObjectHelper.CreateType<Dictionary<string, List<CListItem>>>(args.Result, Dictionary<string, List<CListItem>> );
            if (objResult == null)
                return
            if (objResult.ContainsKey(ValueDomain.ConflictsReason)) {
                let lstCListItem: List<CListItem> = objResult[ValueDomain.ConflictsReason];
                if (lstCListItem != null && lstCListItem.Count > 0) {
                    this.ConflictsReason = new ObservableCollection<CListItem>();
                    lstCListItem.forEach( (oCListItem)=> {
                        this.ConflictsReason.Add(oCListItem);
                    });
                }
            }
            this.UpdateWarningSubType();
        }
        private UpdateWarningSubType(): void {
            if (this.WarngDetail != null && this.WarngDetail.Count > 0) {
                this.oAddGrid = new ObservableCollection<ConflictsVM>();
                this.WarngDetail.forEach( (objWarnDet)=> {
                    if (objWarnDet != null && !String.IsNullOrEmpty(objWarnDet.TypeColorCode) && String.Equals(objWarnDet.TypeColorCode, "1")) {
                        this.ValidateBindDataToVM(objWarnDet, this.objWarningItem.DrugItem.IdentifyingName, this.objWarningItem.DrugItem.IdentifyingType, this.objWarningItem.DrugItem.IdentifyingOID, PrescriptionTypes.ForAdministration);
                    }
                });
                let oGridAdd: ObservableCollection<ConflictsVM> = new ObservableCollection<ConflictsVM>(this.oAddGrid.OrderBy(AddGrid => AddGrid.WarningBehaviourType).ThenBy(AddGrid => AddGrid.DisplaySeqNumber));
                this.ConflictDetails = oGridAdd;
                //this.LoadConflictXap();//Not Required for LHS. To be Re-Visited.                
                this.conflictLoaded();
            }
        }
        private ValidateBindDataToVM(oDetails: WarningDetails, sDrugName: string, sDrugType: string, lnDrugOID: number, sPresType: string): void {
            let oVM: ConflictsVM = new ConflictsVM();
            oVM.DrugName = sDrugName;
            oVM.DrugType = sDrugType;
            oVM.DrugMonoInfoOID = lnDrugOID;
            oVM.PrescriptionType = sPresType;
            oVM.WarningOID = oDetails.WarningOID;
            oVM.UniqueMCRowId = oDetails.UniqueMCRowID;
            oVM.EnableAcknowledgementDetails = true;
            if (this.ConflictsReason != null)
                oVM.PrescriberReasonCombo = this.ConflictsReason;
            if (oDetails != null && String.Equals(oDetails.PrescriberComments, "Select reason", StringComparison.InvariantCulture))
                oDetails.PrescriberComments = String.Empty;
            oVM.AcknowledgeStatus = false;
            oVM.AckstatusToolTip = "Select to acknowledge conflict";
            if (!String.IsNullOrEmpty(oDetails.WarningBehaviourType)) {
                oVM.WarningBehaviourType = oDetails.WarningBehaviourType;
            }
            oVM.PrescriberReason = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: String.IsNullOrEmpty(oDetails.PrescriberComments) ? ConflictsHelper.Selectreason : oDetails.PrescriberComments,
                Value: String.IsNullOrEmpty(oDetails.PrescriberComments) ? oVM.ReasonMandatory ? ConflictsHelper.Selectreasonstar : ConflictsHelper.Selectreason : oDetails.PrescriberComments
            });
            if (!String.IsNullOrEmpty(oDetails.WarningMessage))
                oVM.WarningMessage = oDetails.WarningMessage.Replace("%2B", "+");
            if (String.Equals(oDetails.WarningType, ConflictsHelper.sDrugInt, StringComparison.InvariantCultureIgnoreCase)) {
                oVM.WarningMessage = oVM.WarningMessage.Replace("<BR>", "\n").Replace("<br />", "\n").Replace("&amp;", "&").Replace("monograph", "~monograph~");
            }
            if (String.Equals(oDetails.WarningType, CConstants.sWarning, StringComparison.InvariantCultureIgnoreCase)) {
                let bWarningwithGenericType: boolean = false;
                if (!String.IsNullOrEmpty(oDetails.WarningSubType) && (String.Equals(oDetails.WarningSubType, CConstants.sAbsolute, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oDetails.WarningSubType, CConstants.sGeneric, StringComparison.InvariantCultureIgnoreCase))) {
                    bWarningwithGenericType = true;
                }
                if (bWarningwithGenericType || String.IsNullOrEmpty(oDetails.WarningSubType)) {
                    oVM.WarningType = oDetails.WarningType;
                }
                if (!String.IsNullOrEmpty(oDetails.WarningSubType) && !bWarningwithGenericType) {
                    let warningSubType: string = String.Empty;
                    let sWarSubTypes: string[] = !String.IsNullOrEmpty(oDetails.WarningSubType) ? oDetails.WarningSubType.Split(',') : null;
                    if (sWarSubTypes != null && sWarSubTypes.length > 0) {
                        for (let i: number = 0; i < sWarSubTypes.length; i++) {
                            if (!String.IsNullOrEmpty(sWarSubTypes[i])) {
                                let sWarSubType: string = WarningConceptCode.WarningCategoriesData == null ? null : CommonBB.GetText(sWarSubTypes[i], WarningConceptCode.WarningCategoriesData);
                                if (i == 0) {
                                    warningSubType = sWarSubType != null ? sWarSubType : String.Empty;
                                }
                                else {
                                    warningSubType = warningSubType + "," + (sWarSubType != null ? sWarSubType : String.Empty);
                                }
                            }
                        }
                    }
                    oVM.WarningType = oDetails.WarningType + " - " + warningSubType;
                }
            }
            else {
                oVM.WarningType = oDetails.WarningType;
            }
            oVM.DisplaySeqNumber = oDetails.DisplaySequenceNumber;
            this.CommonConflictsFormatting(oVM);
            oVM.IsSeal = String.IsNullOrEmpty(oDetails.IsSeal) ? false : (String.Equals(oDetails.IsSeal, "0", StringComparison.CurrentCultureIgnoreCase)) ? false : true;
            oVM.SealType = oDetails.SealType;
            oVM.ConflictCode = oDetails.Code;
            oVM.ConflictType = oDetails.ConflictType;
            this.oAddGrid.Add(oVM);
        }
        //Not Required for LHS. To be Re-Visited.
        /*
        private GetCurrentVersion(): string {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            let assemblyNamePart: string[] = assembly.FullName.Split(',');
            if (assemblyNamePart.length > 1) {
                let version: String = assemblyNamePart[1];
                let versionPart: string[] = version.Split('=');
                if (versionPart.length > 1) {
                    return versionPart[1].Trim();
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        */
        private CommonConflictsFormatting(value: Object): void {
            let sWarningMsg: string = String.Empty;
            let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(value, ConflictsVM);
            if (!String.IsNullOrEmpty(oVM.WarningMessage)) {
                sWarningMsg = oVM.WarningMessage.Replace("<BR>", "\n").Replace("<br />", "\n").Replace("&amp;", "&").Replace("monograph", "~monograph~");
                oVM.WarningMessage = sWarningMsg;
            }
        }
        //Not Required for LHS. To be Re-Visited.
        /*
        private LoadConflictXap(): void {
            let obj: XapLoader = new XapLoader();
            let xapurl: string, assemblyname, classname;
            xapurl = assemblyname = classname = String.Empty;
            obj.XAPVersion = this.GetCurrentVersion();
            let currentPath: string = Application.Current.Host.Source.AbsoluteUri;
            let basePath: string = currentPath.Substring(0, currentPath.LastIndexOf('/'));
            let sxapURL: string = null;
            if (basePath.EndsWith("/MedicationMgmt/ClientBin", StringComparison.OrdinalIgnoreCase)) {
                sxapURL = "./LorAppManagePrescriptionBBUI_P2.xap";
            }
            else if (basePath.EndsWith("/EPR/ClientBin", StringComparison.OrdinalIgnoreCase)) {
                sxapURL = "../../MedicationMgmt/ClientBin/LorAppManagePrescriptionBBUI_P2.xap";
            }
            else if (basePath.EndsWith("/ClientBin", StringComparison.OrdinalIgnoreCase)) {
                sxapURL = "../MedicationMgmt/ClientBin/LorAppManagePrescriptionBBUI_P2.xap";
            }
            else {
                return
            }
            obj.OnResult  = (s,e) => { this.conflictXapLoaded(s,e); } ;
            obj.XAPLoad(sxapURL, "LorAppManagePrescriptionBBUI_P2.dll", "medfrmconflictsCA");
        }
        */
        private conflictLoaded(): void {
            //if (Result != null) {
                //let obj: UserControl = ObjectHelper.CreateType<UserControl>(Result, UserControl);
                //obj.DataContext = ObjectHelper.CreateObject(new ConflictContainerVM(), { ConflictDetails: this.ConflictDetails });
                if (this.ConflictDetails != null && this.ConflictDetails.Count > 0) {
                    //Not Required for LHS. To be Re-Visited.
                    this.omedConflictsPGD = new medConflictsPGD();
                    this.omedConflictsPGD.DataContext= this.ConflictDetails;
                    let Callback = (s, e) => {
                        if (s != null && e != null) {
                            this.omedConflictsPGD = s;
                        }
                    }
                    let dialogWindowHeight = (720/window.devicePixelRatio);
                    AppActivity.OpenWindow(this.objWarningItem != null && this.objWarningItem.DrugItem != null && !String.IsNullOrEmpty(this.objWarningItem.DrugItem.IdentifyingName) ? this.objWarningItem.DrugItem.IdentifyingName : String.Empty, this.omedConflictsPGD, (s,e) => { this.omedConflictsPGD_Closed(s); }, "", false, dialogWindowHeight, 1010, false, WindowButtonType.OkCancel, null,null,null,Callback);
                }
                else {
                    iBusyIndicator.Stop("ConflictHelper");
                    if (this.OnConflictsAcknowledged != null)
                        this.OnConflictsAcknowledged(false, null);
                }
            //}
        }
        private omedConflictsPGD_Closed(args: AppDialogEventargs): void {
            let IsType1: boolean = false;
            let IsOkClicked: boolean = false;
            if (args != null && args.Content != null) {
                this.omedConflictsPGD = args.Content.Component; 
            if (args.Result == AppDialogResult.Cancel) {
                //args.AppChildWindow.DialogResult = false;
                args.AppChildWindow.DialogRef.close();               
                iBusyIndicator.Stop("ConflictHelper");                 
                if (this.OnConflictsAcknowledged != null) { 
                    this.OnConflictsAcknowledged(false, null); 
                }
                iBusyIndicator.Stop("ConflictHelper");
                return
            }
            //let argsContent: UserControl = ObjectHelper.CreateType<UserControl>(args.Content, UserControl);
            //if (argsContent != null) {
                //let control: ContentControl = ObjectHelper.CreateType<ContentControl>(argsContent.FindName("ContentCtrlMedConflicts"), ContentControl);
                let liAcknowledge: ConflictAcknowledge[] = null;
                //if (control != null) {
                    //let userControl: UserControl = ObjectHelper.CreateType<UserControl>(control.Content, UserControl);
                    //if (userControl != null) {                                                 
                            let vm: ConflictContainerVM = ObjectHelper.CreateType<ConflictContainerVM>(this.omedConflictsPGD, ConflictContainerVM);
                            vm.ConflictDetails = this.omedConflictsPGD.DataContext;
                            if (this.WarngDetail != null && vm != null && vm.ConflictDetails != null) {
                            liAcknowledge = vm.ConflictDetails.Select(x => ObjectHelper.CreateObject(new ConflictAcknowledge(), { RowId: x.UniqueMCRowId, IsAcknowledged: x.AcknowledgeStatus, Reason: (x.PrescriberReason != null && !String.IsNullOrEmpty(x.PrescriberReason.Value)) ? x.PrescriberReason.DisplayText : String.Empty })).ToArray();
                            let anyNotAcked: boolean = vm.ConflictDetails.Any(x => x.ReasonMandatory && (String.Equals(x.PrescriberReason == null ? null : x.PrescriberReason.Value, ConflictsHelper.Selectreason, StringComparison.OrdinalIgnoreCase) || String.Equals(x.PrescriberReason == null ? null : x.PrescriberReason.Value, ConflictsHelper.Selectreasonstar, StringComparison.OrdinalIgnoreCase)) || x.AcknowledgeBorder && !x.AcknowledgeStatus);
                            if (this.ConflictDetails != null && this.ConflictDetails.Count > 0) {
                                this.ConflictDetails.forEach( (oConf)=> {
                                    if (oConf.EnableAcknowledgementDetails && !String.IsNullOrEmpty(oConf.WarningBehaviourType) && String.Equals(oConf.WarningBehaviourType, "Type 1", StringComparison.InvariantCultureIgnoreCase)) {
                                        IsType1 = true;
                                    }
                                });
                            }
                            if (IsType1) {
                                let msg: iMessageBox = new iMessageBox();
                                msg.Title = "Information - Lorenzo";
                                msg.MessageButton = MessageBoxButton.OK;
                                msg.MessageBoxClose  = (s,e) => { this.Mandatory_MessageBoxClose(s,e); } ;
                                let IdentifyingName: string = this.objWarningItem != null && this.objWarningItem.DrugItem != null && !String.IsNullOrEmpty(this.objWarningItem.DrugItem.IdentifyingName) ? this.objWarningItem.DrugItem.IdentifyingName : String.Empty;
                                msg.Message = "The " + IdentifyingName + " cannot be prescribed. Please remove item to continue.";
                                msg.Show();
                            }
                            else if (anyNotAcked && !IsType1) {
                                let msg: iMessageBox = new iMessageBox();
                                msg.Title = "Information - LORENZO";
                                msg.MessageButton = MessageBoxButton.OK;
                                msg.MessageBoxClose  = (s,e) => { this.Mandatory_MessageBoxClose(s,e); } ;
                                msg.Message = "There are one or more mandatory fields that are blank. Please complete the mandatory information to proceed further";
                                msg.Show();
                            }
                            else {
                                //args.AppChildWindow.DialogResult = true;
                                args.AppChildWindow.DialogRef.close();   
                                iBusyIndicator.Stop("ConflictHelper");
                                if (this.OnConflictsAcknowledged != null) {
                                    IsOkClicked= (args.Result == AppDialogResult.Ok)? true : false;
                                    this.OnConflictsAcknowledged(IsOkClicked, liAcknowledge);
                                }
                                iBusyIndicator.Stop("ConflictHelper");
                            }
                        }
                    }
                    //}
                //}
            //}
        }
        Mandatory_MessageBoxClose(sender: Object, args: MessageEventArgs): void {
            //Not Required for LHS. To be Re-Visited.
            /*
            if (this.omedConflictsPGD != null) {
                let control: ContentControl = ObjectHelper.CreateType<ContentControl>(this.omedConflictsPGD.FindName("ContentCtrlMedConflicts"), ContentControl);
                if (control != null) {
                    let userControl: UserControl = ObjectHelper.CreateType<UserControl>(control.Content, UserControl);
                    if (userControl != null) {
                        let grid: iGrid = ObjectHelper.CreateType<iGrid>(userControl.FindName("grdConflicts"), iGrid);
                        if (grid != null) {
                            grid.Focus();
                        }
                    }
                }
            }
            */
        }
    }
    export class ConflictContainerVM {
        public ConflictDetails: ObservableCollection<ConflictsVM>;
    }
    export class ConflictAcknowledge {
        public RowId: number;
        public Reason: string;
        public IsAcknowledged: boolean;
    }