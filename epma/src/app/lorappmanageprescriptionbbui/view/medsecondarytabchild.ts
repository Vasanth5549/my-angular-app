import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ContentPresenter, iButton, iImage, iLabel, iTab } from "epma-platform/controls";
import { ObjectHelper } from "epma-platform/helper";
import { AppDialogEventargs, AppDialogResult, AppSessionInfo, ChildWindow, ClerkFormViewDeftBehaviour, CListItem, ContentControl, ObservableCollection, PatientContext, Visibility, WindowButtonType } from "epma-platform/models";
import { AppActivity, Convert, iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs } from "epma-platform/services";
// import { resource } from "selenium-webdriver/http";
import { CConstants, DrugItemSubTypeCode, PrescriptionTypes } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { MedicationCommonBB } from "src/app/lorappmedicationcommonbb/utilities/medicationcommonbb";
import { MonoGraphVM } from "src/app/lorappmedicationcommonbb/viewmodel/MonographVM";
import { RoutedEventArgs, ToolTipService } from "src/app/shared/epma-platform/controls/Control";
import { Grid } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { ConstituentItem, DrugItemInputData } from "src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS";
// import { Common } from "src/src/app/lorappmanageprescriptionbbui/utilities/common";
import { MedicationPrescribeVM } from "../ca/prescribe/medicationprescribevm";
import { ResMedSecondaryTab } from "../resource/ResMedSecondaryTab.Designer";
import { Common } from "../utilities/common";
import { CommonFlags } from "../utilities/globalvariable";
import { AlternateItem } from "../viewmodel/alternateitem";
import { GPConnectItemVM } from "../viewmodel/GPConnectItemVM";
import { Indicationdtl, IPPMABaseVM } from "../viewmodel/ippmabasevm";
import { MedAccessConstraintsVM } from "../viewmodel/medaccessconstraintsvm";
import { RelateItem } from "../viewmodel/RelateItem";
import { Image } from '../../shared/epma-platform/controls/epma-image/epma-image.component';
import { MedPrescribedOption } from "./medprescribedoption";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { SecondaryScreenLinkPanel } from "./secondaryscreenlinkpanel";
import { MedRelatedOption } from "./medrelatedoption";
import { meddrugprescriptionpackoptionChild } from "./meddrugprescriptionpackoptionchild";
import { PackOptionChildfooter } from "./packoptionchildfooter";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { MedAccessConstraints } from "./medaccessconstraints";
import { StringComparison } from 'epma-platform/models';
import { MedAlternateOption } from "./medalternateoption";
import { meddrugprescriptionoptionChild } from "./meddrugprescriptionoptionchild";

var that;
@Component({
    selector: 'MedSecondaryTabChild',
    templateUrl: './medsecondarytabchild.html',
    styleUrls: ['./medsecondarytabchild.css']
  })

export class MedSecondaryTabChild extends iAppDialogWindow implements AfterViewInit,OnDestroy  {

    private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
public lblDrugtitle: iLabel;
@ViewChild("lblDrugtitleTempRef", {read:iLabel, static: false }) set _lblDrugtitle(c: iLabel){
    if(c){ this.lblDrugtitle  = c; }
};
private ImgMCI: Image;
@ViewChild("ImgMCITempRef", {read:Image, static: false }) set _ImgMCI(c: Image){
    if(c){ this.ImgMCI  = c; }
};
public R_Name: iImage;
@ViewChild("R_NameTempRef", {read:iImage, static: false }) set _R_Name(c: iImage){
    if(c){ this.R_Name  = c; }
};
private spGPItemDetail: ContentPresenter;
@ViewChild("spGPItemDetailTempRef", {read:ContentPresenter, static: false }) set _spGPItemDetail(c: ContentPresenter){
    if(c){ this.spGPItemDetail  = c; }
    };
    public iSecondaryTab: iTab;
@ViewChild("iSecondaryTabTempRef", {read:iTab, static: false }) set _iSecondaryTab(c: iTab){
    if(c){ this.iSecondaryTab  = c; }
};

objResMedSecondaryTab:ResMedSecondaryTab;

        bIsLoaded: boolean = false;
        public sDrugName: string;
    objPresOpt: MedPrescribedOption;
        objRelOpt: MedRelatedOption;
         objAltOpt: MedAlternateOption;
        objAccConst: MedAccessConstraints;
        public objAcc: MedAccessConstraintsVM;
        public objDrugItemInputData: DrugItemInputData;
        objVM: IPPMABaseVM;
        objRelateItem: RelateItem;
        static PRESCRIBE: string = "Prescribe";
        static RELATED: string = "Related";
        static ALTERNATE: string = "Alternate";
        private obj: meddrugprescriptionoptionChild;
        private oChildWindow: ChildWindow;
    public objsecondary: SecondaryScreenLinkPanel;
    //public objsecondary: null;
    objChild: meddrugprescriptionpackoptionChild;
    cmdLinks: iButton;
    cmdPrescribingOptions: iButton;
    cmdPackOptions: iButton;
    public sItemSubType: string;
    public sMCIToolTip: string;
    public sIsauthorise: string;    

    ngAfterViewInit(): void {  
        //this.ChildWindow_Loaded(null, null);      
        let temp = this.objsecondary.SecondaryScreenLoaded.subscribe(data => {            
            this.ChildWindow_Loaded(null, null);        
            temp.unsubscribe();        
        })     
    }
    
    ngOnDestroy(): void {
        this.iAppDialogWindow_Unloaded({},null);
    }

    constructor() {
        super();
        that=this;
           // InitializeComponent();
            this.bIsLoaded = false;
           
        }

