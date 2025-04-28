import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  CListItem,
  ObservableCollection,
  List,
  HtmlPage,
} from 'epma-platform/models';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { Resource } from '../resource';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as MedicationMgmtSer from '../../shared/epma-platform/soap-client/MedicationMgmtWS';
import {
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Dictionary } from 'epma-platform/dictionary';
import { QueryStringInfo } from '../utilities/globalvariable';
import { ProfileData } from '../utilities/profiledata';
import { IPPMABaseVM } from './ippmabasevm';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { Common } from '../utilities/common';
import { MedBrandConstraintsVM } from './medbrandconstraintsvm';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { LookAheadItem } from '../model/common';
import { Int16 } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { iPowerSearch } from 'epma-platform/controls';
import {
  PSImageItem,
  PSLineItem,
  PSStyleItem,
} from 'src/app/shared/epma-platform/controls/iPowerSearch';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

export class MedQuickSelectVM extends ViewModelBase {
  oippmabasevm: IPPMABaseVM;
  constructor();
  constructor(ovm?: IPPMABaseVM);
  constructor(ovm?: IPPMABaseVM) {
    super();
    switch (arguments.length) {
      case 1:
        this.oippmabasevm = ovm;
        break;
    }
  }
  // obrandconstraintsChild: medbrandconstraintschild; //Not Required for LHS. To be Re-Visited.
  private lstLineItem: ObservableCollection<PSLineItem> =
    new ObservableCollection<PSLineItem>();
  private alsFavourites: List<MedicationMgmtSer.FavouriteItem> =
    new List<MedicationMgmtSer.FavouriteItem>();
  private oResMsgGetFavouritesParentGroup: MedicationMgmtSer.CResMsgGetFavouritesParentGroup;
  public oAString: ManagePrescSer.ArrayOfString;
  valueCollection: Dictionary<string, List<string>>;
  BrandFlagForDrug: string = '0';
  itmTypPrmScr: List<string> = new List<string>();
  public issearchtriggred: boolean = false;
  public oDrugADMCItemBasicData: IPPMAManagePrescSer.DrugItemBasicData;
  oVM: IPPMABaseVM;
  public GetFavouritesInfoCompleted = new EventEmitter();
  public get LstLineItem(): ObservableCollection<PSLineItem> {
    return this.lstLineItem;
  }
  public set LstLineItem(value: ObservableCollection<PSLineItem>) {
    if (this.lstLineItem != value) {
      this.lstLineItem = value;
      //NotifyPropertyChanged("LstLineItem");
    }
  }
  private lstStyleItem: ObservableCollection<PSStyleItem>;
  public get LstStyleItem(): ObservableCollection<PSStyleItem> {
    return this.lstStyleItem;
  }
  public set LstStyleItem(value: ObservableCollection<PSStyleItem>) {
    if (this.lstStyleItem != value) {
      this.lstStyleItem = value;
      //NotifyPropertyChanged("LstStyleItem");
    }
  }
  private lstImageItem: ObservableCollection<PSImageItem>;
  public get LstImageItem(): ObservableCollection<PSImageItem> {
    return this.lstImageItem;
  }
  public set LstImageItem(value: ObservableCollection<PSImageItem>) {
    if (this.lstImageItem != value) {
      this.lstImageItem = value;
      //NotifyPropertyChanged("LstImageItem");
    }
  }
  private sMCVersion: string;
  public get SMCVersion(): string {
    return this.sMCVersion;
  }
  public set SMCVersion(value: string) {
    this.sMCVersion = value;
  }
  private nUserOID: number = 0;
  public get NUserOID(): number {
    return this.nUserOID;
  }
  public set NUserOID(value: number) {
    this.nUserOID = value;
  }
  private sFolderLorenzoID: string;
  public get SFolderLorenzoID(): string {
    return this.sFolderLorenzoID;
  }
  public set SFolderLorenzoID(value: string) {
    this.sFolderLorenzoID = value;
  }
  private sDefaultFolderLorenzoID: string;
  public get SDefaultFolderLorenzoID(): string {
    return this.sDefaultFolderLorenzoID;
  }
  public set SDefaultFolderLorenzoID(value: string) {
    this.sDefaultFolderLorenzoID = value;
  }
  private sCommonFolderLorenzoID: string;
  public get SCommonFolderLorenzoID(): string {
    return this.sCommonFolderLorenzoID;
  }
  public set SCommonFolderLorenzoID(value: string) {
    this.sCommonFolderLorenzoID = value;
  }
  private sFolderName: string;
  public get SFolderName(): string {
    return this.sFolderName;
  }
  public set SFolderName(value: string) {
    this.sFolderName = value;
  }
  private sCDCFolderLorenzoID: string;
  public get SCDCFolderLorenzoID(): string {
    return this.sCDCFolderLorenzoID;
  }
  public set SCDCFolderLorenzoID(value: string) {
    this.sCDCFolderLorenzoID = value;
  }
  private sCDCFolderName: string;
  public get SCDCFolderName(): string {
    return this.sCDCFolderName;
  }
  public set SCDCFolderName(value: string) {
    this.sCDCFolderName = value;
  }
  private bPGDA: boolean = false;
  public get BPGDA(): boolean {
    return this.bPGDA;
  }
  public set BPGDA(value: boolean) {
    this.bPGDA = value;
  }
  public LoadUserFavourites: boolean = false;
  public LoadFavourites: boolean = false;
  public LoadFormularies: boolean = false;
  private bCAFlag: boolean = false;
  public get CAFlag(): boolean {
    return this.bCAFlag;
  }
  public set CAFlag(value: boolean) {
    this.bCAFlag = value;
  }
  private lstItem: ObservableCollection<CListItem> =
    new ObservableCollection<CListItem>();
  private qLComboLastSelection: CListItem;
  public get QLComboLastSelection(): CListItem {
    return this.qLComboLastSelection;
  }
  public set QLComboLastSelection(value: CListItem) {
    if (this.qLComboLastSelection != value) {
      this.qLComboLastSelection = value;
      //NotifyPropertyChanged("QLComboLastSelection");
    }
  }
  private qLCombo: CListItem;
  public get QLCombo(): CListItem {
    return this.qLCombo;
  }
  public set QLCombo(value: CListItem) {
    if (this.qLCombo != value) {
      this.qLCombo = value;
      //NotifyPropertyChanged("QLCombo");
    }
  }
  private _TeamOIDs: string;
  public get TeamOIDs(): string {
    return this._TeamOIDs;
  }
  public set TeamOIDs(value: string) {
    if (this._TeamOIDs != value) {
      this._TeamOIDs = value;
      //NotifyPropertyChanged("TeamOIDs");
    }
  }
  public get LstItem(): ObservableCollection<CListItem> {
    return this.lstItem;
  }
  public set LstItem(value: ObservableCollection<CListItem>) {
    if (this.lstItem != value) {
      this.lstItem = value;
      //NotifyPropertyChanged("LstItem");
    }
  }
  public DrugSelect(sText: string, sValue: string): void {
    let sItemColl: string[] = sValue.Split('~');
    let objLookAheadItem: LookAheadItem = new LookAheadItem();
    objLookAheadItem.OID = Convert.ToInt64(sItemColl[0]);
    objLookAheadItem.IsBrandOnly = Convert.ToInt16(sItemColl[3]);
    objLookAheadItem.Type = sItemColl[1];
    objLookAheadItem.DrugType = sItemColl[5];
    objLookAheadItem.SourceDataProviderType = sItemColl[4];
    objLookAheadItem.IsFormulary = sItemColl[7];
    objLookAheadItem.FormularyNotes = sItemColl[6];
    objLookAheadItem.LorenzoID = sItemColl[8];
    if (
      String.Equals(
        objLookAheadItem.Type,
        CConstants.CATALOGUEITEM,
        StringComparison.CurrentCultureIgnoreCase
      ) ||
      String.Equals(
        objLookAheadItem.Type,
        CConstants.VIRTUALPRODUCT,
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (objLookAheadItem.IsBrandOnly == 1) {
        //Not Required for LHS. To be Re-Visited.
        /*
                this.obrandconstraintsChild = new medbrandconstraintschild(this.oippmabasevm);
                let oMedBrandConstVM: MedBrandConstraintsVM = new MedBrandConstraintsVM(this.oippmabasevm);
                oMedBrandConstVM.DrugName = sText;
                oMedBrandConstVM.DrugOID = objLookAheadItem.OID;
                oMedBrandConstVM.DrugType = objLookAheadItem.Type;
                this.obrandconstraintsChild.DataContext = oMedBrandConstVM;
                AppActivity.OpenWindow(oMedBrandConstVM.DrugName, this.obrandconstraintsChild, (s,e) => {this.medbrandconst_Closed(s);}, oMedBrandConstVM.DrugName, true, 420, 650, true, WindowButtonType.Close, null);
                */
      }
    }
  }
  //Not Required for LHS. To be Re-Visited.
  /*
    private medbrandconst_Closed(args: AppDialogEventargs): void {
        this.obrandconstraintsChild.appDialog.DialogResult = true;
    }
    */
  public CheckSpecialCharacter(
    sSearchText: string,
    out1: (returnText: string) => void
  ): boolean {
    let returnText: string;
    let sChars: string = '%/*';
    returnText = sSearchText;
    let nSrchTxt: number = sSearchText.length;
    for (let i: number = 0; i < nSrchTxt; i++) {
      if (sChars.IndexOf(sSearchText[i]) != -1) {
        returnText = sSearchText.Replace(sSearchText[i], String.MinValue);
        return false;
      }
    }
    out1(returnText);
    return true;
  }
  public PopulateQuickLinksCombo(): void {
    this.NUserOID = 0;
    if (this.LoadFavourites) {
      this.GetFavourites(this.SMCVersion, this.NUserOID, (s, e) => {
        this.objCommonMedicines_GetFavouritesParentGroupCompleted(s, e);
      });
    } else if (!this.CAFlag && this.LoadFormularies) this.GetFormulary();
  }
  public GetProfileConfigData(SearchCriteria: string): void {
    let criteria: string = String.Empty;
    this.oAString = new ManagePrescSer.ArrayOfString();
    switch (SearchCriteria) {
      case 'REQUEST_SET_CARE_SET':
        criteria = 'CC_REQCARESET';
        break;
      case 'PROBLEM':
        criteria = 'CC_MEDPLM';
        break;
      case 'HIERARCHY':
        criteria = 'CC_SUBDP_HRCY';
        break;
      case 'DRUG_NAME':
        criteria = 'CC_DRUGNAME';
        break;
    }
    if (
      ProfileData.MedSearchConfig != null &&
      ProfileData.MedSearchConfig.PowerSearchConfig != null &&
      ProfileData.MedSearchConfig.PowerSearchConfig.Count > 0
    ) {
      let tstData: StringBuilder = new StringBuilder();
      this.valueCollection = new Dictionary<string, List<string>>();
      let collection: List<string>;
      let sPriResultList: string;
      let sbPriResultList: StringBuilder = new StringBuilder();
      let myData: string[];
      let nCount: number = ProfileData.MedSearchConfig.PowerSearchConfig.Count;
      for (let i: number = 0; i < nCount; i++) {
        tstData.Clear();
        if (
          String.Compare(
            ProfileData.MedSearchConfig.PowerSearchConfig[
              i
            ].SearchOptionValue.ToUpper(),
            criteria,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        ) {
          collection = new List<string>();
          this.itmTypPrmScr.Add(
            ProfileData.MedSearchConfig.PowerSearchConfig[
              i
            ].ItemTypeValue.ToUpper()
          );
          if (
            String.Compare(
              ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue,
              'CC_DRUG',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                ProfileData.MedSearchConfig.PowerSearchConfig[i]
                  .ShowPrescribebybrandoptions,
                'Yes',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            )
              this.BrandFlagForDrug = '1';
          }
          sPriResultList =
            ProfileData.MedSearchConfig.PowerSearchConfig[
              i
            ].PrimaryResultList.ToUpper();
          sPriResultList = sPriResultList.Replace(' ', String.Empty);
          sPriResultList = sPriResultList.Replace(
            'VIRTUALMOIETY',
            'CATALOGUEITEM'
          );
          myData = sPriResultList.Split(',');
          collection.Clear();
          sbPriResultList.Clear();
          for (let dnt: number = 0; dnt < myData.length; dnt++) {
            collection.Add(myData[dnt]);
            sbPriResultList.Append(myData[dnt]);
            sbPriResultList.Append('~');
          }
          if (
            !this.valueCollection.ContainsKey(
              ProfileData.MedSearchConfig.PowerSearchConfig[
                i
              ].ItemTypeValue.ToUpper()
            )
          ) {
            this.valueCollection.Add(
              ProfileData.MedSearchConfig.PowerSearchConfig[
                i
              ].ItemTypeValue.ToUpper(),
              collection
            );
            tstData.Append(
              ProfileData.MedSearchConfig.PowerSearchConfig[
                i
              ].ItemTypeValue.ToUpper()
            );
            tstData.Append('-');
            tstData.Append(sbPriResultList);
            this.oAString.Add(tstData.ToString());
          }
        }
      }
    }
  }
  public GetSearchType(sSearchType: string): ManagePrescSer.EnumSearchType {
    let ReturnValue: ManagePrescSer.EnumSearchType =
      ManagePrescSer.EnumSearchType.NONE;
    switch (sSearchType) {
      case 'CONTAINS':
        ReturnValue = ManagePrescSer.EnumSearchType.CONTAINS;
        break;
      case 'LEADING_WORD':
        ReturnValue = ManagePrescSer.EnumSearchType.LEADING_WORD;
        break;
      case 'FULLY_RESOLVED':
        ReturnValue = ManagePrescSer.EnumSearchType.FULLY_RESOLVED;
        break;
    }
    return ReturnValue;
  }
  public GetSearchCriteria(
    sSearchType: string
  ): ManagePrescSer.EnumSearchCriteria {
    let ReturnValue: ManagePrescSer.EnumSearchCriteria =
      ManagePrescSer.EnumSearchCriteria.DRUG;
    switch (sSearchType) {
      case 'DRUG_NAME':
        ReturnValue = ManagePrescSer.EnumSearchCriteria.DRUG;
        break;
      case 'HIERARCHY':
        ReturnValue = ManagePrescSer.EnumSearchCriteria.HIERARCHY;
        break;
      case 'PROBLEM':
        ReturnValue = ManagePrescSer.EnumSearchCriteria.PROBLEM;
        break;
      case 'REQUEST_SET_CARE_SET':
        ReturnValue = ManagePrescSer.EnumSearchCriteria.REQUESTSET_CARESET;
        break;
      case 'FAVOURITES':
        ReturnValue = ManagePrescSer.EnumSearchCriteria.FAVOURITES;
        break;
    }
    return ReturnValue;
  }
  private GetFavourites(
    sMedVersion: string,
    UserOID: number,
    objGetFavouritesParentGroupCompleted: Function
  ): void {
    let objService: MedicationMgmtSer.MedicationMgmtWSSoapClient =
      new MedicationMgmtSer.MedicationMgmtWSSoapClient();
    if (objGetFavouritesParentGroupCompleted != null)
      objService.GetFavouritesParentGroupCompleted = (s, e) => {
        objGetFavouritesParentGroupCompleted(s, e);
      };
    let oReqMsgGetFavouritesParentGroup: MedicationMgmtSer.CReqMsgGetFavouritesParentGroup =
      new MedicationMgmtSer.CReqMsgGetFavouritesParentGroup();
    oReqMsgGetFavouritesParentGroup.UserOIdBC = UserOID;
    oReqMsgGetFavouritesParentGroup.sMCVerNoBC = sMedVersion;
    oReqMsgGetFavouritesParentGroup.oContextInformation = Common.FillContext();
    objService.GetFavouritesParentGroupAsync(oReqMsgGetFavouritesParentGroup);
  }
  objCommonMedicines_GetFavouritesParentGroupCompleted(
    sender: Object,
    e: MedicationMgmtSer.GetFavouritesParentGroupCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000043;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickSelectVM, Method:objCommonMedicines_GetFavouritesParentGroupCompleted()';
    if (e.Error == null) {
      try {
        if (this.LstItem == null) {
          this.LstItem = new ObservableCollection<CListItem>();
        } else {
          let oCListItem: CListItem = null;
          if (this.QLCombo != null) {
            oCListItem = new CListItem();
            oCListItem.DisplayText = this.QLCombo.DisplayText;
            oCListItem.Value = this.QLCombo.Value;
            oCListItem.Level = this.QLCombo.Level;
          }
          this.QLComboLastSelection = oCListItem;
          this.LstItem.Clear();
        }
        this.oResMsgGetFavouritesParentGroup = e.Result;
        this.LstItem.Add(
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: 'Common medicines ',
            Value: String.Empty,
            Level: 0,
          })
        );
        if (
          this.oResMsgGetFavouritesParentGroup != null &&
          this.oResMsgGetFavouritesParentGroup.oArrFavouriteItem != null
        ) {
          this.alsFavourites.AddRange(
            this.oResMsgGetFavouritesParentGroup.oArrFavouriteItem
          );
          this.GetDefaultfolderID();
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      this.userfavourites();
    }
  }
  private userfavourites(): void {
    if (!this.CAFlag && this.LoadUserFavourites) {
      this.nUserOID = ContextInfo.UserOID;
      this.GetFavourites(this.sMCVersion, this.nUserOID, (s, e) => {
        this.objFavourites_GetFavouritesParentGroupCompleted(s, e);
      });
    } else if (!this.CAFlag && this.LoadFormularies) this.GetFormulary();
  }
  private GetDefaultfolderID(): void {
    this.CheckDefaultFolderInCombo(this.SFolderLorenzoID);
    if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
      this.GetUserTeamFolder();
    } else {
      this.GetFavouritesInfo(this.oResMsgGetFavouritesParentGroup, true);
      this.oResMsgGetFavouritesParentGroup = null;
      this.userfavourites();
    }
  }
  private GetUserTeamFolder(): void {
    let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    let oReqMsgGetFavouritesDefaultFolder: IPPMAManagePrescSer.CReqMsgGetIPPFavouritesDefaultFolder =
      new IPPMAManagePrescSer.CReqMsgGetIPPFavouritesDefaultFolder();
    let RoleProfileOID: string = String.Empty;
    let PatientAgeInDays: number = 0;
    let GestationalAgeInDays: number = 0;
    let GestationalAge: string = String.Empty;
    if (!String.IsNullOrEmpty(PatientContext.RoleProfileOID))
      RoleProfileOID = PatientContext.RoleProfileOID;
    let oReturn: Object = HtmlPage.Window.Invoke(
      'GetDataItemGestationalAge',
      null
    );
    if (oReturn != null) {
      let oReturnValues: string[];
      GestationalAge = oReturn.ToString();
      if (!String.IsNullOrEmpty(GestationalAge)) {
        oReturnValues = GestationalAge.Split(',');
        if (oReturnValues != null && oReturnValues.Count() > 6) {
          let GesWeekDays: string[] = oReturnValues[6].Split(' ');
          if (GesWeekDays != null && GesWeekDays.Count() > 3) {
            if (
              GesWeekDays[0] != null &&
              String.IsNullOrEmpty(GesWeekDays[0].ToString())
            ) {
              GestationalAgeInDays += Convert.ToInt32(GesWeekDays[0]) * 7;
            }
            if (
              GesWeekDays[2] != null &&
              String.IsNullOrEmpty(GesWeekDays[2].ToString())
            ) {
              GestationalAgeInDays += Convert.ToInt32(GesWeekDays[2]);
            }
          }
        }
      }
    }
    MedicationCommonBB.GetPatientAgeGenderDetails();
    if (
      !String.IsNullOrEmpty(PatientContext.DOB) &&
      DateTime.NotEquals(Convert.ToDateTime(PatientContext.DOB), DateTime.MinValue)
    ) {
      let CurrDate: DateTime = DateTime.Now.Date;
      PatientAgeInDays = CurrDate.Subtract(
        Convert.ToDateTime(PatientContext.DOB)
      ).TotalDays;
    }
    
    oReqMsgGetFavouritesDefaultFolder.PatientAgeInDaysBC = parseInt(PatientAgeInDays.toString());//<number>(PatientAgeInDays);

    oReqMsgGetFavouritesDefaultFolder.GastationAgeInDaysBC =
      GestationalAgeInDays;
    oReqMsgGetFavouritesDefaultFolder.TeamOIDsBC = RoleProfileOID;
    oReqMsgGetFavouritesDefaultFolder.oContextInformation =
      Common.FillContext();
    objService.GetIPPFavouritesDefaultFolderCompleted = (s, e) => {
      this.objService_GetIPPFavouritesDefaultFolderCompleted(s, e);
    };
    objService.GetIPPFavouritesDefaultFolderAsync(
      oReqMsgGetFavouritesDefaultFolder
    );
  }
  objService_GetIPPFavouritesDefaultFolderCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.GetIPPFavouritesDefaultFolderCompletedEventArgs
  ): void {
    if (e != null && e.Result != null) {
      let sDefUserFolder: string = e.Result.sDefUserFolder;
      let sDefTeamFolder: string = e.Result.sDefTeamFolder;
      let sDefPatientAgeFolder: string = e.Result.sDefPatientAgeFolder;
      this.CheckDefaultFolderInCombo(sDefPatientAgeFolder);
      if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
        this.CheckDefaultFolderInCombo(sDefUserFolder);
        if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
          this.CheckDefaultFolderInCombo(sDefTeamFolder);
          if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
            this.CheckDefaultFolderInCombo(sDefTeamFolder);
            if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
              this.CheckDefaultFolderInCombo(this.SCommonFolderLorenzoID);
            }
          }
        }
        if (
          !String.IsNullOrEmpty(QueryStringInfo.CDCFormCode) &&
          !String.IsNullOrEmpty(this.SCDCFolderLorenzoID)
        ) {
          this.CheckDefaultFolderInCombo(this.SCDCFolderLorenzoID);
        }
      }
    }
    if (String.IsNullOrEmpty(this.sDefaultFolderLorenzoID)) {
      let profile: ProfileFactoryType = new ProfileFactoryType();
      profile.OnProfileLoaded = (s, e) => {
        this.profile_OnProfileLoaded(s, e);
      };
      profile.GetProfile<PrescribingConfigData>(
        'VW_MEDICONFIG',
        'PRESCONFIG',
        ProfileFactoryType.Level.Enterprise
      );
    } else {
      this.GetFavouritesInfo(this.oResMsgGetFavouritesParentGroup, true);
      this.oResMsgGetFavouritesParentGroup = null;
      this.userfavourites();
    }
    Busyindicator.SetStatusIdle('SearchItem');
  }
  profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result != null) {
      if (
        Result.Profile != null &&
        Result.Profile instanceof PrescribingConfigData
      ) {
        let PrescribeConfig: PrescribingConfigData =
          ObjectHelper.CreateType<PrescribingConfigData>(
            Result.Profile,
            PrescribingConfigData
          );
        if (PrescribeConfig != null) {
          this.CheckDefaultFolderInCombo(PrescribeConfig.CommonFavoLorenzoID);
        }
      }
    }
    this.GetFavouritesInfo(this.oResMsgGetFavouritesParentGroup, true);
    this.oResMsgGetFavouritesParentGroup = null;
    this.userfavourites();
  }
  private CheckDefaultFolderInCombo(sFolderLorID: string): void {
    if (this.alsFavourites.Count > 0 && !String.IsNullOrEmpty(sFolderLorID)) {
      let FolderFolder = this.alsFavourites
        .Where((SingleFav) => SingleFav.LorenzoID == sFolderLorID)
        .Select((SingleFav) => SingleFav);

      if (FolderFolder != null && FolderFolder.Count() == 1) {
        this.sDefaultFolderLorenzoID = FolderFolder.ElementAt(0).LorenzoID;
      }
    }
  }
  private GetFavouritesInfo(
    oResMsgGetFavouritesParentGroup: MedicationMgmtSer.CResMsgGetFavouritesParentGroup,
    IsDefaultFolder: boolean
  ): void {
    let nResponseCount: number = 0;
    if (oResMsgGetFavouritesParentGroup != null) {
      if (
        String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory
      ) {
        this.TeamOIDs = String.Empty;
      } else {
        this.TeamOIDs = oResMsgGetFavouritesParentGroup.TeamOIDs;
      }
      if (oResMsgGetFavouritesParentGroup.oArrFavouriteItem != null) {
        nResponseCount =
          oResMsgGetFavouritesParentGroup.oArrFavouriteItem.Count;
        for (let nIndex: number = 0; nIndex < nResponseCount; nIndex++) {
          if (
            oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex] != null &&
            !String.IsNullOrEmpty(
              oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex]
                .MCVersion
            ) &&
            String.Compare(
              oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex]
                .MCVersion,
              this.SMCVersion,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex]
                  .OperationMode,
                'CC_MED_ACTIVE',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            ) {
              let lstItem: CListItem = ObjectHelper.CreateObject(
                new CListItem(),
                {
                  DisplayText:
                    oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex]
                      .Name,
                  Value:
                    'C' +
                    '^' +
                    oResMsgGetFavouritesParentGroup.oArrFavouriteItem[
                      nIndex
                    ].FavouriteItemID.ToString() +
                    '^' +
                    this.NUserOID.ToString(),
                  Level: 1,
                }
              );
              this.LstItem.Add(lstItem);
              if (IsDefaultFolder && !this.issearchtriggred) {
                let sFavLorenzoID: string =
                  oResMsgGetFavouritesParentGroup.oArrFavouriteItem[nIndex]
                    .LorenzoID;
                if (
                  !String.IsNullOrEmpty(this.sDefaultFolderLorenzoID) &&
                  !String.IsNullOrEmpty(sFavLorenzoID) &&
                  String.Compare(
                    this.sDefaultFolderLorenzoID,
                    sFavLorenzoID,
                    StringComparison.CurrentCulture
                  ) == 0
                ) {
                  this.QLCombo = lstItem;
                }
              }
            }
          }
        }
        this.GetFavouritesInfoCompleted.emit(this.QLCombo);
      }
    }
  }
  objFavourites_GetFavouritesParentGroupCompleted(
    sender: Object,
    e: MedicationMgmtSer.GetFavouritesParentGroupCompletedEventArgs
  ): void {
    let oResMsgGetFavouritesParentGroup: MedicationMgmtSer.CResMsgGetFavouritesParentGroup;
    oResMsgGetFavouritesParentGroup = e.Result;
    this.LstItem.Add(
      ObjectHelper.CreateObject(new CListItem(), {
        DisplayText: 'My favourites',
        Value: String.Empty,
        Level: 0,
      })
    );
    this.GetFavouritesInfo(oResMsgGetFavouritesParentGroup, false);
    if (!this.CAFlag && this.LoadFormularies) this.GetFormulary();
    Busyindicator.SetStatusIdle('SearchItem');
  }
  private GetFormulary(): void {
    let objServiceProxy: MedicationMgmtSer.MedicationMgmtWSSoapClient =
      new MedicationMgmtSer.MedicationMgmtWSSoapClient();
    objServiceProxy.GetFormularyListCompleted = (s, e) => {
      this.objServiceProxy_GetFormularyListCompleted(s, e);
    };
    let objReqFormularyList: MedicationMgmtSer.CReqMsgGetFormularyList =
      new MedicationMgmtSer.CReqMsgGetFormularyList();
    objReqFormularyList.sMCVersionBC = this.SMCVersion;
    objReqFormularyList.PageLengthBC = Int16.MaxValue;
    objReqFormularyList.lnStartRowBC = 1;
    objReqFormularyList.lnEndRowBC = Int16.MaxValue;
    objReqFormularyList.oContextInformation = Common.FillContext();
    objServiceProxy.GetFormularyListAsync(objReqFormularyList);
  }
  objServiceProxy_GetFormularyListCompleted(
    sender: Object,
    e: MedicationMgmtSer.GetFormularyListCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000044;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickSelectVM, Method:objServiceProxy_GetFormularyListCompleted()';
    let objResFormularyList: MedicationMgmtSer.CResMsgGetFormularyList = null;
    if (e.Result != null) objResFormularyList = e.Result;
    this.LstItem.Add(
      ObjectHelper.CreateObject(new CListItem(), {
        DisplayText: 'Formularies',
        Value: String.Empty,
        Level: 0,
      })
    );
    if (e.Error == null && e.Result != null) {
      try {
        if (
          objResFormularyList != null &&
          objResFormularyList.oFormularyGroup != null &&
          objResFormularyList.oFormularyGroup.Count != 0
        ) {
          let nFormCnt: number = objResFormularyList.oFormularyGroup.Count;
          for (let i: number = 0; i < nFormCnt; i++) {
            if (
              String.Compare(
                objResFormularyList.oFormularyGroup[i].MedCatVersion,
                this.SMCVersion,
                StringComparison.CurrentCulture
              ) == 0 &&
              String.Compare(
                objResFormularyList.oFormularyGroup[i].Status,
                'CC_MED_ACTIVE',
                StringComparison.CurrentCulture
              ) == 0
            ) {
              this.LstItem.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: objResFormularyList.oFormularyGroup[i].Name,
                  Value:
                    'F' +
                    '^' +
                    objResFormularyList.oFormularyGroup[
                      i
                    ].FormularyID.ToString(),
                  Level: 1,
                })
              );
            }
          }
        }
        if (this.LstItem != null && this.QLComboLastSelection != null) {
          let SelItem = this.LstItem.Where(
            (oSelItem) =>
              oSelItem.DisplayText == this.QLComboLastSelection.DisplayText &&
              oSelItem.Value == this.QLComboLastSelection.Value &&
              oSelItem.Level == this.QLComboLastSelection.Level
          ).Select((oSelItem) => oSelItem);

          if (SelItem != null && SelItem.Count() > 0) {
            this.QLCombo = SelItem.First();
          }
        }
        Busyindicator.SetStatusIdle('SearchItem');
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (PatientContext.IPPMADU_P2) {
      this.lstItem.Add(
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: Resource.Orderset.Quicklinkparentdisplay_Text,
          Value: String.Empty,
          Level: 0,
        })
      );
      this.lstItem.Add(
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: Resource.Orderset.Quicklinkchilddisplay_Text,
          Value: 'O' + '^' + 'ORS',
          Level: 1,
        })
      );
    }
  }
}
