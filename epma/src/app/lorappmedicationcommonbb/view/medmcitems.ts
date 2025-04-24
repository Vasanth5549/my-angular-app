import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, CommonBB, AMSHelper } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ObservableCollection, AppSessionInfo } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';

import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
// import { CReqMsgGetMCpresitem, CResMsgGetMCpresitem, GetMCpresitemCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Grid, GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ObjectHelper as Helper } from 'epma-platform/helper';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'medmcitems',
    templateUrl: './medmcitems.html'
})

export class medMCItems extends iAppDialogWindow {
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    grdDetails: GridExtension =new GridExtension();
    @ViewChild("grdDetailsTempRef", { read: GridComponent, static: false }) set _grdDetails(c: GridComponent) {
        if (c) {
             this.grdDetails.grid = c; 
             this.grdDetails.columns = c.columns;
             //this.grdDetails.ItemsSourceData = c.data;
            }
    };
    nLocalMedCharOID: number = 0;
    sMCItemName: string;
    oVM: MciItemVM = new MciItemVM();
    public GridIns = { gridData: [], selectedRowsIndex: [] }; 
    
    public gridHeight;
    ngAfterViewInit(): void {
    this.ChildWindow_Loaded (null,null);
        if (window.innerHeight < 400) {
            this.gridHeight = 208;
        }
        else {
            this.gridHeight = 307;
        }
    }

    constructor()
    {
        super();
        this.MCItemsInitializeComponent();       
    }
    constructorimpl(nMedCharOId?: number, sItemName?: string, sMcversion?: string) {        
        this.MCItemsInitializeComponent();
        this.nLocalMedCharOID = nMedCharOId;
        this.sMCItemName = sItemName;
        //Revisit required for else if, added newly
        if (String.IsNullOrEmpty(AppSessionInfo.AMCV) && sMcversion) {
            AppSessionInfo.AMCV = sMcversion;
        }
        else if (ContextManager.Instance["AMCV"] != null && !String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString())) {
            AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
        }        
    } 
    public MCItemsInitializeComponent(): void {
        // InitializeComponent();
        this.DataContext = this.oVM;
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.nLocalMedCharOID > 0) {
            //this.grdDetails.Columns[0].Header = this.sMCItemName;
            let serviceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let oReqMCItems: IPPManagePrescSer.CReqMsgGetMCpresitem = new IPPManagePrescSer.CReqMsgGetMCpresitem();
            oReqMCItems.PrescriptionItemOIDBC = this.nLocalMedCharOID;
            oReqMCItems.MCVersionBC = AppSessionInfo.AMCV;
            oReqMCItems.oContextInformation = CommonBB.FillContext();
            serviceProxy.GetMCpresitemCompleted = (s, e) => { this.serviceProxy_GetMCpresitemCompleted(s, e); };
            serviceProxy.GetMCpresitemAsync(oReqMCItems);
        }
    }
    serviceProxy_GetMCpresitemCompleted(sender: Object, e: IPPManagePrescSer.GetMCpresitemCompletedEventArgs): void {
        let _ErrorID: number = 80000051;
        let sMCItem: string = String.Empty;
        let sVMVPMCIdentifyingName: string = String.Empty;
        let _ErrorSource: string = "LorAppManagePrescriptionBBUi.dll, Class:Multicomponent, Method:serviceProxy_GetMCpresitemCompleted()";
        if (e.Error == null) {
            try {
                let oRes: IPPManagePrescSer.CResMsgGetMCpresitem = e.Result;
                if (oRes != null && oRes.objIPPMCPresctiptionItem != null && oRes.objIPPMCPresctiptionItem.Count > 0) {
                    let nCount: number = oRes.objIPPMCPresctiptionItem.Count;
                    this.oVM.oMciItem = new ObservableCollection<string>();
                    for (let i: number = 0; i < nCount; i++) {
                        if (!String.IsNullOrEmpty(oRes.objIPPMCPresctiptionItem[i].VMVPLorenzoID) && !String.IsNullOrEmpty(oRes.objIPPMCPresctiptionItem[i].VMVPMCIdentifyingName)) {
                            sVMVPMCIdentifyingName = oRes.objIPPMCPresctiptionItem[i].VMVPMCIdentifyingName + " - ";
                        }
                        else {
                            sVMVPMCIdentifyingName = String.Empty;
                        }
                        if (!String.IsNullOrEmpty(sVMVPMCIdentifyingName) && oRes.objIPPMCPresctiptionItem[i].IsUpto) {
                            this.oVM.oMciItem.Add(sVMVPMCIdentifyingName + oRes.objIPPMCPresctiptionItem[i].ComponentName + " up to " + oRes.objIPPMCPresctiptionItem[i].Quantity + " " + oRes.objIPPMCPresctiptionItem[i].QuantityUOM);
                        }
                        else if (!String.IsNullOrEmpty(sVMVPMCIdentifyingName)) {
                            this.oVM.oMciItem.Add(sVMVPMCIdentifyingName + oRes.objIPPMCPresctiptionItem[i].ComponentName + " " + oRes.objIPPMCPresctiptionItem[i].Quantity + " " + oRes.objIPPMCPresctiptionItem[i].QuantityUOM);
                        }
                        else if ((!String.IsNullOrEmpty(oRes.objIPPMCPresctiptionItem[i].ComponentName) && oRes.objIPPMCPresctiptionItem[i].IsUpto)) {
                            this.oVM.oMciItem.Add(oRes.objIPPMCPresctiptionItem[i].ComponentName + " up to " + oRes.objIPPMCPresctiptionItem[i].Quantity + " " + oRes.objIPPMCPresctiptionItem[i].QuantityUOM);
                        }
                        else {
                            this.oVM.oMciItem.Add(oRes.objIPPMCPresctiptionItem[i].ComponentName + " " + oRes.objIPPMCPresctiptionItem[i].Quantity + " " + oRes.objIPPMCPresctiptionItem[i].QuantityUOM);
                        }
                    }
                    this.grdDetails.ItemsSource = this.oVM.oMciItem;
                }
            }
            catch (ex: any) {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }
        }
        else {
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
}
export class MciItemVM extends ViewModelBase {
    private _oMciItem: ObservableCollection<string>;
    public get oMciItem(): ObservableCollection<string> {
        return this._oMciItem;
    }
    public set oMciItem(value: ObservableCollection<string>) {
        if (!Helper.ReferenceEquals(this._oMciItem, value)) {
            this._oMciItem = value;            
            //NotifyPropertyChanged("oMciItem");
        }
    }
}