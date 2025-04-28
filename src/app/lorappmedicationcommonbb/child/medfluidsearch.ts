import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ObservableCollection, CValuesetTerm, RTEEventargs, CListItem, AppSessionInfo, Visibility, AppContextInfo, Int32 } from 'epma-platform/models';
import { AppDialog, BitmapImage, Colors, Grid, KeyEventArgs, SolidColorBrush, StackPanel, Uri, UriKind, iButton, iLabel, iPowerSearch, iRadioButton, iTextBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DelayedTextbox } from 'src/app/lorappmanageprescriptionbbui/view/medquickselect';
import { MedFluidSelectVM } from '../viewmodel/medfluidselectvm';
import { Dictionary } from 'epma-platform/dictionary';
import { RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import { CReqMsgGetSearchDrugs, CResMsgGetSearchDrugs, DrugItemBasicInfo, EnumSearchCriteria, FullyResolvedCriteria, GetSearchDrugsCompletedEventArgs, ManagePrescriptionWSSoapClient, PowerSearchCriteria } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import { CConstants, MedImage, MedImages, ValueDomain } from '../utilities/constants';
import { MedDrugDisplayConfigData, MedicationSearchConfigData } from 'src/app/lorappslprofiletypes/medication';
import { LineIconAlignment, OnSelectArgs, PSLineItem, PSStyleItem } from 'src/app/shared/epma-platform/controls/iPowerSearch';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { iAppDialogWindow } from 'src/app/shared/epma-platform/controls/iAppDialogWindow';
import { Resource } from '../resource';

﻿ export enum enmMedSearchOptions {
    SearchFluidDrugsOnly,
    SearchDrugAndMC,
    SearchDrugAndFluid,
    SearchDrugAndFluidAndMC,
    SearchVPAPIfPresByBrand
}
var that;

    @Component({
        selector: 'medfluidsearch',
        templateUrl: './medfluidsearch.html',
        styleUrls: ['./medfluidsearch.css']
    })
   
    export class medfluidSearch extends iAppDialogWindow implements AfterViewInit  {
        public LayoutRoot: Grid;
        ladSearch: any;
        @ViewChild("LayoutRootTempRef", { read: Grid}) set _LayoutRoot(c: Grid) {
            if (c) { this.LayoutRoot = c; }
        };
        private lblSearch: iLabel;
        @ViewChild("lblSearchTempRef", { read: iLabel}) set _lblSearch(c: iLabel) {
            if (c) { this.lblSearch = c; }
        };
        private txtSearch: iTextBox;
        @ViewChild("txtSearchTempRef", { read: iTextBox}) set _txtSearch(c: iTextBox) {
            if (c) { this.txtSearch = c; }
        };
        private gSearch: Grid;
        @ViewChild("gSearchTempRef", { read: Grid}) set _gSearch(c: Grid) {
            if (c) { this.gSearch = c; }
        };
        private cmdClear: iButton;
        @ViewChild("cmdClearTempRef", { read: iButton}) set _cmdClear(c: iButton) {
            if (c) { this.cmdClear = c; }
        };
        private cmdSearchCat: iButton;
        @ViewChild("cmdSearchCatTempRef", { read: iButton}) set _cmdSearchCat(c: iButton) {
            if (c) { this.cmdSearchCat = c; }
        };
        private spSearchOption: StackPanel;
        @ViewChild("spSearchOptionTempRef", { read: StackPanel}) set _spSearchOption(c: StackPanel) {
            if (c) { this.spSearchOption = c; }
        };
        public optBeginsWith: iRadioButton;
        @ViewChild("optBeginsWithTempRef", { read: iRadioButton}) set _optBeginsWith(c: iRadioButton) {
            if (c) { this.optBeginsWith = c; }
        };
        public optAnyWord: iRadioButton;
        @ViewChild("optAnyWordTempRef", { read: iRadioButton}) set _optAnyWord(c: iRadioButton) {
            if (c) { this.optAnyWord = c; }
        };
        private lblQLinkName: iLabel;
        @ViewChild("lblQLinkNameTempRef", { read: iLabel}) set _lblQLinkName(c: iLabel) {
            if (c) { this.lblQLinkName = c; }
        };
        public ladSearch1: iPowerSearch;
        @ViewChild("ladSearch1TempRef", { read: iPowerSearch}) set _ladSearch1(c: iPowerSearch) {
            if (c) { this.ladSearch1 = c; }
        };

        public objResMedearch = Resource.ResMedearch;
        public objFluidsearch: MedFluidSelectVM = new MedFluidSelectVM();
        public oDIDetails: DrugItemDetails;
        valueCollection: Dictionary<string, List<string>>;
        public IsCatalogue: number = 0;
        private profile: ProfileFactoryType;
        public ConceptCodes: ObservableCollection<CValuesetTerm>;
        itmTypPrmScr: List<string> = new List<string>();
        BrandFlagForDrug: string = "0";
        private IsSearchFluidDrugsOnly: string = '0';
        private IsIncludeMC: string = '1';
        private IsIncludeFluid: string = '1';
        private IsVPAPIfPresByBrand: string = '0';
        private IsVPAPMCIFlag: string = '0';
        
        public Styles = ControlStyles;
        private timer: any;
        private delaySearch: boolean = true;
    
        override KeyUpEvent(e: any) {
            if (this.delaySearch) {
                // if there is already a timer running... then stop it
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                // trigger the search action after 400 millis
                this.timer = setTimeout(() => {
                    this.DelayedTextbox_DelayTextChanged(null, '');
                }, 500);
    
            } else this.DelayedTextbox_DelayTextChanged(null, '');
        }

        ngAfterViewInit(){
            this.optBeginsWith.IsChecked = true;
            this.txtSearch.KeyUp  = (s,e) => { this.txtSearch_KeyUp(s,e); } ;
            this.ladSearch1.Visibility = Visibility.Visible;
            this.lblQLinkName.Visibility = Visibility.Collapsed;
            this.ladSearch1.ShowTooltip = true;
            this.ladSearch1.IsEnabled = true;
            this.ladSearch1.OnSelect  = (s,e) => { this.ladSearch1_OnSelect(s,e); } ;
            this.ladSearch1.GotFocus  = (s,e) => { this.ladSearch1_GotFocus(s,e); } ;
            this.DisableEnableCntrl(false);
            this.UserControl_Loaded(null,null);
            this.txtSearch.Focus();
        }
        constructorImpl(SearchOption?: enmMedSearchOptions){
            switch (SearchOption) {
                case enmMedSearchOptions.SearchFluidDrugsOnly:
                    this.IsSearchFluidDrugsOnly = '1';
                    this.IsIncludeMC = '1';
                    this.IsIncludeFluid = '1';
                    this.IsVPAPIfPresByBrand = '0';
                    this.IsVPAPMCIFlag = '0';
                    break;
                case enmMedSearchOptions.SearchDrugAndMC:
                    this.IsSearchFluidDrugsOnly = '0';
                    this.IsIncludeMC = '1';
                    this.IsIncludeFluid = '0';
                    this.IsVPAPIfPresByBrand = '0';
                    this.IsVPAPMCIFlag = '0';
                    break;
                case enmMedSearchOptions.SearchDrugAndFluid:
                    this.IsSearchFluidDrugsOnly = '0';
                    this.IsIncludeMC = '0';
                    this.IsIncludeFluid = '1';
                    this.IsVPAPIfPresByBrand = '0';
                    this.IsVPAPMCIFlag = '0';
                    break;
                case enmMedSearchOptions.SearchDrugAndFluidAndMC:
                    this.IsSearchFluidDrugsOnly = '0';
                    this.IsIncludeMC = '1';
                    this.IsIncludeFluid = '1';
                    this.IsVPAPIfPresByBrand = '0';
                    this.IsVPAPMCIFlag = '0';
                    break;
                case enmMedSearchOptions.SearchVPAPIfPresByBrand:
                    this.IsSearchFluidDrugsOnly = '0';
                    this.IsIncludeMC = '1';
                    this.IsIncludeFluid = '1';
                    this.IsVPAPIfPresByBrand = '1';
                    this.IsVPAPMCIFlag = '1';
                    break;
            }
        }
        constructor() {
            super();
            that = this;
            //InitializeComponent();
        }
        ladSearch1_GotFocus(sender: Object, e: RoutedEventArgs): void {
            this.txtSearch.Focus();
        }
        cmdSearchCat_Click_Func = (s, e) => {
            ObjectHelper.CreateObject(this, that);
            this.cmdSearchCat_Click(s, e);
        }
        public cmdSearchCat_Click(sender: Object, e: RoutedEventArgs): void {
            let SearchText = this.txtSearch.Text;
            if (SearchText.trim().length > 0) {
                this.cmdSearchCat.setFocus();
                this.IsCatalogue = 1;
                this.OnTextSearch(0);
            }
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, ValueDomain.ProductType + "," + ValueDomain.MedicationOcInPrd) == 0) {
                if (args.Result instanceof Dictionary) {
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    this.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                    objResult.forEach( (objDomainDetail)=> {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.ProductType:
                            case ValueDomain.MedicationOcInPrd:
                                objDomainDetail.Value.forEach( (oCListItem)=> {
                                    this.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                });
                                break;
                        }
                    });
                }
            }
        }
        private ladSearch1_OnSelect(sender: Object, e: OnSelectArgs): void {
            if (String.IsNullOrEmpty(e.Value))
                return
            let arrValue: string[] = e.Value.Split('~');
            if (arrValue instanceof Array && arrValue.length > 1) {
                this.GetOkButton(this).IsEnabled = true;
                this.objFluidsearch.LineItem = arrValue.length > 9 ? arrValue[9] : e.Text;
                this.objFluidsearch.FluidID = arrValue.length > 0 ? arrValue[0] : String.Empty;
                this.objFluidsearch.FluidOID = !String.IsNullOrEmpty(this.objFluidsearch.FluidID) ? Convert.ToInt64(this.objFluidsearch.FluidID) : 0;
                this.objFluidsearch.FluidItemType = arrValue.length > 1 ? arrValue[1] : String.Empty;
                this.objFluidsearch.FluidLorenzoID = arrValue.length > 8 ? arrValue[8] : String.Empty;
                this.objFluidsearch.FluidOID = arrValue.length > 9 ? Convert.ToInt64(arrValue[10]) : 0;
                this.objFluidsearch.FluidAdminMethod = arrValue.length > 10 ? arrValue[11] : String.Empty;
            }
        }
        cmdClear_Click_Func = (s, e) => {
            ObjectHelper.CreateObject(this, that);
            this.cmdClear_Click(s, e);
        }
        public cmdClear_Click(sender: Object, e: RoutedEventArgs): void {
            this.txtSearch.Text = String.Empty;
            this.cmdClear.IsEnabled = false;
            this.cmdSearchCat.IsEnabled = false;
            this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
            this.optBeginsWith.IsChecked = true;
            this.optAnyWord.IsChecked = false;
            this.GetOkButton(this).IsEnabled = false;
            this.ladSearch1.Clear();
        }
        private optBeginsWith_Click(sender: Object, e: RoutedEventArgs): void {
            this.ladSearch1.Clear();
            this.OnTextSearch(0);
        }
        private optAnyWord_Click(sender: Object, e: RoutedEventArgs): void {
            this.ladSearch1.Clear();
            this.OnTextSearch(0);
        }
        optBeginsWith_Click_Func = (s, e) => {
            ObjectHelper.CreateObject(this, that);
            this.optBeginsWith.IsChecked = true;
            this.optAnyWord.IsChecked = false;
            this.optBeginsWith_Click(s, e);
        }
    
        optAnyWord_Click_Func = (s, e) => {
            ObjectHelper.CreateObject(this, that);
            this.optAnyWord.IsChecked = true;
            this.optBeginsWith.IsChecked = false;
            this.optAnyWord_Click(s, e);
        }
        private ApplyiPowerSearchStyle(): void {
            this.objFluidsearch.LstFluidStyleItem = new ObservableCollection<PSStyleItem>();
            MedicationCommonBB.SetColorConfigCSS();
            let StyleItem0: PSStyleItem = new PSStyleItem();
            let StyleItem2: PSStyleItem = new PSStyleItem();
            let StyleItem3: PSStyleItem = new PSStyleItem();
            let StyleItem1: PSStyleItem = new PSStyleItem();
            if (MedicationCommonBB.sFormStyle != null) {
                let data: string[];
                data = MedicationCommonBB.sFormStyle.Split('~');
                StyleItem0.Forecolor = data[0];
                StyleItem2.Forecolor = data[0];
                StyleItem3.Forecolor = data[0];
                if (data[3] == "bold")
                    StyleItem0.Bold = true;
                else StyleItem0.Bold = false;
                if (data[2] == "italic")
                    StyleItem0.Italic = true;
                else StyleItem0.Italic = false;
                if (data[1] == "uppercase")
                    StyleItem0.TextCase = "Upper";
                else if (data[1] == "lowercase")
                    StyleItem0.TextCase = "Lower";
                data = MedicationCommonBB.sNonFormStyle.Split('~');
                StyleItem1.Forecolor = data[0];
                if (data[3] == "bold")
                    StyleItem1.Bold = true;
                else StyleItem1.Bold = false;
                if (data[2] == "italic")
                    StyleItem1.Italic = true;
                else StyleItem1.Italic = false;
                if (data[1] == "uppercase")
                    StyleItem1.TextCase = "Upper";
                else if (data[1] == "lowercase")
                    StyleItem1.TextCase = "Lower";
            }
            StyleItem2.Bold = false;
            StyleItem2.Italic = false;
            StyleItem2.TextCase = "Upper";
            StyleItem3.Bold = false;
            StyleItem3.Italic = false;
            StyleItem3.TextCase = "Normal";
            this.objFluidsearch.LstFluidStyleItem.Add(StyleItem0);
            this.objFluidsearch.LstFluidStyleItem.Add(StyleItem1);
            this.objFluidsearch.LstFluidStyleItem.Add(StyleItem2);
            this.objFluidsearch.LstFluidStyleItem.Add(StyleItem3);
            this.DataContext= this.objFluidsearch;
            console.log("this.objFluidsearch.LstFluidStyleItem",this.objFluidsearch.LstFluidStyleItem);
        }
        private txtSearch_KeyUp(sender: Object, e: KeyEventArgs): void {
            let operators: string[] = ["*"];
            let result: boolean = false;
            if (this.txtSearch.Text.length == 1) {
                if (this.txtSearch.Text == "%" || this.txtSearch.Text == "*") {
                    result = true;
                }
            }
            else {
                result = operators.Any(x => this.txtSearch.Text.Contains(x));
            }
            if (e.PlatformKeyCode == 16 || e.PlatformKeyCode == 36 || e.PlatformKeyCode == 191 || result) {
                this.txtSearch.Text = "";
                this.ladSearch1.Clear();
            }
        }
        public CheckSpecialCharacter(sSearchText: string, returnText: string): string {
            let sChars: string = "%/*";
            returnText = sSearchText;
            let nSrchTxt: number = sSearchText.length;
            for (let i: number = 0; i < nSrchTxt; i++) {
                if (sChars.IndexOf(sSearchText[i]) != -1) {
                    returnText = sSearchText.Replace(sSearchText[i], String.MinValue);
                    return returnText;
                }
            }
            return returnText;
        }
        private OnTextSearch(keyCode: number): void {
            let rText: string;
            if (keyCode == 36 || keyCode == 16 || keyCode == 53 || keyCode == 56 || keyCode == 191) {
                this.txtSearch.Text = "";
                this.ladSearch1.Clear();
            }
            let sSearchText: string = this.txtSearch.Text;
            //if (this.CheckSpecialCharacter(sSearchText, rText)) {
                this.txtSearch.Text = this.CheckSpecialCharacter(sSearchText, rText);
            //}
            if (sSearchText.trim().length > 0) {
                this.cmdClear.IsEnabled = true;
                this.ladSearch1.Visibility = Visibility.Visible;
                this.lblQLinkName.Visibility = Visibility.Collapsed;
            }
            else {
                this.cmdClear.IsEnabled = false;
            }
            if (sSearchText.length > 2) {
                let objDetails: DrugItemDetails = new DrugItemDetails();
                objDetails.SearchText = sSearchText;
                objDetails.MedCatVersion = AppSessionInfo.AMCV;
                if (this.IsCatalogue == 0) {
                    objDetails.IsFormulary = 1;
                }
                else {
                    objDetails.IsFormulary = 0;
                }
                objDetails.SearchCriteria = "DRUG_NAME";
                if (this.optBeginsWith.IsChecked == true) {
                    objDetails.SearchType = "BEGINS_WITH";
                    this.LoadLookAhead(objDetails);
                }
                else if (this.optAnyWord.IsChecked == true && (keyCode == 13 || keyCode == 0)) {
                    objDetails.SearchType = "LEADING_WORD";
                    this.LoadLookAhead(objDetails);
                }
                this.GetOkButton(this).IsEnabled = false;
                this.DisableEnableCntrl(true);
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Blue);
            }
            else {
                this.DisableEnableCntrl(false);
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
                this.ClearAll();
            }
        }
        public LoadLookAhead(objDet: DrugItemDetails): void {
            if (this.objFluidsearch.oAString == null) {
                this.objFluidsearch.GetProfileConfigData(objDet.SearchCriteria);
            }
            this.oDIDetails = objDet;
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetSearchDrugsCompleted  = (s,e) => { this.objService_GetSearchDrugsCompleted(s,e); } ;
            let objReqSearch: CReqMsgGetSearchDrugs = new CReqMsgGetSearchDrugs();
            objReqSearch.oContextInformation = MedicationCommonBB.FillContext();
            objReqSearch.oContextInformation.PageInfo = this.txtSearch.Text;
            objReqSearch.oPowerSearchCriteriaBC = new PowerSearchCriteria();
            objReqSearch.oPowerSearchCriteriaBC.SearchText = !String.IsNullOrEmpty(objDet.SearchText) ? objDet.SearchText : String.Empty;
            objReqSearch.oPowerSearchCriteriaBC.MCVersionNo = !String.IsNullOrEmpty(objDet.MedCatVersion) ? objDet.MedCatVersion : String.Empty;
            objReqSearch.oPowerSearchCriteriaBC.OrganisationOID = Convert.ToInt64(AppContextInfo.OrganisationOID);
            objReqSearch.oPowerSearchCriteriaBC.SearchCriteria = this.objFluidsearch.GetSearchCriteria(objDet.SearchCriteria);
            if (this.IsIncludeFluid != '0' && String.Equals(objReqSearch.oPowerSearchCriteriaBC.SearchCriteria.ToString(), "DRUG", StringComparison.OrdinalIgnoreCase)) {
                if (this.objFluidsearch != null && this.objFluidsearch.oAString != null && this.objFluidsearch.oAString.Count > 0) {
                    if (this.objFluidsearch.oAString[0] != null && !String.IsNullOrEmpty(this.objFluidsearch.oAString[0].ToString()) && (!this.objFluidsearch.oAString[0].Contains("VIRTUALPRODUCT") || !this.objFluidsearch.oAString[0].Contains("ACTUALPRODUCT"))) {
                        this.objFluidsearch.oAString[0] = "CC_DRUG-CATALOGUEITEM~VIRTUALPRODUCT~ACTUALPRODUCT~";
                        objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = this.objFluidsearch.oAString;
                    }
                    else objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = this.objFluidsearch.oAString;
                }
                else objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = this.objFluidsearch.oAString;
            }
            else objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = this.objFluidsearch.oAString;
            objReqSearch.oPowerSearchCriteriaBC.IsFormulary = objDet.IsFormulary == 1 ? '1' : '0';
            objReqSearch.oPowerSearchCriteriaBC.SearchType = this.objFluidsearch.GetSearchType(objDet.SearchType);
            objReqSearch.oPowerSearchCriteriaBC.ActivityCode = "Infus";
            objReqSearch.oPowerSearchCriteriaBC.IsBrandFlagOn = this.BrandFlagForDrug;
            objReqSearch.oPowerSearchCriteriaBC.IsIncludeMultiCompFlagOn = this.IsIncludeMC;
            objReqSearch.oPowerSearchCriteriaBC.IsIncludeInfusionFlagOn = this.IsIncludeFluid;
            objReqSearch.oPowerSearchCriteriaBC.IsFluidSearchSFSFlagOn = this.IsSearchFluidDrugsOnly;
            objReqSearch.oPowerSearchCriteriaBC.IsVPAPMCIFlag = this.IsVPAPMCIFlag;
            objReqSearch.oPowerSearchCriteriaBC.IsIPPMA_DU = true;
            if (this.IsVPAPIfPresByBrand == '1') {
                objReqSearch.oPowerSearchCriteriaBC.IsBrandFlagOn = "1";
                let oAStringCDR: ManagePrescSer.ArrayOfString = new ManagePrescSer.ArrayOfString();
                oAStringCDR.Add("CC_DRUG-VIRTUALPRODUCT~");
                oAStringCDR.Add("CC_APPLIANCE-VIRTUALPRODUCT~");
                objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = oAStringCDR;
            }
            if (objReqSearch.oPowerSearchCriteriaBC.SearchCriteria == EnumSearchCriteria.FAVOURITES) {
                objReqSearch.oPowerSearchCriteriaBC.FullyResolvedCriteria = new FullyResolvedCriteria();
                objReqSearch.oPowerSearchCriteriaBC.FullyResolvedCriteria.Others = "0";
            }
            objService.GetSearchDrugsAsync(objReqSearch);
        }
        objService_GetSearchDrugsCompleted(sender: Object, e: GetSearchDrugsCompletedEventArgs): void {
            let _ErrorID: number = 80000055;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUi.dll, Class:Medquickselect, Method:objService_GetSearchDrugsCompleted()";
            let objResSearch: CResMsgGetSearchDrugs = e.Result;
            if (objResSearch.oContextInformation != null && String.Compare(objResSearch.oContextInformation.PageInfo, this.txtSearch.Text, StringComparison.OrdinalIgnoreCase) > 0)
                return
            let objLineItem: PSLineItem;
            let oLstLineItem: ObservableCollection<PSLineItem> = new ObservableCollection<PSLineItem>();
            this.ladSearch1.Clear();
            if (e.Error == null) {
                try {
                    if (objResSearch != null && objResSearch.PowerSearchDrugs != null && objResSearch.PowerSearchDrugs.Count > 0) {
                        let sFNoteDrugProps: string, sFormularyNotes, ocproduct, desc, sDrugName;
                        let ValueExist: boolean, TypeIn;
                        let resultCollec: List<string>;
                        let builder: StringBuilder = new StringBuilder();
                        let nLen: number, nSearchResultCount = objResSearch.PowerSearchDrugs.Count;
                        let oDrugItem: DrugItemBasicInfo;
                        let oDrugProperty: ManagePrescSer.DrugProperty;
                        for (let nCnt: number = 0; nCnt < nSearchResultCount; nCnt++) {
                            sFNoteDrugProps = sFormularyNotes = String.Empty;
                            ValueExist = true;
                            TypeIn = true;
                            resultCollec = null;
                            oDrugItem = objResSearch.PowerSearchDrugs[nCnt];
                            if (String.Compare(oDrugItem.ItemType, "CC_DRUG", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oDrugItem.ItemType, "CC_APPLIANCE", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) == 0) {
                                ValueExist = true;
                                TypeIn = true;
                            }
                            else {
                                if (this.objFluidsearch != null && this.objFluidsearch.valueCollection != null && this.objFluidsearch.valueCollection.ContainsKey(oDrugItem.ItemType.ToUpper())) {
                                    //this.objFluidsearch.valueCollection.TryGetValue(oDrugItem.ItemType.ToUpper(), resultCollec);
                                    this.objFluidsearch.valueCollection.TryGetValue(oDrugItem.ItemType.ToUpper(), (rC) => { resultCollec = rC; });
                                    ValueExist = resultCollec.Contains(oDrugItem.IdentifyingType.ToUpper());
                                }
                                TypeIn = this.itmTypPrmScr.Contains(oDrugItem.ItemType.ToUpper());
                                if (!ValueExist && !TypeIn && String.Compare(oDrugItem.IdentifyingType, "CATALOGUEITEM") != 0 && String.Compare(oDrugItem.IsPrescribeByBrand, "1") == 0) {
                                    let nCount: number = MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig.Count;
                                    for (let k: number = 0; k < nCount; k++) {
                                        if (String.Compare(oDrugItem.ItemType, MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[k].ItemTypeValue) == 0) {
                                            if ((String.Compare(oDrugItem.IsPrescribeByBrand, "1") == 0) && String.Compare(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[k].ShowPrescribebybrandoptions, "YES") == 0) {
                                                ValueExist = true;
                                                TypeIn = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if (ValueExist && TypeIn) {
                                builder.Clear();
                                ocproduct = String.Empty;
                                desc = String.Empty;
                                nLen = oDrugItem.DrugProperties.Count;
                                for (let fkey: number = 0; fkey < nLen; fkey++) {
                                    if (oDrugItem.DrugProperties[fkey] != null) {
                                        oDrugProperty = oDrugItem.DrugProperties[fkey];
                                        if ((String.Compare(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) == 0 || String.Compare(oDrugProperty.DrugName, CConstants.ACTUALMOIETY) == 0) && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode) && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && oDrugProperty.VMChildCode.ToString() == CConstants.AllChild_CC) {
                                            if (builder.Length > 0) {
                                                builder.Append(", ");
                                                MedicationCommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, this.ConceptCodes, (de) => { desc = de });
                                                builder.Append(desc);
                                            }
                                            else {
                                                builder.Append(" ");
                                                MedicationCommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, this.ConceptCodes, (de) => { desc = de });
                                                builder.Append(desc);
                                            }
                                        }
                                        else if (String.Compare(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) != 0 && String.Compare(oDrugProperty.DrugName, CConstants.ACTUALMOIETY) != 0 && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode)) {
                                            if (builder.Length > 0) {
                                                builder.Append(", ");
                                                MedicationCommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, this.ConceptCodes, (de) => { desc = de });
                                                builder.Append(desc);
                                            }
                                            else {
                                                builder.Append(" ");
                                                MedicationCommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, this.ConceptCodes, (de) => { desc = de });
                                                builder.Append(desc);
                                            }
                                            if (!oDrugProperty.DrugPropertyCode.StartsWith("###") && String.Compare(oDrugProperty.DrugPropertyCode, CConstants.HighRisk_CC) == 0 && !String.IsNullOrEmpty(oDrugProperty.HighRiskMsg)) {
                                                builder.Append(" - ");
                                                builder.Append(oDrugProperty.HighRiskMsg);
                                            }
                                        }
                                        if (!oDrugProperty.DrugPropertyCode.StartsWith("###") && String.Compare(oDrugProperty.DrugPropertyCode, CConstants.HighRisk_CC) == 0 && !String.IsNullOrEmpty(oDrugProperty.HighRiskMsg) && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && oDrugProperty.VMChildCode.ToString() == CConstants.AllChild_CC) {
                                            builder.Append(" - ");
                                            builder.Append(oDrugProperty.HighRiskMsg);
                                        }
                                        if (!oDrugProperty.DrugPropertyCode.StartsWith("###") && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && oDrugProperty.VMChildCode.ToString() == CConstants.AllChild_CC && !String.IsNullOrEmpty(oDrugProperty.DrugName) && (oDrugProperty.DrugName.ToString() == CConstants.CATALOGUEITEM || String.Equals(oDrugProperty.DrugName.ToString(), CConstants.CATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase))) {
                                            builder.Append(" - ");
                                            ocproduct = CConstants.AllProducts;
                                            builder.Append(ocproduct);
                                        }
                                    }
                                }
                                if (!String.IsNullOrEmpty(oDrugItem.FormularyNote)) {
                                    sFormularyNotes = "Formulary note - " + oDrugItem.FormularyNote;
                                }
                                if (!String.IsNullOrEmpty(builder.ToString())) {
                                    sFNoteDrugProps = sFormularyNotes + '*' + "Properties - " + builder.ToString();
                                }
                                if (!String.IsNullOrEmpty(oDrugItem.AliasName))
                                    sDrugName = oDrugItem.IdentifyingName.Replace(oDrugItem.AliasName, String.Empty);
                                else sDrugName = oDrugItem.IdentifyingName;
                                let itemValue = oDrugItem.IdentifyingOID + "~" + oDrugItem.IdentifyingType + "~" + Int32.Parse(oDrugItem.IsAccessContraint) + "~" + Int32.Parse(oDrugItem.IsPrescribeByBrand) + "~" + oDrugItem.SourceDataProviderType + "~" + oDrugItem.ItemType + "~" + sFNoteDrugProps + "~" + oDrugItem.IsFormulary + "~" + oDrugItem.LorenzoID + "~" + sDrugName + "~" + oDrugItem.PrescribableItemListOID + "~" + oDrugItem.AdminMethod;
                                objLineItem = new PSLineItem();
                                objLineItem.Text = oDrugItem.IdentifyingName;
                                objLineItem.Value = itemValue;
                                objLineItem.Tag = "TAG";
                                objLineItem.AlignRight = LineIconAlignment.Left;
                                objLineItem.ShowLinkIcon = true;
                                objLineItem.LinkIconTooltip = "Select item";
                                objLineItem.FNoteIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.HighRiskIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.UnlicensedIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.NamedPatientIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.ControlledDrugIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.NewlyMarketedIconMargin = new Thickness(2, 0, 2, 0);
                                if (oDrugItem.IdentifyingOID == -1 && String.Compare(oDrugItem.IdentifyingType, "NONCATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0) {
                                    objLineItem.NormalStyle = 2;
                                    objLineItem.SelectedStyle = 2;
                                    objLineItem.ActiveStyle = 2;
                                }
                                else if (String.Compare(oDrugItem.IsFormulary, "0", StringComparison.OrdinalIgnoreCase) == 0) {
                                    objLineItem.NormalStyle = 1;
                                    objLineItem.SelectedStyle = 1;
                                    objLineItem.ActiveStyle = 1;
                                }
                                else {
                                    objLineItem.NormalStyle = 0;
                                    objLineItem.SelectedStyle = 0;
                                    objLineItem.ActiveStyle = 0;
                                }
                                if (String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.CurrentCulture) != 0) {
                                    objLineItem.LinkIcon = 0;
                                    if (!String.IsNullOrEmpty(sFormularyNotes)) {
                                        objLineItem.LineIcon = 0;
                                        objLineItem.FNoteIcon = new BitmapImage(new Uri(MedImage.GetPath(CConstants.WarningIcon), UriKind.Relative));
                                        objLineItem.LineIconTooltip = sFormularyNotes;
                                        objLineItem.SecondaryTooltip = sFormularyNotes;
                                        objLineItem.FNoteIconTooltip = sFormularyNotes;
                                    }
                                }
                                if (String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.CurrentCulture) != 0 && !String.IsNullOrEmpty(builder.ToString())) {
                                    objLineItem.SecondaryIcon = 0;
                                    let sDrugProperty: string[] = builder.ToString().Split(',');
                                    let nDrugProp: number = sDrugProperty.length;
                                    for (let i: number = 0; i < nDrugProp; i++) {
                                        if (sDrugProperty[i].StartsWith(" Controlled drug")) {
                                            objLineItem.ControlledDrugIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_CNTRLDDRUG), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.ControlledDrugIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].StartsWith(" Unlicensed")) {
                                            objLineItem.UnlicensedIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_UNLICENSED), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.UnlicensedIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].StartsWith(" Newly Marketed Drug")) {
                                            objLineItem.NewlyMarketedIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NEWLY), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.NewlyMarketedIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].StartsWith(" Named Patient Drug")) {
                                            objLineItem.NamedPatientIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NAMEDRUG), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.NamedPatientIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].StartsWith(" High risk")) {
                                            objLineItem.HighRiskIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_HIGHRISK), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.HighRiskIconTooltip = sDrugProperty[i];
                                        }
                                    }
                                }
                                oLstLineItem.Add(objLineItem);
                            }
                        }
                    }
                    else {
                        objLineItem = new PSLineItem();
                        if (this.oDIDetails.IsFormulary == 1) {
                            objLineItem.Text = "No results found in the formulary";
                            objLineItem.Value = "No results found in the formulary";
                            objLineItem.Tag = "TAG";
                            objLineItem.NormalStyle = 0;
                            oLstLineItem.Add(objLineItem);
                        }
                        else {
                            objLineItem.Text = "No results found in the drug catalogue";
                            objLineItem.Value = "No results found in the drug catalogue";
                            objLineItem.Tag = "TAG";
                            objLineItem.NormalStyle = 1;
                            oLstLineItem.Add(objLineItem);
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
            this.objFluidsearch.LstFluidLineItem = oLstLineItem;
        }
        private ClearAll(): void {
            this.ladSearch1.Clear();
            this.IsCatalogue = 0;
            this.GetOkButton(this).IsEnabled = false;
        }
        private DisableEnableCntrl(bFlag: boolean): void {
            this.cmdClear.IsEnabled = bFlag;
            this.cmdSearchCat.IsEnabled = bFlag;
        }
        private DelayedTextbox_DelayTextChanged(Sender: DelayedTextbox, Content: string): void {
            let rText: string;
            let sSearchText: string = this.txtSearch.Text;
            //if (this.CheckSpecialCharacter(sSearchText, rText)) {
                this.txtSearch.Text = this.CheckSpecialCharacter(sSearchText, rText);
            //}
            if (sSearchText.trim().length > 0) {
                this.cmdClear.IsEnabled = true;
                this.ladSearch1.Visibility = Visibility.Visible;
                this.lblQLinkName.Visibility = Visibility.Collapsed;
            }
            else {
                this.cmdClear.IsEnabled = false;
            }
            if (sSearchText.length > 2) {
                let objDetails: DrugItemDetails = new DrugItemDetails();
                objDetails.SearchText = sSearchText;
                objDetails.MedCatVersion = AppSessionInfo.AMCV;
                if (this.IsCatalogue == 0) {
                    objDetails.IsFormulary = 1;
                }
                else {
                    objDetails.IsFormulary = 0;
                }
                objDetails.SearchCriteria = "DRUG_NAME";
                if (this.optBeginsWith.IsChecked == true) {
                    objDetails.SearchType = "BEGINS_WITH";
                    this.LoadLookAhead(objDetails);
                }
                else if (this.optAnyWord.IsChecked == true) {
                    objDetails.SearchType = "LEADING_WORD";
                    this.LoadLookAhead(objDetails);
                }
                this.GetOkButton(this).IsEnabled = false;
                this.DisableEnableCntrl(true);
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Blue);
            }
            else {
                this.DisableEnableCntrl(false);
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
                this.ClearAll();
            }
        }
        // ngAfterViewInit(){
        //     this.UserControl_Loaded(null,null);
        // }
        public UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
            //ProcessRTE.GetValuesByDomainCodes(ValueDomain.ProductType + "," + ValueDomain.MedicationOcInPrd, this.OnRTEResult);
            ProcessRTE.GetValuesByDomainCodes(ValueDomain.ProductType + "," + ValueDomain.MedicationOcInPrd, (e) => { this.OnRTEResult(e) });
            this.GetProfileConfig();
            this.GetOkButton(this).IsEnabled = false;
        }
        private GetProfileConfig(): void {
            let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
            let objReq: ProfileContext = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDSEARCHCONFIG";
            objReq.ProfileType = typeof MedicationSearchConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "DRUGDISPCONFIG";
            objReq.ProfileType = typeof MedDrugDisplayConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            this.profile = new ProfileFactoryType();
            this.profile.OnProfileListLoaded  = (s,R) => { this.profile_OnProfileLoaded(s,R); } ;
            this.profile.GetProfilesData(lstProfileReq);
        }
        private DisposeFormEvents(): void {
            if (this.profile != null)
                //this.profile.OnProfileListLoaded -= this.profile_OnProfileLoaded;
                this.profile.OnProfileListLoaded  = (s,R) => { this.profile_OnProfileLoaded(s,R); } ;
            if (this.txtSearch != null)
                //this.txtSearch.KeyUp -= this.txtSearch_KeyUp;
                this.txtSearch.KeyUp  = (s,e) => { this.txtSearch_KeyUp(s,e); } ;
            if (this.ladSearch1 != null) {
                //this.ladSearch1.OnSelect -= this.ladSearch1_OnSelect;
                this.ladSearch1.OnSelect  = (s,e) => { this.ladSearch1_OnSelect(s,e); } ;
                //this.ladSearch1.GotFocus -= this.ladSearch1_GotFocus;
                this.ladSearch1.GotFocus  = (s,e) => { this.ladSearch1_GotFocus(s,e); } ;
            }
        }
        // public DisposeFormEvents(): void {
        //     if (this.profile != null)
        //         this.profile.OnProfileListLoaded = undefined;//-= profile_OnProfileLoaded;
        //     if (this.txtSearch != null)
        //         this.txtSearch.KeyUp = undefined;//-= txtSearch_KeyUp;
        //     if (this.ladSearch != null) {
        //         this.ladSearch.OnSelect = undefined;//-= ladSearch_OnSelect;
        //         this.ladSearch.GotFocus = undefined; //-= ladSearch_GotFocus;
        //     }
        // }
        private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
        }
        private profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext>): void {
            if (Result == null)
                return
            Result.forEach( (oProfileContext)=> {
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "MEDSEARCHCONFIG") == 0) {
                    if (oProfileContext.ProfileData instanceof MedicationSearchConfigData) {
                        MedicationCommonProfileData.MedSearchConfig = ObjectHelper.CreateType<MedicationSearchConfigData>(oProfileContext.ProfileData, MedicationSearchConfigData);
                    }
                }
                else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "DRUGDISPCONFIG") == 0) {
                    if (oProfileContext.ProfileData instanceof MedDrugDisplayConfigData) {
                        MedicationCommonProfileData.MedDrugDisplayConfig = ObjectHelper.CreateType<MedDrugDisplayConfigData>(oProfileContext.ProfileData, MedDrugDisplayConfigData);
                        this.ApplyiPowerSearchStyle();
                    }
                }
            });
            //this.LayoutRoot.DataContext = this.objFluidsearch;
        }
        
    }
    //export module medfluidSearch {
        export class DrugItemDetails {
            public SearchText: string;
            public SearchType: string;
            public MedCatVersion: string;
            public IsFormulary: number;
            public SearchCriteria: string;
        }
    //}
