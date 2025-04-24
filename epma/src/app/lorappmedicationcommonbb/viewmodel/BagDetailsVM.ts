import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison , AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, List } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CReqMsgGetAllBagDetails, CResMsgGetAllBagDetails, DrugHeader, GetAllBagDetailsCompletedEventArgs, InfusionBagDetail, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';    
import { InfusionTypeCode } from '../utilities/constants';
import { Environment } from '../../product/shared/models/Common';
import *as Application from 'src/app/lorappcommonbb/amshelper'
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { EventEmitter } from '@angular/core';

    export class BagDetailsVM extends ViewModelBase {
        private _InfBagDetails: ObservableCollection<InfusionBagDetail>;
        public get InfBagDetails(): ObservableCollection<InfusionBagDetail> {
            return this._InfBagDetails;
        }
        public set InfBagDetails(value: ObservableCollection<InfusionBagDetail>) {
            if (!Helper.ReferenceEquals(this._InfBagDetails, value)) {
                this._InfBagDetails = value;
               //NotifyPropertyChanged("InfBagDetails");
            }
        }
        lstInfBagDetails: List<InfusionBagDetail>;
        BagDetails: InfusionBagDetail;
        public getdata: EventEmitter<any> = new EventEmitter();
        public getdataChild: EventEmitter<any> = new EventEmitter();
        public InfustionType: string = String.Empty;
        public objDrugHeader: DrugHeader;
        public GetInfBagDetails(MedadminOid: number, MCVersion: string): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let objReq: CReqMsgGetAllBagDetails = new CReqMsgGetAllBagDetails();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.MedAdminOIDBC = MedadminOid;
            objReq.MCVersionNumberBC = MCVersion;
            if (objService != null) {
                objService.GetAllBagDetailsCompleted  = (s,e) => { this.objService_GetAllBagDetailsCompleted(s,e); } ;
                objService.GetAllBagDetailsAsync(objReq);
            }
        }
        objService_GetAllBagDetailsCompleted(sender: Object, e: GetAllBagDetailsCompletedEventArgs): void {
            let _ErrorID: number = 80000084;
            let _ErrorSource: string = "LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objService_GetAllBagDetailsCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetAllBagDetails = e.Result;
                    if (objResponse != null && objResponse.oInfusionBagDetail != null && objResponse.oInfusionBagDetail.Count > 0) {
                        this.InfBagDetails = objResponse.oInfusionBagDetail;
                        this.lstInfBagDetails = new List<InfusionBagDetail>(this.InfBagDetails);
                        let maxbagseq = this.lstInfBagDetails.Max(x => x.BagSequence);
                        for (let idx: number = 0; idx < objResponse.oInfusionBagDetail.Count; idx++) {
                            this.InfBagDetails[idx].BagVolume = this.ValidDecimal(objResponse.oInfusionBagDetail[idx].BagVolume);
                            if (objResponse.oInfusionBagDetail[idx].BagVolumeUOM != null && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].BagVolumeUOM.UOMName)) {
                                this.InfBagDetails[idx].BagVolume = this.InfBagDetails[idx].BagVolume + " " + objResponse.oInfusionBagDetail[idx].BagVolumeUOM.UOMName;
                            }
                            this.InfBagDetails[idx].BatchNumber = objResponse.oInfusionBagDetail[idx].BatchNumber;
                            this.InfBagDetails[idx].ExpiryDate = objResponse.oInfusionBagDetail[idx].ExpiryDate;
                            this.InfBagDetails[idx].AdminStartTime = objResponse.oInfusionBagDetail[idx].AdminStartTime;
                            this.InfBagDetails[idx].AdminEndTime = objResponse.oInfusionBagDetail[idx].AdminEndTime;
                            this.InfBagDetails[idx].AdministeredBy.Name = objResponse.oInfusionBagDetail[idx].AdministeredBy.Name;
                            if (!(String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].WitnessedBy.Name))) {
                                this.InfBagDetails[idx].AdministeredBy.Name = objResponse.oInfusionBagDetail[idx].AdministeredBy.Name + Environment.NewLine + "Witnessed by: " + objResponse.oInfusionBagDetail[idx].WitnessedBy.Name;
                            }
                            if (objResponse.oInfusionBagDetail[idx].BagSequence == maxbagseq.BagSequence && DateTime.Equals(objResponse.oInfusionBagDetail[idx].AdminEndTime, DateTime.MinValue )) { //&& objResponse.oInfusionBagDetail[idx].AdminEndTime == DateTime.MinValue
                                this.InfBagDetails[idx].InfusedVolume = "In progress";
                            }
                            else {
                                if (!String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].InfusedVolume) && objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM != null && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM.UOMName)) {
                                    this.InfBagDetails[idx].InfusedVolume = String.Format("{0} {1}", Number.Parse(objResponse.oInfusionBagDetail[idx].InfusedVolume), objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM.UOMName);
                                }
                                if (String.Compare(this.InfustionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].Wastage) && objResponse.oInfusionBagDetail[idx].WastageUOM != null && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].WastageUOM.UOMName)) {
                                    this.InfBagDetails[idx].InfusedVolume =  this.InfBagDetails[idx].InfusedVolume +"\n" + "Wastage:" + " " + objResponse.oInfusionBagDetail[idx].Wastage + " " + objResponse.oInfusionBagDetail[idx].WastageUOM.UOMName;
                                }
                            }
                        }
                    }
                    this.getdata.emit(true);
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public ValidDecimal(sValue: string): string {
            let fParValue: number = 0;
            if (!String.IsNullOrEmpty(sValue) && sValue.IndexOf(".") != -1 && Double.TryParse(sValue, (o) => fParValue = o) && fParValue > 0) {
                return Convert.ToString(fParValue);
            }
            return sValue;
        }
    }