    public cmdPackOptions_Click(sender: Object, e: RoutedEventArgs): void {

        let sWindowTitle: string = String.Empty;
        this.objChild = new meddrugprescriptionpackoptionChild();
        this.objChild.parentChild = this.appDialog;
        let _IsGPCBannerLoad: boolean = false;
        if (String.Compare(this.iSecondaryTab.SelectedKey, MedSecondaryTabChild.ALTERNATE, StringComparison.InvariantCultureIgnoreCase) == 0) {
            let objLinkMedAlternateOption: MedAlternateOption = this.iSecondaryTab.itabs[2].Content;
            if (this != null && objLinkMedAlternateOption.objAlternateItem != null) {
                this.objAltOpt.objAlternateItem = objLinkMedAlternateOption.objAlternateItem;
                this.objAltOpt.chkInclNonFor= objLinkMedAlternateOption.chkInclNonFor;
            }
            this.objRelateItem = new RelateItem();           
            this.objRelateItem.IdentifyingType = this.objAltOpt.objAlternateItem.IdentifyingType;
            this.objRelateItem.IdentifyingOID = this.objAltOpt.objAlternateItem.IdentifyingOID;
            this.objRelateItem.IdentifyingName = this.objAltOpt.objAlternateItem.IdentifyingName;
            this.objRelateItem.ItemType = this.objAltOpt.objAlternateItem.ItemType;
            this.objChild.DataContext = this.objRelateItem;
            sWindowTitle = this.objAltOpt.objAlternateItem.IdentifyingName + " - LORENZO -- Webpage Dialog";
            
        }
        else {
            /* Revisit functionality #START */
            //IsFormularyCheckedProductOptions
            
            if (this.objRelOpt.chkInclNonFor.IsChecked == true)
                this.objRelOpt.objRelateItem.IsFormulary = "0";
            /* if (this.objVM != null && this.objVM.GpConnectMedicationItem != null && this.objRelOpt != null && this.objRelOpt.objRelateItem != null) {
                this.objRelOpt.objRelateItem.GpConnectMedicationItem = this.objVM.GpConnectMedicationItem;
                _IsGPCBannerLoad = true;
            }
            else {
                _IsGPCBannerLoad = false;
            }
            */
            this.objChild.DataContext = this.objRelOpt.objRelateItem;            
            sWindowTitle = this.objRelOpt.objRelateItem.IdentifyingName + " - LORENZO -- Webpage Dialog";
        }
        
        this.objChild.IPPMABaseVMData = null;
        this.objChild.IPPMABaseVMData = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));                
        this.objChild.objPackOptionChildfooter = new PackOptionChildfooter();                   
        this.objChild.objPackOptionChildfooter.DataContext = this.objChild.DataContext;                 
        this.objChild.ImeddrugprescriptionpackoptionChildCloseEvent = (s) => { this.objChild_ImeddrugprescriptionpackoptionChildCloseEvent(s); };
        let Height: number;
        Height = _IsGPCBannerLoad ? 480 : 440;

        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.objChild = s;
                this.objChild.objPackOptionChildfooter = e;
            }
        }                
        AppActivity.OpenWindow(sWindowTitle, this.objChild, (s,e) => {this.objChild_Closed(s);}, "", false, Height, 650, false, WindowButtonType.Close, this.objChild.objPackOptionChildfooter,null,null,Callback);

    }
    objChild_ImeddrugprescriptionpackoptionChildCloseEvent(IsOptionSelected: boolean): void {
        if (IsOptionSelected)
            //this.appDialog.DialogResult = true;
            this.dupDialogRef.close();
    }

    private objChild_Closed(args: AppDialogEventargs): void {
        //this.objChild.appDialog.DialogResult = true;
        this.objChild.dupDialogRef.close();
    }
    private cmdLinks_Click(sender: Object, e: RoutedEventArgs): void {
        if (String.Compare(this.iSecondaryTab.SelectedKey, MedSecondaryTabChild.ALTERNATE, StringComparison.InvariantCultureIgnoreCase) == 0) {
            /*Revisit functionality #START  */
           // let objLinkMedAlternateOption: MedAlternateOption = (ObjectHelper.CreateType<MedAlternateOption>(<MedAlternateOption>(<ContentControl>(this.iSecondaryTab[2])).Content, MedAlternateOption));
            let objLinkMedAlternateOption: MedAlternateOption = this.iSecondaryTab.itabs[2].Content;
            if (objLinkMedAlternateOption != null && objLinkMedAlternateOption.grdAlternates != null && objLinkMedAlternateOption.grdAlternates.GetRowCount() > 0) {
                let objAlternateItem: AlternateItem = <AlternateItem>objLinkMedAlternateOption.grdAlternates.GetSelectedRow();
                if (objAlternateItem != null) {
                    let objMonoGraphVM: MonoGraphVM = new MonoGraphVM();
                    let MCIItemCount: number = 0;
                    let MCIIdentifyingOID: number = 0;
                    let MCIIdentifyingType: string;
                    let MCIIdentifyingName: string;
                    let MonographParams: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                    if (String.Compare(objAlternateItem.ItemsubType, CConstants.SUBTYPE) == 0) {
                        if (String.Compare(objAlternateItem.LorenzoID, CommonFlags.MClorenzoid, StringComparison.OrdinalIgnoreCase) == 0) {
                            MCIIdentifyingOID = Convert.ToInt64(objAlternateItem.IdentifyingOID);
                            MCIIdentifyingType = objAlternateItem.IdentifyingType;
                            let MonographParamDet: CListItem = new CListItem();
                            MonographParamDet.DisplayText = CConstants.NOTANPREDEFMCI;
                            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                            MonographParamDet.Tag = MCIIdentifyingType;
                            MonographParams.Add(MonographParamDet);
                        }
                        else {
                            MCIIdentifyingOID = Convert.ToInt64(objAlternateItem.IdentifyingOID);
                            MCIIdentifyingType = objAlternateItem.IdentifyingType;
                            MCIIdentifyingName = objAlternateItem.IdentifyingName;
                            if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                                let MonographParamDet: CListItem = new CListItem();
                                MonographParamDet.DisplayText = MCIIdentifyingName;
                                MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                MonographParamDet.Tag = MCIIdentifyingType;
                                MonographParams.Add(MonographParamDet);
                            }
                        }
                        if (objAlternateItem.MulticomponentDetails != null && objAlternateItem.MulticomponentDetails.oMCItemBasicInfo != null) {
                            MCIItemCount = objAlternateItem.MulticomponentDetails.oMCItemBasicInfo.Count;
                            if (MCIItemCount > 0) {
                                for (let iCnt: number = 0; iCnt < MCIItemCount; iCnt++) {
                                    MCIIdentifyingOID = objAlternateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingOID;
                                    MCIIdentifyingType = objAlternateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingType;
                                    MCIIdentifyingName = objAlternateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].ComponentName;
                                    if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                                        let MonographParamDet: CListItem = new CListItem();
                                        MonographParamDet.DisplayText = MCIIdentifyingName;
                                        MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                        MonographParamDet.Tag = MCIIdentifyingType;
                                        MonographParams.Add(MonographParamDet);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        MCIIdentifyingOID = Convert.ToInt64(objAlternateItem.IdentifyingOID);
                        MCIIdentifyingType = objAlternateItem.IdentifyingType;
                        MCIIdentifyingName = objAlternateItem.IdentifyingName;
                        if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                            let MonographParamDet: CListItem = new CListItem();
                            MonographParamDet.DisplayText = MCIIdentifyingName;
                            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                            MonographParamDet.Tag = MCIIdentifyingType;
                            MonographParams.Add(MonographParamDet);
                        }
                    }
                    MedicationCommonBB.OnMonographLinkClick(MonographParams);
                }
            }
            else {
                iMessageBox.Show("LORENZO", ResMedSecondaryTab.Please_Select_an_item, MessageBoxType.Exclamation, MessageBoxButton.OK);
            }

        }
        else if (String.Compare(this.iSecondaryTab.SelectedKey, MedSecondaryTabChild.RELATED, StringComparison.InvariantCultureIgnoreCase) == 0) {
            // let objLinkMedRelatedOptions: MedRelatedOption = (ObjectHelper.CreateType<MedRelatedOption>(<MedRelatedOption>(<ContentControl>(this.iSecondaryTab[1])).Content, MedRelatedOption));
            let objLinkMedRelatedOptions: MedRelatedOption = this.iSecondaryTab.itabs[1].Content;
            if (objLinkMedRelatedOptions != null && objLinkMedRelatedOptions.grdRelated != null && objLinkMedRelatedOptions.grdRelated.GetSelectedRowCount() > 0) {
                this.objRelateItem = <RelateItem>objLinkMedRelatedOptions.grdRelated.GetSelectedRow();
                if (this.objRelateItem != null) {
                    let objMonoGraphVM: MonoGraphVM = new MonoGraphVM();
                    let MCIItemCount: number = 0;
                    let MCIIdentifyingOID: number = 0;
                    let MCIIdentifyingType: string;
                    let MCIIdentifyingName: string;
                    let MonographParams: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                    if (String.Compare(this.objRelateItem.ItemSubType, CConstants.SUBTYPE) == 0) {
                        if (String.Compare(this.objRelateItem.LorenzoID, CommonFlags.MClorenzoid, StringComparison.OrdinalIgnoreCase) == 0) {
                            MCIIdentifyingOID = Convert.ToInt64(this.objRelateItem.IdentifyingOID);
                            MCIIdentifyingType = this.objRelateItem.IdentifyingType;
                            let MonographParamDet: CListItem = new CListItem();
                            MonographParamDet.DisplayText = CConstants.NOTANPREDEFMCI;
                            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                            MonographParamDet.Tag = MCIIdentifyingType;
                            MonographParams.Add(MonographParamDet);
                        }
                        else {
                            MCIIdentifyingOID = Convert.ToInt64(this.objRelateItem.IdentifyingOID);
                            MCIIdentifyingType = this.objRelateItem.IdentifyingType;
                            MCIIdentifyingName = this.objRelateItem.IdentifyingName;
                            if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                                let MonographParamDet: CListItem = new CListItem();
                                MonographParamDet.DisplayText = MCIIdentifyingName;
                                MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                MonographParamDet.Tag = MCIIdentifyingType;
                                MonographParams.Add(MonographParamDet);
                            }
                        }
                        if (this.objRelateItem.MulticomponentDetails != null && this.objRelateItem.MulticomponentDetails.oMCItemBasicInfo != null) {
                            MCIItemCount = this.objRelateItem.MulticomponentDetails.oMCItemBasicInfo.Count;
                            if (MCIItemCount > 0) {
                                for (let iCnt: number = 0; iCnt < MCIItemCount; iCnt++) {
                                    MCIIdentifyingOID = this.objRelateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingOID;
                                    MCIIdentifyingType = this.objRelateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingType;
                                    MCIIdentifyingName = this.objRelateItem.MulticomponentDetails.oMCItemBasicInfo[iCnt].ComponentName;
                                    if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                                        let MonographParamDet: CListItem = new CListItem();
                                        MonographParamDet.DisplayText = MCIIdentifyingName;
                                        MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                        MonographParamDet.Tag = MCIIdentifyingType;
                                        MonographParams.Add(MonographParamDet);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        MCIIdentifyingOID = Convert.ToInt64(this.objRelateItem.IdentifyingOID);
                        MCIIdentifyingType = this.objRelateItem.IdentifyingType;
                        MCIIdentifyingName = this.objRelateItem.IdentifyingName;
                        if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                            let MonographParamDet: CListItem = new CListItem();
                            MonographParamDet.DisplayText = MCIIdentifyingName;
                            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                            MonographParamDet.Tag = MCIIdentifyingType;
                            MonographParams.Add(MonographParamDet);
                        }
                    }
                    MedicationCommonBB.OnMonographLinkClick(MonographParams);
                }
            }
            else {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Message:ResMedSecondaryTab.Please_Select_an_item,
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Exclamation
                });
                iMsgBox.Show();
                
                // iMessageBox.Show("LORENZO", ResMedSecondaryTab.Please_Select_an_item, MessageBoxType.Exclamation, MessageBoxButton.OK);
            }

        }
    }
    MeddrugmonographChild_Close(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        if (args.Result == AppDialogResult.Close) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                //Revisit functionality #START
                // Message: resource.disconcan1.Cancel_Error_Message,
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            // ObjectHelper.stopFinishAndCancelEvent(false);
            iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose_App(s, e); };
            iMsgBox.Show();
        }
        else {
            this.oChildWindow.DialogResult = true;
        }
    }
    iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.oChildWindow.DialogResult = false;
        }
    }
    // Revisit functionality #START
    private cmdPrescribingOptions_Click(sender: Object, e: RoutedEventArgs): void {
        if (String.Compare(this.iSecondaryTab.SelectedKey, MedSecondaryTabChild.ALTERNATE, StringComparison.InvariantCultureIgnoreCase) == 0) {
            //let objLinkMedAlternateOption: MedAlternateOption = (ObjectHelper.CreateType<MedAlternateOption>(<MedAlternateOption>(<ContentControl>(this.iSecondaryTab.itabs[2])).Content, MedAlternateOption));
            let objLinkMedAlternateOption: MedAlternateOption = this.iSecondaryTab.itabs[2].Content;
            this.objDrugItemInputData = new DrugItemInputData();
            if (objLinkMedAlternateOption != null && objLinkMedAlternateOption.objAlternateItem != null) {
                this.objAltOpt.objAlternateItem = objLinkMedAlternateOption.objAlternateItem;
                this.objAltOpt.chkInclNonFor = objLinkMedAlternateOption.chkInclNonFor;
            }
            if (objLinkMedAlternateOption != null && objLinkMedAlternateOption.grdAlternates != null && objLinkMedAlternateOption.grdAlternates.GetSelectedRowCount() > 0) {

                this.objDrugItemInputData.IdentifyingName = this.objAltOpt.objAlternateItem.IdentifyingName;
                this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objAltOpt.objAlternateItem.IdentifyingOID);
                this.objDrugItemInputData.IdentifyingType = this.objAltOpt.objAlternateItem.IdentifyingType;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.LorenzoID = this.objAltOpt.objAlternateItem.LorenzoID;
                this.objDrugItemInputData.IsAccessContraint = this.objAltOpt.objAlternateItem.IsAccessConstraint;
                if (this.objAltOpt.chkInclNonFor.IsChecked == true)
                    this.objAltOpt.objAlternateItem.IsFormulary = "0";
                let lnFormularyOID: number = 0;
                Number.TryParse(this.objAltOpt.objAlternateItem.IsFormulary, (o) => { lnFormularyOID = o; });
                this.objDrugItemInputData.IsFormulary = lnFormularyOID > 0 ? true : false;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.FormularyNote = this.objAltOpt.objAlternateItem.FormularyNotes;
                this.objDrugItemInputData.ITMSUBTYP = this.objAltOpt.objAlternateItem.ItemsubType;
                this.objDrugItemInputData.MCIItemDisplay = this.objAltOpt.objAlternateItem.mcitemdisplay;
                this.objDrugItemInputData.IsIndicationRequired = this.objAltOpt.objAlternateItem.IsIndicationRequired;
                this.objDrugItemInputData.SourceDataProviderType = this.objAltOpt.objAlternateItem.SourceDataProviderType;
                this.objDrugItemInputData.IsAuthorise = this.objAltOpt.objAlternateItem.IsAuthorise;

                if (this.objVM == null) {
                    this.objVM = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                }
                if (this.objVM != null && this.objVM.SecondaryTabDetails != null) {
                    let strAry: string[] = null;
                    strAry = this.objVM.SecondaryTabDetails.Split('~');
                    if (strAry != null && strAry.length > 3) {
                        this.objDrugItemInputData.IsPrescribeByBrand = !String.IsNullOrEmpty(strAry[3]) ? strAry[3] : String.Empty;
                    }
                }
                if (String.Equals(this.objDrugItemInputData.IsAccessContraint, "1", StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objDrugItemInputData.IsIndicationRequired, "1", StringComparison.CurrentCultureIgnoreCase)) {
                    this.objVM.oIndicationdtl = new Indicationdtl();
                    this.objVM.oIndicationdtl.IsAccessConstriant = this.objDrugItemInputData.IsAccessContraint;
                    this.objVM.oIndicationdtl.IsIndicationRequired = this.objDrugItemInputData.IsIndicationRequired;
                    this.objVM.oIndicationdtl.IsPrescribeByBrand = this.objDrugItemInputData.IsPrescribeByBrand;
                    this.objVM.oIndicationdtl.ItemType = this.objDrugItemInputData.ItemType;
                    this.objVM.oIndicationdtl.IsFormulary = this.objDrugItemInputData.IsFormulary;
                    this.objVM.oIndicationdtl.LorenzoID = this.objDrugItemInputData.LorenzoID;
                    this.objVM.oIndicationdtl.ITMSUBTYP = this.objDrugItemInputData.ITMSUBTYP;
                    this.objVM.oIndicationdtl.SourceDataProviderType = this.objDrugItemInputData.SourceDataProviderType;
                    this.objVM.LaunchAccessConstraint(this.objDrugItemInputData.IdentifyingOID.ToString(), this.objDrugItemInputData.IdentifyingType, this.objDrugItemInputData.IdentifyingName, this.objDrugItemInputData.FormularyNote, null, null, null, this.objVM.oIndicationdtl, this.objDrugItemInputData.IsAuthorise);
                }
                else {

                    let ObjCItem: ConstituentItem = new ConstituentItem();
                    this.obj = new meddrugprescriptionoptionChild();
                    ObjCItem.PrescribeItemID = Convert.ToInt64(this.objAltOpt.objAlternateItem.IdentifyingOID);
                    ObjCItem.Type = this.objAltOpt.objAlternateItem.IdentifyingType;
                    if (this.objAltOpt.chkInclNonFor.IsChecked == true)
                        this.objAltOpt.objAlternateItem.IsFormulary = "0";
                    ObjCItem.IsFormulary = this.objAltOpt.objAlternateItem.IsFormulary;
                    ObjCItem.MCVersion = AppSessionInfo.AMCV;
                    ObjCItem.Name = this.objAltOpt.objAlternateItem.IdentifyingName;
                    ObjCItem.IsPrescribeByBrand = this.objAltOpt.objAlternateItem.IsByBrand;
                    ObjCItem.HasAccessConstraint = String.Compare(this.objAltOpt.objAlternateItem.IsAccessConstraint, "1") == 0 ? 1 : 0;
                    ObjCItem.LorenzoID = this.objAltOpt.objAlternateItem.LorenzoID;
                    ObjCItem.Itemtype = this.objAltOpt.objAlternateItem.ItemType;
                    ObjCItem.Formularynote = this.objAltOpt.objAlternateItem.FormularyNotes;
                    ObjCItem.ItemSubType = this.objAltOpt.objAlternateItem.ItemsubType;
                    ObjCItem.FormularyOID = this.objAltOpt.objAlternateItem.FormularyOID;
                    this.obj.sTagObj = ObjCItem;
                    let sWindowTitle: string = this.objAltOpt.objAlternateItem.IdentifyingName + " - LORENZO -- Webpage Dialog";
                    this.obj.DataContext = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
                    // AppActivity.OpenWindow(sWindowTitle, this.obj, this.obj_Closed, "", false, 500, 730, false, WindowButtonType.Close, null);
                    AppActivity.OpenWindow(sWindowTitle, this.obj, (s, e) => { this.obj_Closed(s) }, "", false, 500, 730, false, WindowButtonType.Close, null);
                }
            }
            else {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "Lorenzo",
                  
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Exclamation,
                    Message: ResMedSecondaryTab.Please_Select_an_item
                });
                iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose_App(s, e); };
                iMsgBox.Show();
                //iMessageBox.Show("LORENZO", ResMedSecondaryTab.Please_Select_an_item, MessageBoxType.Exclamation, MessageBoxButton.OK);
            }
        }
        else {
            // Revisit functionality #START
            //let objPrescLinkMedRelatedOptions: MedRelatedOption = (ObjectHelper.CreateType<MedRelatedOption>(<MedRelatedOption>(<ContentControl>(this.iSecondaryTab[1])).Content, MedRelatedOption));
            let objPrescLinkMedRelatedOptions: MedRelatedOption = this.iSecondaryTab.itabs[1].Content;
            this.objDrugItemInputData = new DrugItemInputData();
            if (this.objRelOpt != null && this.objRelOpt.objRelateItem != null && objPrescLinkMedRelatedOptions.grdRelated != null && objPrescLinkMedRelatedOptions.grdRelated.GetSelectedRowCount() > 0) {
                this.objDrugItemInputData.IdentifyingName = this.objRelOpt.objRelateItem.IdentifyingName;
                this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objRelOpt.objRelateItem.IdentifyingOID);
                this.objDrugItemInputData.IdentifyingType = this.objRelOpt.objRelateItem.IdentifyingType;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsAccessContraint = this.objRelOpt.objRelateItem.IsAccessConstraint;
                let lnFormularyOID: number = 0;
                Number.TryParse(this.objRelOpt.objRelateItem.IsFormulary, (o) => { lnFormularyOID = o; });
                this.objDrugItemInputData.IsFormulary = lnFormularyOID > 0 ? true : false;
                this.objDrugItemInputData.FormularyNote = this.objRelOpt.objRelateItem.FormularyNotes;
                this.objDrugItemInputData.LorenzoID = this.objRelOpt.objRelateItem.LorenzoID;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.ItemType = this.objRelOpt.objRelateItem.ItemType;
                this.objDrugItemInputData.ITMSUBTYP = this.objRelOpt.objRelateItem.ItemSubType;
                this.objDrugItemInputData.MCIItemDisplay = this.objRelOpt.objRelateItem.MCItemdisplay;
                this.objDrugItemInputData.IsAuthorise = this.objRelOpt.objRelateItem.IsAuthorise;
                if (this.objVM == null) {
                    this.objVM = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                }
                if (this.objVM != null && this.objVM.SecondaryTabDetails != null) {
                    let strAry: string[] = null;
                    strAry = this.objVM.SecondaryTabDetails.Split('~');
                    if (strAry != null && strAry.length > 3) {
                        this.objDrugItemInputData.IsPrescribeByBrand = !String.IsNullOrEmpty(strAry[3]) ? strAry[3] : String.Empty;
                    }
                }
                this.objDrugItemInputData.IsIndicationRequired = this.objRelOpt.objRelateItem.IsIndicationRequired;
                this.objDrugItemInputData.SourceDataProviderType = this.objRelOpt.objRelateItem.SourceDataProviderType;
                if (String.Equals(this.objDrugItemInputData.IsAccessContraint, "1", StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objDrugItemInputData.IsIndicationRequired, "1", StringComparison.CurrentCultureIgnoreCase)) {
                    this.objVM.oIndicationdtl = new Indicationdtl();
                    this.objVM.oIndicationdtl.IsAccessConstriant = this.objDrugItemInputData.IsAccessContraint;
                    this.objVM.oIndicationdtl.IsIndicationRequired = this.objDrugItemInputData.IsIndicationRequired;
                    this.objVM.oIndicationdtl.IsPrescribeByBrand = this.objDrugItemInputData.IsPrescribeByBrand;
                    this.objVM.oIndicationdtl.ItemType = this.objDrugItemInputData.ItemType;
                    this.objVM.oIndicationdtl.IsFormulary = this.objDrugItemInputData.IsFormulary;
                    this.objVM.oIndicationdtl.LorenzoID = this.objDrugItemInputData.LorenzoID;
                    this.objVM.oIndicationdtl.ITMSUBTYP = this.objDrugItemInputData.ITMSUBTYP;
                    this.objVM.oIndicationdtl.SourceDataProviderType = this.objDrugItemInputData.SourceDataProviderType;
                    this.objVM.LaunchAccessConstraint(this.objDrugItemInputData.IdentifyingOID.ToString(), this.objDrugItemInputData.IdentifyingType, this.objDrugItemInputData.IdentifyingName, this.objDrugItemInputData.FormularyNote, null, null, (this.objVM.InfusionContinousSeq != null && this.objVM.InfusionContinousSeq.SequentialItemOrder > 1) ? this.appDialog : this.appDialog, this.objVM.oIndicationdtl, this.objDrugItemInputData.IsAuthorise);
                }
                else {
                    let ObjCItem: ConstituentItem = new ConstituentItem();
                    this.obj = new meddrugprescriptionoptionChild();
                    ObjCItem.PrescribeItemID = Convert.ToInt64(this.objRelOpt.objRelateItem.IdentifyingOID);
                    ObjCItem.Type = this.objRelOpt.objRelateItem.IdentifyingType;
                    ObjCItem.IsFormulary = this.objRelOpt.objRelateItem.IsFormulary;
                    ObjCItem.MCVersion = AppSessionInfo.AMCV;
                    ObjCItem.Name = this.objRelOpt.objRelateItem.IdentifyingName;
                    ObjCItem.IsPrescribeByBrand = this.objRelOpt.objRelateItem.IsByBrand;
                    ObjCItem.HasAccessConstraint = String.Compare(this.objRelOpt.objRelateItem.IsAccessConstraint, "1") == 0 ? 1 : 0;
                    ObjCItem.LorenzoID = this.objRelOpt.objRelateItem.LorenzoID;
                    ObjCItem.Itemtype = this.objRelOpt.objRelateItem.ItemType;
                    ObjCItem.Formularynote = this.objRelOpt.objRelateItem.FormularyNotes;
                    ObjCItem.ItemSubType = this.objRelOpt.objRelateItem.ItemSubType;
                    ObjCItem.MCItemName = this.objRelOpt.objRelateItem.MCItemdisplay;
                    ObjCItem.FormularyOID = this.objRelOpt.objRelateItem.FormularyOID;
                    ObjCItem.PrescNote = this.objRelOpt.objRelateItem.PrescribingNote;
                    this.obj.sTagObj = ObjCItem;

                    let sWindowTitle: string = this.objRelOpt.objRelateItem.IdentifyingName + " - LORENZO -- Webpage Dialog";
                    this.obj.DataContext = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
                    this.obj.IsmeddrugprescriptionoptionChildCloseEvent = (s, e) => { this.obj_IsmeddrugprescriptionoptionChildCloseEvent(s); };

                    let Callback = (s, e) => {
                        if (s != null) {
                            this.obj = s;
                        }
                    }
                    //AppActivity.OpenWindow(sWindowTitle, this.oSecChild, (s,e) => {this.oSecChild_Closed(s);}, "", false, 450, 824, false, WindowButtonType.Close, this.oSecChild.objsecondary,null,null,Callback);                        
                    AppActivity.OpenWindow(sWindowTitle, this.obj, (s, e) => { this.obj_Closed(s) }, "", false, 410, 724, false, WindowButtonType.Close, null, null, null, Callback);
                }
            }
            else {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "Lorenzo",
                  
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Exclamation,
                    Message: ResMedSecondaryTab.Please_Select_an_item
                });
                iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose_App(s, e); };
                iMsgBox.Show();
                //iMessageBox.Show("LORENZO", ResMedSecondaryTab.Please_Select_an_item, MessageBoxType.Exclamation, MessageBoxButton.OK);
            }
        }
    }
    obj_IsmeddrugprescriptionoptionChildCloseEvent(IsOptionSelected: boolean): void {
        if (IsOptionSelected)
            this.appDialog.DialogResult = true;
    }

    obj_Closed(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        //Revisit required
        this.oChildWindow.DialogResult = true; //false;
    }
    objMedicationPrescribeVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
        if (!(IsChildWindowClosed)) {
            this.appDialog.DialogResult = IsChildWindowClosed;
        }
        else this.appDialog.DialogResult = null;
    }

    public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs) {
        let ArrayIndex: number = 7;
        if (!this.bIsLoaded) {
            this.bIsLoaded = false;
            this.lblDrugtitle.Text = this.sDrugName;
            //Revisit required
            let isGPConnItm: boolean = false;
            // if (String.Equals(this.sIsauthorise, "1", StringComparison.CurrentCultureIgnoreCase) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
            //    //Revisit functionality #START
            //     // this.lblDrugtitle.Text = this.sDrugName + CConstants.sAuthoriseText;
            // }
            if (this.DataContext != null) {
                let gpConnectItem: GPConnectItemVM = null;
                /* Revisit functionality #START
                if (super.DataContext instanceof ClinicallyVerifyVM) {
                    let cvvm: ClinicallyVerifyVM = ObjectHelper.CreateType<ClinicallyVerifyVM>(super.DataContext, ClinicallyVerifyVM);
                    if (cvvm != null && cvvm.GpConnectMedicationItem != null) {
                        gpConnectItem = cvvm.GpConnectMedicationItem;
                    }
                }
                else*/
                //  if (super.DataContext instanceof MedicationPrescribeVM) {
                //     let mpvm: MedicationPrescribeVM = ObjectHelper.CreateType<MedicationPrescribeVM>(super.DataContext, MedicationPrescribeVM);
                //     if (mpvm != null && mpvm.GpConnectMedicationItem != null) {
                //         gpConnectItem = mpvm.GpConnectMedicationItem;
                //     }
                // }
                //Revisit functionality #START
                // this.spGPItemDetail.Visibility = gpConnectItem != null && !String.IsNullOrEmpty(gpConnectItem.MedicationItemDetail) ? Visibility.Visible : Visibility.Collapsed;
                let SecTab: string[] = (ObjectHelper.CreateType<IPPMABaseVM>(super.DataContext, IPPMABaseVM)).SecondaryTabDetails.Split('~');
                let sItemSubType: string;
                let sMCIToolTip: string;
                sItemSubType = SecTab.length > 10 ? SecTab[10] : String.Empty;
                if (!String.IsNullOrEmpty(sItemSubType) && String.Equals(sItemSubType, DrugItemSubTypeCode.MULTI_COMPONENT)) {
                    sMCIToolTip = SecTab.length > 11 ? SecTab[11] : String.Empty;
                    if (!String.IsNullOrEmpty(sMCIToolTip))
                        sMCIToolTip = Common.GetMCIToolTip(sMCIToolTip);
                    this.ImgMCI.Visibility = Visibility.Visible;
                    ToolTipService.SetToolTip(this.ImgMCI, sMCIToolTip);
                }
                let IsAccConst = SecTab[2];
                let IsIndicationReq = SecTab[12];                
                if (String.Equals(IsAccConst, "1") || String.Equals(IsIndicationReq, "1")) {                                        
                    this.objAccConst = new MedAccessConstraints();
                    this.objAcc = new MedAccessConstraintsVM(ObjectHelper.CreateType<IPPMABaseVM>(super.DataContext, IPPMABaseVM));
                    this.objAcc.DrugOid = SecTab[0];
                    this.objAcc.DrugName = SecTab[9];
                    this.objAcc.DrugType = SecTab[1];
                    this.objAcc.FormularyNote = SecTab[6];
                    this.objAcc.NonFormularyReason = null;
                    this.objAcc.OtherNonFormularyReason = null;
                    this.objAcc.LblDrugVisible = false;
                    this.objAcc.IsAccessConstr = IsAccConst;
                    this.objAcc.IsIndicationRequired = IsIndicationReq;
                    this.objAcc.IsDataproviderType = SecTab[4];
                    this.objAcc.IsFormulary = (!String.IsNullOrEmpty(SecTab[ArrayIndex]) && String.Equals(SecTab[ArrayIndex], "1", StringComparison.CurrentCultureIgnoreCase)) ? true : false;
                    this.objAcc.IsVisibleOverrideIndication = (String.Equals(IsAccConst, "0", StringComparison.CurrentCultureIgnoreCase) && String.Equals(IsIndicationReq, "1", StringComparison.CurrentCultureIgnoreCase)) ? Visibility.Visible : Visibility.Collapsed;
                    this.objAccConst.DataContext = this.objAcc;
                    this.objAccConst.IPPMABaseVMData = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                    this.iSecondaryTab.AddTabItem(MedSecondaryTabChild.PRESCRIBE, "Prescribing options", this.objAccConst, true, "Prescribing options");

                }
                else {

                    this.objPresOpt = new MedPrescribedOption();
                    this.objPresOpt.dialog = this;
                    this.objPresOpt.DataContext = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                    this.iSecondaryTab.AddTabItem(MedSecondaryTabChild.PRESCRIBE, "Prescribing options", this.objPresOpt, true, "Prescribing options");
                    this.objPresOpt.strDrugName = this.sDrugName;
                }                
                this.objRelOpt = new MedRelatedOption();
                this.objRelOpt.objSecTab = this;
                this.objRelOpt.DataContext = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                let _IsVisibleTabForGPCItem: boolean = false;
                //Revisit required - Below condition may not requred after proper implementation
                if(this.objRelOpt.DataContext != null && this.objRelOpt.DataContext.GpConnectMedicationItem != null 
                    && !String.IsNullOrEmpty(this.objRelOpt.DataContext.GpConnectMedicationItem.GPConnectID)  )
                    {
                        isGPConnItm = true;
                    }
                if ((this.objVM != null && this.objVM.IsGPConMatchFound)) {
                    _IsVisibleTabForGPCItem = true;
                    this.objVM.IsGPConMatchFound = false;
                }
                let Callback = (s) =>{
                    if (s != null && s instanceof MedRelatedOption){
                    this.objRelOpt = s;
                    this.objRelOpt.DataContext = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));                    
                    }
                }
                //Revisit required                
                //if (_IsVisibleTabForGPCItem || gpConnectItem == null || String.IsNullOrEmpty(gpConnectItem.GPConnectID)) 
                if (!isGPConnItm)
                {                    
                    this.iSecondaryTab.AddTabItem(MedSecondaryTabChild.RELATED, "Product options", this.objRelOpt, false, "Product options",null,Callback);                                        
                }
                  
                this.objAltOpt = new MedAlternateOption();
                this.objAltOpt.objSecTab = this;
                this.objAltOpt.DataContext = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                //Revisit required  
                //if (gpConnectItem == null || String.IsNullOrEmpty(gpConnectItem.GPConnectID))
                if (!isGPConnItm) 
                {                        
                    this.iSecondaryTab.AddTabItem(MedSecondaryTabChild.ALTERNATE, "Alternate options", this.objAltOpt, false, "Alternate options",null,Callback);
                }
                //Revisit required 
                //if (!_IsVisibleTabForGPCItem && (gpConnectItem != null && !String.IsNullOrEmpty(gpConnectItem.GPConnectID))) 
                if (isGPConnItm)
                {
                //Revisit functionality
                this.objsecondary.Visibility = Visibility.Collapsed;
                }
            }            
            this.cmdLinks = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdLinks"), iButton);
            if (this.cmdLinks != null)
                this.cmdLinks.Click = (s, e) => { this.cmdLinks_Click(s, e); };
            this.cmdPrescribingOptions = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdPrescribingOptions"), iButton);
            if (this.cmdPrescribingOptions != null)
                this.cmdPrescribingOptions.Click = (s, e) => {
                    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                    this.cmdPrescribingOptions_Click(s, e);
                };
            this.cmdPackOptions = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdPackOptions"), iButton);
            if (this.cmdPackOptions != null)
                this.cmdPackOptions.Click = (s, e) => {
                    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                    this.cmdPackOptions_Click(s, e); 
                };
                //Revisit required - Below condition may not requred after proper implementation
                if (isGPConnItm && this.cmdLinks != null && this.cmdPrescribingOptions != null && this.cmdPackOptions != null)
                {
                    this.cmdLinks.Visibility = Visibility.Collapsed;
                    this.cmdPrescribingOptions.Visibility = Visibility.Collapsed;
                    this.cmdPackOptions.Visibility = Visibility.Collapsed;
                }    
        }
    }
    iSecondaryTab_SelectionChanged_func = (s, e) => {

        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.iSecondaryTab_SelectionChanged(s, e);

    };
        public iSecondaryTab_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
            if (sender != null) {
                let obj: iTab = ObjectHelper.CreateType<iTab>(sender, iTab);
                if (obj.SelectedKey != null) {
                    if (this.objVM == null)
                        this.objVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
                    switch (obj.SelectedKey) {
                        case MedSecondaryTabChild.PRESCRIBE:
                            this.objVM.PrescribingOptionsIsEnabled = false;
                            this.objVM.PackOptionsIsEnabled = false;
                            this.objVM.LinksIsEnabled = false;
                            if (this.objVM != null)
                                this.objVM.TabIndex = 0;
                            break;
                        case MedSecondaryTabChild.RELATED:
                            this.objVM.PrescribingOptionsIsEnabled = false;
                            this.objVM.PackOptionsIsEnabled = false;
                            this.objVM.LinksIsEnabled = false;
                            if (this.objVM != null)
                                this.objVM.TabIndex = 1;
                            break;
                        case MedSecondaryTabChild.ALTERNATE:
                            this.objVM.LinksIsEnabled = false;
                            this.objVM.PackOptionsIsEnabled = false;
                            this.objVM.PrescribingOptionsIsEnabled = false;
                            if (this.objVM != null)
                                this.objVM.TabIndex = 2;
                            break;
                    }
                }
            }
        }
        public DisposeFormEvents(): void {
            // Revisit functionality #START
            // if (this.cmdLinks != null)
            //     this.cmdLinks.Click =(s,e)=> this.cmdLinks_Click(s,e);
            // if (this.cmdPrescribingOptions != null)
            //     this.cmdPrescribingOptions.Click =(s,e)=> this.cmdPrescribingOptions_Click(s,e);
            // if (this.cmdPackOptions != null)
            //     this.cmdPackOptions.Click =(s,e)=> {this.cmdPackOptions_Click(s,e)};
        }
        public DisposeFormObjects(): void {
            // this.objPresOpt = null;
            /*Revisit functionality #START*/
            if (this.objRelOpt != null)
                this.objRelOpt.objSecTab = null;
            this.objRelOpt = null;
            if (this.objAltOpt != null)
                this.objAltOpt.objSecTab = null;
            this.objAltOpt = null;
	     //Revisit functionality
         //   this.objAccConst = null;
            
            this.objAcc = null;
            //this.objVM = null;            
            this.cmdLinks = null;

            this.objVM = (ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
            if(this.objVM != null){
                this.objVM.PrescribingOptionsIsEnabled = false;
                this.objVM.LinksIsEnabled = false;
                this.objVM.PackOptionsIsEnabled = false;
                this.objVM = null;
            }
        }
        private iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
            this.DisposeFormObjects();
        }
    }
