import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, WindowButtonType, AppDialogEventargs, ChildWindow } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, CnstSlotStatus, InfusionStrikeOutConceptcodes } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CReqMsgGetAllstrikethrdtl, CReqMsgGetStrikeinfchldDetl, CResMsgGetAllstrikethrdtl, CResMsgGetStrikeinfchldDetl, GetAllstrikethrdtlCompletedEventArgs, GetStrikeinfchldDetlCompletedEventArgs, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { InfActionsConceptCodeData, InfStrikethroughConceptCodeData, InfStrikethroughReasonsConceptCodeData, MedicationCommonConceptCodeData } from '../utilities/profiledata';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { medinfusionstrikehistory } from '../child/medInfusionStrikeHistory';
  
    export class infstrikethroughVM extends ViewModelBase {
         IsDST: boolean = false;
         IsAmbiguous: boolean = false;
         IsInvalid: boolean = false;
        constructor() {
            super();
        }
        public GetAllstrikethrdtl(MedadminOid: number, MCVersion: string, windowStateClosed: Function | null): void {
            this.Callbackpage = windowStateClosed;
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let objReq: CReqMsgGetAllstrikethrdtl = new CReqMsgGetAllstrikethrdtl();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.MedAdminOIDBC = MedadminOid;
            objReq.MCVersionNumberBC = MCVersion;
            objReq.PatientOIDBC = PatientContext.PatientOID;
            if (objService != null) {
                objService.GetAllstrikethrdtlCompleted  = (s,e) => { this.objService_GetAllstrikethrdtlCompleted(s,e); } ;
                objService.GetAllstrikethrdtlAsync(objReq);
            }
            else if (this.Callbackpage)
                this.Callbackpage();
        }
        Callbackpage: Function | null;
        objService_GetAllstrikethrdtlCompleted(sender: Object, e: GetAllstrikethrdtlCompletedEventArgs): void {
            let _ErrorID: number = 80000084;
            let _ErrorSource: string = "LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objService_GetAllstrikethrdtlCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetAllstrikethrdtl = e.Result;
                    let ostrikethrinfhistory: ObservableCollection<infstrikethroughVM.strikethrinfhistory> = new ObservableCollection<infstrikethroughVM.strikethrinfhistory>();
                    if (objResponse.objAdministrationDetail != null && objResponse.objAdministrationDetail.oInfusionAdminDetail != null) {
                        ostrikethrinfhistory = new ObservableCollection<infstrikethroughVM.strikethrinfhistory>();
                        let objstrikethrinfhistory: infstrikethroughVM.strikethrinfhistory;
                        for (let idx: number = 0; idx < objResponse.objAdministrationDetail.oInfusionAdminDetail.Count; idx++) {
                            objstrikethrinfhistory = new infstrikethroughVM.strikethrinfhistory();
                            if (String.Compare(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, InfusionStrikeOutConceptcodes.StrikeOutEntireAdmin, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                objstrikethrinfhistory.ActonCode = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, InfStrikethroughConceptCodeData.ConceptCodes);
                            }
                            else if (String.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, CnstSlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) || String.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, CnstSlotStatus.DEFERADMINISTRATION, StringComparison.InvariantCultureIgnoreCase)) {
                                objstrikethrinfhistory.ActonCode = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, MedicationCommonConceptCodeData.MedAdminSlotStatus);
                            }
                            else {
                                objstrikethrinfhistory.ActonCode = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, InfActionsConceptCodeData.ConceptCodes);
                            }
                            objstrikethrinfhistory.AdminreasonValue = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].infusionReasonCode, InfStrikethroughReasonsConceptCodeData.ConceptCodes);
                            objstrikethrinfhistory.RecordedAtValue = (DateTime.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].RecordedAt, DateTime.MinValue)) ? String.Empty : objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].RecordedAt.ConvertToUser(
                                (o1) => {
                                    this.IsDST = o1;
                                  },
                                  (o2) => {
                                    this.IsAmbiguous = o2;
                                  },
                                  (o3) => {
                                    this.IsInvalid = o3;
                                  }
                                ).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.LongDateWithoutSecs);
                            objstrikethrinfhistory.RecordedByValue = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].RecordedBy;
                            objstrikethrinfhistory.MedAdminHistoryOID = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].MedAdminHistoryOID;
                            objstrikethrinfhistory.IsMedScannedProduct = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].IsMedScannedProduct;
                            objstrikethrinfhistory.MedAdminOID = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].MedAdminOID;
                            ostrikethrinfhistory.Add(objstrikethrinfhistory);
                        }
                        this.Ostrikethrinfhistory = ostrikethrinfhistory;
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            //Not Required for LHS. To be Re-Visited.
            
            let omedinfusionstrikehistory: medinfusionstrikehistory = new medinfusionstrikehistory();
            omedinfusionstrikehistory.onDialogClose = this.omedsadmin_Closed;
            omedinfusionstrikehistory.DataContext = this;
            AppActivity.OpenWindow("Strikethrough administration history", omedinfusionstrikehistory, (s,e)=>{this.omedsadmin_Closed(s);}, "Strikethrough administration history", false, 350, 664, false, WindowButtonType.Close, null);
            
        }
        public GetStrikeinfchldDetl(MedadminHistoryOid: number): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let objReq: CReqMsgGetStrikeinfchldDetl = new CReqMsgGetStrikeinfchldDetl();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.MedAdminHistoryOIDBC = MedadminHistoryOid;
            objReq.PatientOIDBC = PatientContext.PatientOID;
            objService.GetStrikeinfchldDetlCompleted  = (s,e) => { this.objService_LoadAllInfusionActionsStrikeHistory(s,e); } ;
            objService.GetStrikeinfchldDetlAsync(objReq);
        }
        private objService_LoadAllInfusionActionsStrikeHistory(sender: Object, e: GetStrikeinfchldDetlCompletedEventArgs): void {
            let _ErrorID: number = 80000084;
            let _ErrorSource: string = "LorAppMedicationCommonBB.dll, Class:infstrikethroughVM, Method:objService_LoadAllInfusionActionsStrikeHistory()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetStrikeinfchldDetl = e.Result;
                    if (objResponse != null && objResponse.objAdministrationDetail != null && objResponse.objAdministrationDetail.oInfusionAdminDetail != null) {
                        let ostrikethrinfhistory: ObservableCollection<infstrikethroughVM.infStrikeChildDetails> = new ObservableCollection<infstrikethroughVM.infStrikeChildDetails>();
                        let objstrikethrinfhistory: infstrikethroughVM.infStrikeChildDetails;
                        let count: number = objResponse.objAdministrationDetail.oInfusionAdminDetail.Count;
                        for (let idx: number = 0; idx < count; idx++) {
                            objstrikethrinfhistory = new infstrikethroughVM.infStrikeChildDetails();
                            if (String.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, CnstSlotStatus.NOTGIVEN) || String.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, CnstSlotStatus.DEFERADMINISTRATION)) {
                                objstrikethrinfhistory.ActionCode = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, MedicationCommonConceptCodeData.MedAdminSlotStatus);
                            }
                            else {
                                objstrikethrinfhistory.ActionCode = CommonBB.GetText(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionCode, InfActionsConceptCodeData.ConceptCodes);
                            }
                            objstrikethrinfhistory.ActionDTTMValue = (DateTime.Equals(objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionStartDate, DateTime.MinValue)) ? String.Empty : objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].ActionStartDate.ConvertToUser(this.IsDST, this.IsAmbiguous, this.IsInvalid).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.LongDateWithoutSecs);
                            objstrikethrinfhistory.ActionByValue = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].RecordedBy;
                            objstrikethrinfhistory.CommentsValue = objResponse.objAdministrationDetail.oInfusionAdminDetail[idx].AdminComments;
                            ostrikethrinfhistory.Add(objstrikethrinfhistory);
                        }
                        if (this.strikethrinfhis != null) {
                            this.strikethrinfhis.OinfStrikeChildDetails = ostrikethrinfhistory;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        omedsadmin_Closed(args: AppDialogEventargs): void {
            if (this.Callbackpage)
                this.Callbackpage();
            (args.AppChildWindow as ChildWindow).DialogResult = true;
        }
        private _strikethrinfhis: infstrikethroughVM.strikethrinfhistory;
        public get strikethrinfhis(): infstrikethroughVM.strikethrinfhistory {
            return this._strikethrinfhis;
        }
        public set strikethrinfhis(value: infstrikethroughVM.strikethrinfhistory) {
            if (!ObjectHelper.ReferenceEquals(this._strikethrinfhis, value)) {
                this._strikethrinfhis = value;
               //NotifyPropertyChanged("strikethrinfhis");
            }
        }
        private ostrikethrinfhistory: ObservableCollection<infstrikethroughVM.strikethrinfhistory>;
        public get Ostrikethrinfhistory(): ObservableCollection<infstrikethroughVM.strikethrinfhistory> {
            return this.ostrikethrinfhistory;
        }
        public set Ostrikethrinfhistory(value: ObservableCollection<infstrikethroughVM.strikethrinfhistory>) {
            this.ostrikethrinfhistory = value;
           //NotifyPropertyChanged("Ostrikethrinfhistory");
        }
    }
    export module infstrikethroughVM {
        export class strikethrinfhistory extends ViewModelBase {
            public IsStrikeHistoryRowExpanded: boolean = false;
            private _MedAdminOID: number = 0;
            public get MedAdminOID(): number {
                return this._MedAdminOID;
            }
            public set MedAdminOID(value: number) {
                this._MedAdminOID = value;
            }
            private _MedAdminHistoryOID: number = 0;
            public get MedAdminHistoryOID(): number {
                return this._MedAdminHistoryOID;
            }
            public set MedAdminHistoryOID(value: number) {
                this._MedAdminHistoryOID = value;
            }
            private _MedinfusionOID: number = 0;
            public get MedinfusionOID(): number {
                return this._MedinfusionOID;
            }
            public set MedinfusionOID(value: number) {
                this._MedinfusionOID = value;
            }
            private _ActonCode: string;
            public get ActonCode(): string {
                return this._ActonCode;
            }
            public set ActonCode(value: string) {
                this._ActonCode = value;
            }
            private _RecordedAtValue: string;
            public get RecordedAtValue(): string {
                return this._RecordedAtValue;
            }
            public set RecordedAtValue(value: string) {
                this._RecordedAtValue = value;
            }
            private _RecordedByValue: string;
            public get RecordedByValue(): string {
                return this._RecordedByValue;
            }
            public set RecordedByValue(value: string) {
                this._RecordedByValue = value;
            }
            private _AdminreasonValue: string;
            public get AdminreasonValue(): string {
                return this._AdminreasonValue;
            }
            public set AdminreasonValue(value: string) {
                this._AdminreasonValue = value;
            }
            private oinfStrikeChildDetails: ObservableCollection<infStrikeChildDetails>;
            public get OinfStrikeChildDetails(): ObservableCollection<infStrikeChildDetails> {
                return this.oinfStrikeChildDetails;
            }
            public set OinfStrikeChildDetails(value: ObservableCollection<infStrikeChildDetails>) {
                if (this.oinfStrikeChildDetails != value) {
                    this.oinfStrikeChildDetails = value;
                   //NotifyPropertyChanged("OinfStrikeChildDetails");
                }
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
        }
    }
    export module infstrikethroughVM {
        export class infStrikeChildDetails extends ViewModelBase {
            private _CommentsValue: string;
            public get CommentsValue(): string {
                return this._CommentsValue;
            }
            public set CommentsValue(value: string) {
                this._CommentsValue = value;
               //NotifyPropertyChanged("CommentsValue");
            }
            private _MedAdminHistoryOID: number = 0;
            public get MedAdminHistoryOID(): number {
                return this._MedAdminHistoryOID;
            }
            public set MedAdminHistoryOID(value: number) {
                this._MedAdminHistoryOID = value;
               //NotifyPropertyChanged("MedAdminHistoryOID");
            }
            private _ActionCode: string;
            public get ActionCode(): string {
                return this._ActionCode;
            }
            public set ActionCode(value: string) {
                this._ActionCode = value;
               //NotifyPropertyChanged("ActionCode");
            }
            private _ActionDTTMValue: string;
            public get ActionDTTMValue(): string {
                return this._ActionDTTMValue;
            }
            public set ActionDTTMValue(value: string) {
                this._ActionDTTMValue = value;
               //NotifyPropertyChanged("ActionDTTMValue");
            }
            private _ActionByValue: string;
            public get ActionByValue(): string {
                return this._ActionByValue;
            }
            public set ActionByValue(value: string) {
                this._ActionByValue = value;
               //NotifyPropertyChanged("ActionedByValue");
            }
        }
    }