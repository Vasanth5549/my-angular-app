import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, CListItem, ObservableCollection, ChildWindow } from 'epma-platform/models';
import { AppDialog, TextBlock } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import *as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { FontWeight, FontWeights, MouseButtonEventArgs } from 'src/app/shared/epma-platform/controls/Control';

    export class ConflictsVM extends ViewModelBase {
        //Not Required for LHS. To be Re-Visited.
        // private objmeddrugmonographChild: meddrugmonographChild;
        private oChildWindow: ChildWindow;
        private varAckTltip: string;
        public SubscribeMonographClickEvent(hypLink: TextBlock): void {
        hypLink.MouseLeftButtonUp = (s, e) => { this.hypLink_MouseLeftButtonUp(s, e); };
        }
        hypLink_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            e.Handled = true;
            if (this.DrugMonoInfoOID > 0 && !String.IsNullOrEmpty(this.DrugType) && !String.IsNullOrEmpty(this.DrugName)) {
                let MonographParams: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                let MonographParamDet: CListItem = new CListItem();
                MonographParamDet.DisplayText = this.DrugName;
                MonographParamDet.Value = Convert.ToString(this.DrugMonoInfoOID);
                MonographParamDet.Tag = this.DrugType;
                MonographParams.Add(MonographParamDet);
                this.LaunchedLink = true;
                MedicationCommonBB.OnMonographLinkClick(MonographParams);
            }
        }
        private _warnType: string;
        public get WarningType(): string {
            return this._warnType;
        }
        public set WarningType(value: string) {
            if (this._warnType != value) {
                this._warnType = value;
               //NotifyPropertyChanged("WarningType");
            }
        }
        public _AckstatusToolTip: string;
        public get AckstatusToolTip(): string {
            return this.varAckTltip;
        }
        public set AckstatusToolTip(value: string) {
            if (this.varAckTltip != value) {
                this.varAckTltip = value;
                if (this.AcknowledgeStatus == true) {
                    this.AckstatusToolTip = "Acknowledged";
                }
                else {
                    this.AckstatusToolTip = "Select to acknowledge conflict";
                }
            }
           //NotifyPropertyChanged("AckstatusToolTip");
        }
        private _warnSubType: string;
        public get WarningSubType(): string {
            return this._warnSubType;
        }
        public set WarningSubType(value: string) {
            if (this._warnSubType != value) {
                this._warnSubType = value;
               //NotifyPropertyChanged("WarningSubType");
            }
        }
        private _IsSeal: boolean = false;
        public get IsSeal(): boolean {
            return this._IsSeal;
        }
        public set IsSeal(value: boolean) {
            if (this._IsSeal != value) {
                this._IsSeal = value;
               //NotifyPropertyChanged("IsSeal");
            }
        }
        private _IsBreakSeal: boolean = false;
        public get IsBreakSeal(): boolean {
            return this._IsBreakSeal;
        }
        public set IsBreakSeal(value: boolean) {
            if (this._IsBreakSeal != value) {
                this._IsBreakSeal = value;
               //NotifyPropertyChanged("IsBreakSeal");
            }
        }
        private _SealType: string;
        public get SealType(): string {
            return this._SealType;
        }
        public set SealType(value: string) {
            if (this._SealType != value) {
                this._SealType = value;
               //NotifyPropertyChanged("SealType");
            }
        }
        private _ConflictCode: string;
        public get ConflictCode(): string {
            return this._ConflictCode;
        }
        public set ConflictCode(value: string) {
            if (this._ConflictCode != value) {
                this._ConflictCode = value;
               //NotifyPropertyChanged("ConflictCode");
            }
        }
        private _ConflictType: string;
        public get ConflictType(): string {
            return this._ConflictType;
        }
        public set ConflictType(value: string) {
            if (this._ConflictType != value) {
                this._ConflictType = value;
               //NotifyPropertyChanged("ConflictType");
            }
        }
        private _warnMsg: string;
        public get WarningMessage(): string {
            return this._warnMsg;
        }
        public set WarningMessage(value: string) {
            if (this._warnMsg != value) {
                this._warnMsg = value;
               //NotifyPropertyChanged("WarningMessage");
            }
        }
        private _presReasoncmb: ObservableCollection<CListItem>;
        public get PrescriberReasonCombo(): ObservableCollection<CListItem> {
            return this._presReasoncmb;
        }
        public set PrescriberReasonCombo(value: ObservableCollection<CListItem>) {
            if (this._presReasoncmb != value) {
                this._presReasoncmb = value;
               //NotifyPropertyChanged("PrescriberReasonCombo");
            }
        }
        public IsAmend: boolean = false;
        public IsFluidOrSequence: boolean;
        private _presReason: CListItem;
        public get PrescriberReason(): CListItem {
            return this._presReason;
        }
        public set PrescriberReason(value: CListItem) {
            if (value != null) {
                this._presReason = value;
                if (!this.EnableAcknowledgementDetails) {
                    if (String.IsNullOrEmpty(value.DisplayText)) {
                        this.ReasonMandatory = false;
                        this.AcknowledgeStatus = false;
                        this.PrescriberReason.ToolTip = this.PrescriberReason.DisplayText;
                        this.AckstatusToolTip = "Select to acknowledge conflict";
                    }
                    else {
                        this.ReasonMandatory = false;
                        this.AcknowledgeStatus = true;
                        this.AckstatusToolTip = "Acknowledged";
                    }
                }
                else if (value.Value == "Select reason*") {
                    this.ReasonMandatory = true;
                    this.AcknowledgeStatus = false;
                    this.AckstatusToolTip = "Select to acknowledge conflict";
                }
                else if (value.Value != "Select reason") {
                    this.ReasonMandatory = false;
                    this.AcknowledgeStatus = true;
                    this.AckstatusToolTip = "Acknowledged";
                }
                if (String.Compare(value.DisplayText, "Select reason", StringComparison.CurrentCultureIgnoreCase) == -1) {
                    this.IsMandatoryStarVisible = "Collapsed";
                }
                else{
                    this.SetActionMandatory();    
                }
            }
            else {
                this.SetActionMandatory();
            }
           //super.NotifyPropertyChanged("PrescriberReason");
        }
        private _ackStatus: boolean = false;
        public get AcknowledgeStatus(): boolean {
            return this._ackStatus;
        }
        public set AcknowledgeStatus(value: boolean) {
            if (this._ackStatus != value) {
                this._ackStatus = value;
                this.SetActionMandatory();
                if (!this.AcknowledgeStatus) {
                    if (this.ReasonMandatory) {
                        this.PrescriberReason = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: this.EnableAcknowledgementDetails ? "Select reason" : this.PrescriberReason.DisplayText,
                            Value: this.EnableAcknowledgementDetails ? "Select reason*" : this.PrescriberReason.DisplayText
                        });
                    }
                    else {
                        this.PrescriberReason = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: this.EnableAcknowledgementDetails ? "Select reason" : this.PrescriberReason.DisplayText,
                            Value: this.EnableAcknowledgementDetails ? "Select reason" : this.PrescriberReason.DisplayText
                        });
                    }
                }
                if (this.AcknowledgeStatus == true) {
                    this.AckstatusToolTip = "Acknowledged";
                }
                else {
                    this.AckstatusToolTip = "Select to acknowledge conflict";
                }
               //NotifyPropertyChanged("AcknowledgeStatus");
            }
        }
        private _AcknowledgeBorder: Boolean = false;
        public get AcknowledgeBorder(): Boolean {
            return this._AcknowledgeBorder;
        }
        public set AcknowledgeBorder(value: Boolean) {
            this._AcknowledgeBorder = value;
           //NotifyPropertyChanged("AcknowledgeBorder");
        }
        private _acknowledgeMandatory: string;
        public get AcknowledgeMandatory(): string {
            return this._acknowledgeMandatory;
        }
        public set AcknowledgeMandatory(value: string) {
            if (this._acknowledgeMandatory != value) {
                this._acknowledgeMandatory = value;
               //NotifyPropertyChanged("AcknowledgeMandatory");
            }
        }
        private _IsMandatoryStarVisible: string = "Collapsed";
        public get IsMandatoryStarVisible(): string {
            return this._IsMandatoryStarVisible;
        }
        public set IsMandatoryStarVisible(value: string) {
            if (this._IsMandatoryStarVisible != value) {
                this._IsMandatoryStarVisible = value;
               //NotifyPropertyChanged("IsMandatoryStarVisible");
            }
        }
        private _warnbehType: string;
        public get WarningBehaviourType(): string {
            return this._warnbehType;
        }
        public set WarningBehaviourType(value: string) {
            if (this._warnbehType != value) {
                this._warnbehType = value;
                this.SetActionMandatory();
               //NotifyPropertyChanged("WarningBehaviourType");
            }
        }
        private _reasonMand: boolean = false;
        public get ReasonMandatory(): boolean {
            return this._reasonMand;
        }
        public set ReasonMandatory(value: boolean) {
            if (this._reasonMand != value) {
                this._reasonMand = value;
                if (value) {
                    this.ReasonFontSize = 13;
                this.ReasonFontWeight = FontWeights.ExtraBold;
                    this.IsMandatoryStarVisible = "Visible";
                }
                else {
                    this.ReasonFontSize = 11;
                this.ReasonFontWeight = FontWeights.Normal;
                }
               //NotifyPropertyChanged("ReasonMandatory");
            }
        }
        private _ReasonFontSize: number = 11;
        public get ReasonFontSize(): number {
            return this._ReasonFontSize;
        }
        public set ReasonFontSize(value: number) {
            if (this._ReasonFontSize != value) {
                this._ReasonFontSize = value;
               //NotifyPropertyChanged("ReasonFontSize");
            }
        }
    //private _ReasonFontWeight:FontWeight = FontWeights.Normal;
    private _ReasonFontWeight: FontWeight = FontWeights.Normal;
    public get ReasonFontWeight(): FontWeight {
            return this._ReasonFontWeight;
        }
    public set ReasonFontWeight(value: FontWeight) {
            if (this._ReasonFontWeight != value) {
                this._ReasonFontWeight = value;
               //NotifyPropertyChanged("ReasonFontWeight");
            }
        }
        public SetActionMandatory(): void {
            if (this.EnableAcknowledgementDetails) {
                if (!this.IsFluidOrSequence && ((String.Equals(this._warnbehType, "Type 2", StringComparison.OrdinalIgnoreCase) || String.Equals(this._warnbehType, "Type 3", StringComparison.OrdinalIgnoreCase)) && !this._ackStatus)) {
                    this.AcknowledgeMandatory = "*";
                    this.AcknowledgeBorder = true;
                }
                else {
                    this.AcknowledgeMandatory = "";
                    this.AcknowledgeBorder = false;
                }
                if (!this.IsFluidOrSequence && (String.Equals(this._warnbehType, "Type 2", StringComparison.OrdinalIgnoreCase) && !this._ackStatus)) {
                    this.ReasonMandatory = true;
                }
                else if (!this.IsFluidOrSequence && ((String.Equals(this._warnbehType, "Type 2", StringComparison.OrdinalIgnoreCase) && this._ackStatus && (!String.IsNullOrEmpty(this.PrescriberReason.Value) && String.Equals(this.PrescriberReason.Value, "Select reason*"))))) {
                    this.ReasonMandatory = true;
                }
                else {
                    this.ReasonMandatory = false;
                }
            }
        }
        private _dispNum: number = 0;
        public get DisplaySeqNumber(): number {
            return this._dispNum;
        }
        public set DisplaySeqNumber(value: number) {
            if (this._dispNum != value) {
                this._dispNum = value;
               //NotifyPropertyChanged("DisplaySeqNumber");
            }
        }
        private __clinReasoncmb: ObservableCollection<CListItem>;
        public get ClinicalReasonCombo(): ObservableCollection<CListItem> {
            return this.__clinReasoncmb;
        }
        public set ClinicalReasonCombo(value: ObservableCollection<CListItem>) {
            if (this.__clinReasoncmb != value) {
                this.__clinReasoncmb = value;
               //NotifyPropertyChanged("ClinicalReasonCombo");
            }
        }
        private _clinReason: CListItem;
        public get ClinicalVerfierReason(): CListItem {
            return this._clinReason;
        }
        public set ClinicalVerfierReason(value: CListItem) {
            if (value != null) {
                this._clinReason = value;
            }
           //super.NotifyPropertyChanged("ClinicalVerfierReason");
        }
        private _grpNum: number = 0;
        public get GroupingSeqNumber(): number {
            return this._grpNum;
        }
        public set GroupingSeqNumber(value: number) {
            if (this._grpNum != value) {
                this._grpNum = value;
               //NotifyPropertyChanged("GroupingSeqNumber");
            }
        }
        private __authReasoncmb: ObservableCollection<CListItem>;
        public get AuthoriseReasonCombo(): ObservableCollection<CListItem> {
            return this.__authReasoncmb;
        }
        public set AuthoriseReasonCombo(value: ObservableCollection<CListItem>) {
            if (this.__authReasoncmb != value) {
                this.__authReasoncmb = value;
               //NotifyPropertyChanged("AuthoriseReasonCombo");
            }
        }
        private _authReason: CListItem;
        public get AuthoriserReason(): CListItem {
            return this._authReason;
        }
        public set AuthoriserReason(value: CListItem) {
            if (value != null) {
                this._authReason = value;
            }
           //super.NotifyPropertyChanged("AuthoriserReason");
        }
        private _drugmonoOID: number = 0;
        public get DrugMonoInfoOID(): number {
            return this._drugmonoOID;
        }
        public set DrugMonoInfoOID(value: number) {
            if (this._drugmonoOID != value) {
                this._drugmonoOID = value;
               //NotifyPropertyChanged("DrugMonoInfoOID");
            }
        }
        private _LaunchedLink: boolean = false;
        public get LaunchedLink(): boolean {
            return this._LaunchedLink;
        }
        public set LaunchedLink(value: boolean) {
            if (this._LaunchedLink != value) {
                this._LaunchedLink = value;
               //NotifyPropertyChanged("LaunchedLink");
            }
        }
        public ApplicableTo: string;
        public ConflictMessage: string;
        public IsProblem: boolean = false;
        public PerformedOn: DateTime = DateTime.MinValue;
        public ProblemText: string;
        public WarningOID: number = 0;
        public WarningSeverity: string;
        public DrugName: string;
        public DrugType: string;
        public WarningConfType: string;
        public MessageFormat: IPPManagePrescSer.MessageFormat;
        public AllergyMsgTrigged: string;
        public MCChildIDName: string;
        public MCChildIDOID: number = 0;
        public MCChildIDType: string;
        public UniqueMCRowId: number = 0;
        public PrescriptionType: string;
        private _enableAcknowledgementDetails: boolean = true;
        public get EnableAcknowledgementDetails(): boolean {
            return this._enableAcknowledgementDetails;
        }
        public set EnableAcknowledgementDetails(value: boolean) {
            if (this._enableAcknowledgementDetails != value) {
                this._enableAcknowledgementDetails = value;
               //NotifyPropertyChanged("EnableAcknowledgementDetails");
            }
        }
    }