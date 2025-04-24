import { Component, OnInit,EventEmitter } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ProcessRTE} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, List, CListItem, RTEEventargs, HtmlPage } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from '../model/cloneviewmodel';
import { CValuesetCollection } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { CReqMsgGetItemMongraph, CResMsgGetItemMongraph, GetItemMongraphCompletedEventArgs, ManagePrescriptionWSSoapClient, MonographInfo } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedDrugInfoData } from 'src/app/lorappslprofiletypes/medication';

export class MonoGraphVM extends ClonableViewModelBase {
    private profile: ProfileFactoryType = new ProfileFactoryType();
    objMonographInfo: MonographInfo;
    objMonographContentInfo: Object[] = null;
    public monographservicedata:EventEmitter<any>=new EventEmitter();
    public static oCDomainValueCollection: ObservableCollection<CValuesetCollection>;
    private static CONST_MNGRF: string = "MNGRF";
    private _MonoGraophInfo: ObservableCollection<MonographInfo>;
    public get MonoGraophInfo(): ObservableCollection<MonographInfo> {
        return this._MonoGraophInfo;
    }
    public set MonoGraophInfo(value: ObservableCollection<MonographInfo>) {
        this._MonoGraophInfo = value;
       //NotifyPropertyChanged("MonoGraophInfo");
    }
    private _MonographParams: ObservableCollection<CListItem>;
    public get MonographParams(): ObservableCollection<CListItem> {
        return this._MonographParams;
    }
    public set MonographParams(value: ObservableCollection<CListItem>) {
        this._MonographParams = value;
       //NotifyPropertyChanged("MonographParams");
    }
    private _IdentifyingOid: number = 0;
    public get IdentifyingOid(): number {
        return this._IdentifyingOid;
    }
    public set IdentifyingOid(value: number) {
        this._IdentifyingOid = value;
       //NotifyPropertyChanged("IdentifyingOid");
    }
    private _IdentifyingType: string;
    public get IdentifyingType(): string {
        return this._IdentifyingType;
    }
    public set IdentifyingType(value: string) {
        this._IdentifyingType = value;
       //NotifyPropertyChanged("IdentifyingType");
    }
    private _IdentifyingName: string;
    public get IdentifyingName(): string {
        return this._IdentifyingName;
    }
    public set IdentifyingName(value: string) {
        this._IdentifyingName = value;
       //NotifyPropertyChanged("IdentifyingName");
    }
    private _ItemSubType: string;
    public get ItemSubType(): string {
        return this._ItemSubType;
    }
    public set ItemSubType(value: string) {
        this._ItemSubType = value;
       //NotifyPropertyChanged("ItemSubType");
    }
    private _isnextenable: boolean = false;
    public get Isnextenable(): boolean {
        return this._isnextenable;
    }
    public set Isnextenable(value: boolean) {
        this._isnextenable = value;
       //NotifyPropertyChanged("Isnextenable");
    }
    constructor() {
        super();
        this.profile.OnProfileLoaded = (s, e) => { this.profile_OnProfileLoaded(s, e); };
        this.profile.GetProfile<MedDrugInfoData>("VW_MEDICONFIG", "MEDDRUGINFO");
    }
    public GetMonoGraphList(objMonographInfo: MonographInfo, GrdCellValue: Object): void {
        if (objMonographInfo != null) {
            if (objMonographInfo.MonographContentOID != 0) {
                this.objMonographContentInfo = new Array(5);
                this.objMonographContentInfo[0] = objMonographInfo.MonographContentOID;
                this.objMonographContentInfo[1] = objMonographInfo.SourceType;
                this.objMonographContentInfo[2] = AppSessionInfo.AMCV;
                this.objMonographContentInfo[3] = GrdCellValue;
                this.objMonographContentInfo[4] = 0;
                let returnValue: Object = HtmlPage.Window.Invoke("LaunchLink", this.objMonographContentInfo[0],this.objMonographContentInfo[1],this.objMonographContentInfo[2],this.objMonographContentInfo[3],this.objMonographContentInfo[4]);
            }
            else if (String.Compare(objMonographInfo.Path, String.Empty) != 0) {
                this.SetLanchLink(objMonographInfo);
            }
            else {
                iMessageBox.Show("Lorenzo", "There is no monograph recorded for this item.", MessageBoxType.Information, MessageBoxButton.OK);
            }
        }
    }
    SetLanchLink(objMonographInfo: MonographInfo): void {
        if (objMonographInfo != null && MedicationCommonProfileData.MedDrugInfoData != null) {
            if (objMonographInfo.Path.StartsWith("www.", StringComparison.OrdinalIgnoreCase)) {
                objMonographInfo.Path = "http://" + objMonographInfo.Path;
            }
            let bMonographInfoPathIsURL: boolean = objMonographInfo.Path.StartsWith("http://", StringComparison.OrdinalIgnoreCase) || objMonographInfo.Path.StartsWith("https://", StringComparison.OrdinalIgnoreCase);
            if (!bMonographInfoPathIsURL) {

                let oMonoGraph = MedicationCommonProfileData.MedDrugInfoData.Links.Where(oGraph => String.Compare(oGraph.linktypevalue, objMonographInfo.Type, StringComparison.InvariantCultureIgnoreCase) == 0).Select(oGraph => oGraph);

                if (oMonoGraph.Count() > 0) {
                    oMonoGraph.forEach((oMono) => {
                        this.objMonographContentInfo = new Array(5);
                        this.objMonographContentInfo[0] = 0;
                        this.objMonographContentInfo[1] = objMonographInfo.SourceType;
                        this.objMonographContentInfo[2] = AppSessionInfo.AMCV;
                        this.objMonographContentInfo[3] = 0;
                        this.objMonographContentInfo[4] = oMono.URL + "/" + objMonographInfo.Path + oMono.URLsuffix;
                    });
                }
                else {
                    this.objMonographContentInfo = null;
                }
            }
            else {
                this.objMonographContentInfo = new Array(5);
                this.objMonographContentInfo[0] = 0;
                this.objMonographContentInfo[1] = objMonographInfo.SourceType;
                this.objMonographContentInfo[2] = AppSessionInfo.AMCV;
                this.objMonographContentInfo[3] = 0;
                this.objMonographContentInfo[4] = objMonographInfo.Path;
            }
            let url: string = this.objMonographContentInfo != null && this.objMonographContentInfo.length > 4 ? (Convert.ToString(this.objMonographContentInfo[4]) ?? String.Empty) : String.Empty;
            if (!String.IsNullOrEmpty(url) && !url.Trim().EndsWith("://")) {
                let returnValue: Object = HtmlPage.Window.Invoke("LaunchLink", this.objMonographContentInfo[0],this.objMonographContentInfo[1],this.objMonographContentInfo[2],this.objMonographContentInfo[3],this.objMonographContentInfo[4]);
            }
        }
    }
    profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
        if (Result == null)
            return
        if (Result.Profile instanceof MedDrugInfoData) {
            MedicationCommonProfileData.MedDrugInfoData = ObjectHelper.CreateType<MedDrugInfoData>(Result.Profile, MedDrugInfoData);
        }
    }
    public GetMonographDetails(IdentifyingOid: number, IdentifyingType: string, MCVersion: number): void {
        Busyindicator.SetStatusBusy("Links");
        let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objService.GetItemMongraphCompleted = (s, e) => { this.objService_GetItemMongraphCompleted(s, e); };
        let objRequest: CReqMsgGetItemMongraph = new CReqMsgGetItemMongraph();
        objRequest.oContextInformation = CommonBB.FillContext();
        objRequest.oDrugItemBasicDataBC = new ManagePrescSer.DrugItemBasicData();
        objRequest.oDrugItemBasicDataBC.IdentifyingOID = IdentifyingOid;
        objRequest.oDrugItemBasicDataBC.IdentifyingType = IdentifyingType;
        objRequest.oDrugItemBasicDataBC.MCVersionNo = MCVersion > 0 ? MCVersion.ToString() : AppSessionInfo.AMCV;
        objService.GetItemMongraphAsync(objRequest);
    }
    objService_GetItemMongraphCompleted(sender: Object, e: GetItemMongraphCompletedEventArgs): void {
        let _ErrorID: number = 80000016;
        let _ErrorSource: string = "lorappmedicationcommonbb.dll, Class:MonoGraphVM, Method:objService_GetItemMongraphCompleted()";
        let objResponse: CResMsgGetItemMongraph = e.Result;
        if (e.Error == null) {
            try {
                if (objResponse != null && objResponse.MonographInformation != null && objResponse.MonographInformation.Count > 0) {
                    this.MonoGraophInfo = objResponse.MonographInformation;
                    this.monographservicedata.emit(true);
                }
                else {
                    this.MonoGraophInfo = null;
                    this.monographservicedata.emit(true);
                }
                // not required as we implemented kendo pagination
                /*  if (this.MonoGraophInfo != null && this.MonoGraophInfo.Count > 50) {
                    this.Isnextenable = true;
                  }*/
            }
           catch(ex:any)  {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
        Busyindicator.SetStatusIdle("Links");
    }
    private GetDomainDetails(): void {
        ProcessRTE.GetValuesByDomainCode(MonoGraphVM.CONST_MNGRF, (s,e) => {this.OnRTEResult(s);});
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, MonoGraphVM.CONST_MNGRF, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (this.MonoGraophInfo != null && this.MonoGraophInfo.Count > 0) {
                this.MonoGraophInfo.forEach((monoInfo) => {

                    let oTerm = (<List<CListItem>> args.Result).Where(oCListItem => oCListItem.Value == monoInfo.Type).Select(oCListItem => oCListItem.DisplayText);

                    if (oTerm != null && oTerm.Count() > 0) {
                        monoInfo.Type = oTerm.ElementAt(0);
                    }
                });
            }
        }
    }
}
