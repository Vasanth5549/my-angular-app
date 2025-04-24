import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, CListItem, ObservableCollection, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, iComboBox } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CReqMsgGetFavouritesParentGroup, CReqMsgGetFormularyList, CResMsgGetFavouritesParentGroup, CResMsgGetFormularyList, GetFavouritesParentGroupCompletedEventArgs, GetFormularyListCompletedEventArgs, MedicationMgmtWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationMgmtWS';
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Common } from './common';
import { Int16 } from 'src/app/shared/epma-platform/models/eppma-common-types';
import * as Application from 'src/app/lorappcommonbb/amshelper';
  
    export class favourites {
        static sMCVersion: string;
        static nUserOID: number;
        static bPGDA: boolean;
        static CAFlag: boolean;
        static cboQuickLinkcombo: iComboBox;
        static lstItem: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        private static GetFavourites(sMedVersion: string, UserOID: number, objGetFavouritesParentGroupCompleted: Function): void {
            let objService: MedicationMgmtWSSoapClient = new MedicationMgmtWSSoapClient();
            if (objGetFavouritesParentGroupCompleted != null)
                objService.GetFavouritesParentGroupCompleted = (s,e) => { objGetFavouritesParentGroupCompleted(s,e); };
            let oReqMsgGetFavouritesParentGroup: CReqMsgGetFavouritesParentGroup = new CReqMsgGetFavouritesParentGroup();
            oReqMsgGetFavouritesParentGroup.UserOIdBC = UserOID;
            oReqMsgGetFavouritesParentGroup.sMCVerNoBC = sMedVersion;
            oReqMsgGetFavouritesParentGroup.oContextInformation = Common.FillContext();
            objService.GetFavouritesParentGroupAsync(oReqMsgGetFavouritesParentGroup);
        }
        public static objCommonMedicines_GetFavouritesParentGroupCompleted(sender: Object, e: GetFavouritesParentGroupCompletedEventArgs): void {
            let oResMsgGetFavouritesParentGroup: CResMsgGetFavouritesParentGroup;
            if (e.Error == null) {
                oResMsgGetFavouritesParentGroup = e.Result;
                favourites.lstItem.Add(ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: "Common medicines ",
                    Value: String.Empty,
                    Level: 0
                }));
                favourites.GetFavouritesInfo(oResMsgGetFavouritesParentGroup);
            }
            if (favourites.CAFlag) {
                favourites.nUserOID = ContextInfo.UserOID;
                favourites.GetFavourites(favourites.sMCVersion, favourites.nUserOID , (s,e) => { favourites.objFavourites_GetFavouritesParentGroupCompleted(s,e); } );
            }
            else {
                favourites.GetFormulary();
            }
            favourites.cboQuickLinkcombo.ItemsSource = favourites.lstItem;
        }
        private static GetFavouritesInfo(oResMsgGetFavouritesParentGroup: CResMsgGetFavouritesParentGroup): void {
            let nResponseCount: number;
            if (oResMsgGetFavouritesParentGroup != null) {
                if (oResMsgGetFavouritesParentGroup != null && oResMsgGetFavouritesParentGroup.oArrFavouriteItem != null) {
                    nResponseCount = oResMsgGetFavouritesParentGroup.oArrFavouriteItem.Count;
                    for (let nIndex: number = 0; nIndex < nResponseCount; nIndex++) {
                        if (oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].MCVersion != null && oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].MCVersion.Length > 0 && String.Compare(oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].MCVersion, favourites.sMCVersion, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (String.Compare(oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].OperationMode, "CC_MED_ACTIVE", StringComparison.CurrentCultureIgnoreCase) == 0) {
                                favourites.lstItem.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].Name,
                                    Value: "C" + "^" + oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex].FavouriteItemID.ToString() + "^" + favourites.nUserOID.ToString(),
                                    Level: 1
                                }));
                            }
                        }
                    }
                }
            }
        }
        static objFavourites_GetFavouritesParentGroupCompleted(sender: Object, e: GetFavouritesParentGroupCompletedEventArgs): void {
            let oResMsgGetFavouritesParentGroup: CResMsgGetFavouritesParentGroup;
            oResMsgGetFavouritesParentGroup = e.Result;
            favourites.lstItem.Add(ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: "My favourites",
                Value: String.Empty,
                Level: 0
            }));
            favourites.GetFavouritesInfo(oResMsgGetFavouritesParentGroup);
            if (!favourites.bPGDA && favourites.CAFlag) {
                favourites.GetFormulary();
            }
        }
        private static GetFormulary(): void {
            let objServiceProxy: MedicationMgmtWSSoapClient = new MedicationMgmtWSSoapClient();
            objServiceProxy.GetFormularyListCompleted  = (s,e) => { favourites.objServiceProxy_GetFormularyListCompleted(s,e); } ;
            let objReqFormularyList: CReqMsgGetFormularyList = new CReqMsgGetFormularyList();
            objReqFormularyList.sMCVersionBC = favourites.sMCVersion;
            objReqFormularyList.PageLengthBC = Int16.MaxValue;
            objReqFormularyList.lnStartRowBC = 1;
            objReqFormularyList.lnEndRowBC = Int16.MaxValue;
            objReqFormularyList.oContextInformation = Common.FillContext();
            objServiceProxy.GetFormularyListAsync(objReqFormularyList);
        }
        static objServiceProxy_GetFormularyListCompleted(sender: Object, e: GetFormularyListCompletedEventArgs): void {
            let _ErrorID: number = 80000067;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Favourites, Method:objServiceProxy_GetFormularyListCompleted()";
            let objResFormularyList: CResMsgGetFormularyList;
            objResFormularyList = e.Result;
            favourites.lstItem.Add(ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: "Formularies",
                Value: String.Empty,
                Level: 0
            }));
            if (e.Error == null) {
                try {
                    if (objResFormularyList != null && objResFormularyList.oFormularyGroup != null && objResFormularyList.oFormularyGroup.Count != 0) {
                        for (let i: number = 0; i < objResFormularyList.oFormularyGroup.Count; i++) {
                            if (String.Compare(objResFormularyList.oFormularyGroup[i].MedCatVersion, favourites.sMCVersion, StringComparison.CurrentCulture) == 0 && String.Compare(objResFormularyList.oFormularyGroup[i].Status, "CC_MED_ACTIVE", StringComparison.CurrentCulture) == 0) {
                                favourites.lstItem.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objResFormularyList.oFormularyGroup[i].Name,
                                    Value: "F" + "^" + objResFormularyList.oFormularyGroup[i].FormularyID.ToString(),
                                    Level: 1
                                }));
                            }
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
    }