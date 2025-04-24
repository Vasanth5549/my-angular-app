import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CReqMsgGetIngredientAdminstrationCount, CResMsgGetIngredientAdminstrationCount, GetIngredientAdminstrationCountCompletedEventArgs, IngredientAdminParams, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { Common } from '../utilities/common';
import { MedChartData } from '../utilities/globalvariable';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CIngredientLorenzoID } from '../utilities/CConstants';

    export class CumulativeAdministration {
       // public delegate void RefreshCumulativeWarning(int ParacetamolAdminCount);
        //public delegate void WarningChange(int ? OldParacetamolAdminCount, int ? NewParacetamolAdminCount);
        public RefreshCumulativeWarningEvent: Function;
        public WarningChangeEvent: Function;
        private _paracetamolAdministeredCount: number=0;
        public get ParacetamolAdministeredCount(): number {
            return this._paracetamolAdministeredCount;
        }
        public set ParacetamolAdministeredCount(value: number) {
            if (this._paracetamolAdministeredCount != value) {
                let nOldValue: number = this._paracetamolAdministeredCount;
                let nNewValue: number = value;
                let bIsRefreshRequired: boolean = nOldValue.HasValue ? ((nOldValue <= 3 && nNewValue >= 4) || (nNewValue <= 3 && nOldValue >= 4)) : false;
                this._paracetamolAdministeredCount = nNewValue;
                if (bIsRefreshRequired && this.RefreshCumulativeWarningEvent != null)
                    this.RefreshCumulativeWarningEvent(this._paracetamolAdministeredCount.Value);
                if (this.WarningChangeEvent != null)
                    this.WarningChangeEvent(nOldValue, nNewValue);
            }
        }

        public GetCumulativeParacetamol(): void {
            let oReq: CReqMsgGetIngredientAdminstrationCount = new CReqMsgGetIngredientAdminstrationCount();
            oReq.oContextInformation = Common.FillContext();
            oReq.IngAdminParamsBC = ObjectHelper.CreateObject(new IngredientAdminParams(), {
                MedChartOID: MedChartData.MedChartOID,
                PatientOID: PatientContext.PatientOID,
                IngredientLorenzoID: CIngredientLorenzoID.Paracetamol,
                DuenessWindowTimeMinutes: MedChartData.DuenessThreshold
            });
            let serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            serviceProxy.GetIngredientAdminstrationCountCompleted  = (s,e) => { this.serviceProxy_GetIngredientAdminstrationCountCompleted(s,e); } ;
            serviceProxy.GetIngredientAdminstrationCountAsync(oReq);
        }
        serviceProxy_GetIngredientAdminstrationCountCompleted(sender: Object, e: GetIngredientAdminstrationCountCompletedEventArgs): void {
            if (e.Error != null)
                return
            let oRes: CResMsgGetIngredientAdminstrationCount = e.Result;
            if (oRes != null && (oRes.oContextInformation.Errors == null || oRes.oContextInformation.Errors.Count == 0)) {
                this.ParacetamolAdministeredCount = oRes.IngredientAdminCount;
            }
        }
    }
