import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, iBusyIndicator} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, PatientContext, ClerkFormViewDeftBehaviour, HtmlPage, AppSessionInfo, Visibility } from 'epma-platform/models';
import { AppDialog, BitmapImage, ContentPresenter, Grid, ToolTipService, Uri, UriKind, iCheckBox, iImage, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridViewCellClickEventArgs, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { MedicationOptionVM } from '../viewmodel/medicationoptionvm';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { InfContinousSequentail, PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { MedicationPrescribeVM } from '../ca/prescribe/medicationprescribevm';
import { Common } from '../utilities/common';
import { CConstants, MedImage, MedImages, PrescribeSource, PrescriptionTypes } from '../utilities/constants';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CommonVariables } from 'src/app/lorappcommonbb/utilities/common';
import { Resource } from '../resource';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { DrugItemSubTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { DisplayOtherInformationLineItem, DisplayPrescriptionLineItem, GPConnectPresItemDetail, WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import { ResMedAlternateOption } from '../resource/resmedalternateoption.designer';
import { ResMedDrugPrescriptionOption } from '../resource/ResMedDrugPrescriptionOption.designer';
//import { GridComponent } from '@progress/kendo-angular-grid/grid.component';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Image } from '../../shared/epma-platform/controls/epma-image/epma-image.component';
import { Binding, BindingMode } from 'src/app/shared/epma-platform/controls/FrameworkElement';

@Component({
    selector: 'meddrugprescriptionoptionchild',
    templateUrl: './meddrugprescriptionoptionchild.html'
})  
export class meddrugprescriptionoptionChild { //extends iAppDialogWindow {
  
    private LayoutRoot: Grid;    
    appDialog: any;
    DataContext: any;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblDrugOptions: iLabel;
@ViewChild("lblDrugOptionsTempRef", {read:iLabel, static: false }) set _lblDrugOptions(c: iLabel){
    if(c){ this.lblDrugOptions  = c; }
};
private ImgMCI: Image;
@ViewChild("ImgMCITempRef", {read:Image, static: false }) set _ImgMCI(c: Image){
    if(c){ this.ImgMCI  = c; }
};
private R_Name: iImage;
@ViewChild("R_NameTempRef", {read:iImage, static: false }) set _R_Name(c: iImage){
    if(c){ this.R_Name  = c; }
};
private spGPItemDetail: ContentPresenter;
@ViewChild("spGPItemDetailTempRef", {read:ContentPresenter, static: false }) set _spGPItemDetail(c: ContentPresenter){
    if(c){ this.spGPItemDetail  = c; }
};
private lblPrescribe: iLabel;
@ViewChild("lblPrescribeTempRef", {read:iLabel, static: false }) set _lblPrescribe(c: iLabel){
    if(c){ this.lblPrescribe  = c; }
};
private grdInclNonFor: Grid;
@ViewChild("grdInclNonForTempRef", {read:Grid, static: false }) set _grdInclNonFor(c: Grid){
    if(c){ this.grdInclNonFor  = c; }
};
private chkInclNonFor: iCheckBox;
@ViewChild("chkInclNonForTempRef", {read:iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox){
    if(c){ this.chkInclNonFor  = c; }
};
public grdPrescribe:GridExtension = new GridExtension();
@ViewChild("grdPrescribeTempRef", {read:GridComponent, static: false }) set _grdPrescribe(c: GridComponent){
    if(c){ this.grdPrescribe.grid  = c; 
        this.grdPrescribe.columns = c.columns}
};
         //public objResMedDrugPrescriptionOption:ResMedDrugPrescriptionOption;
         public MedLineDisplay:DisplayPrescriptionLineItem ;
         public MedOtherDisplay:DisplayOtherInformationLineItem;
         public NoteToolTip:WrapToolTip ;
         // objResMedAlternateOption:ResMedAlternateOption;
         public GPConnectItemDisplay:GPConnectPresItemDetail;
         public objPrescriptionMedication: MedicationOptionVM = new MedicationOptionVM();
         public objDrugItemInputData: DrugItemInputData;
         public objPresItemVM: PrescriptionItemVM;
        public sTagObj: ManagePrescSer.ConstituentItem;
        objVM: IPPMABaseVM;
        public objResMedDrugPrescriptionOption = Resource.ResMedDrugPrescriptionOption;
        public objResMedAlternateOption = Resource.ResMedAlternateOption;
        //public delegate void IsmeddrugprescriptionoptionChildClose(bool IsOptionSelected);
        public IsmeddrugprescriptionoptionChildCloseEvent: Function;
        public RNameSource: BitmapImage;  
        public RNameVisibility: Visibility = Visibility.Visible;
        public RNameToolTip: string = "";
        public RNameTextData: string = "";
        constructor() {
            //super();
           // InitializeComponent();
        }
        ngOnInit(): void {
         this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e) };
        }
        ngAfterViewInit(): void {  
            this.grdPrescribe.GenerateColumns();          
            this.ChildWindow_Loaded({},null);
        }
        private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
            if (this.sTagObj != null) {
                let gpConnectItem: GPConnectItemVM = null;
                // if (super.DataContext instanceof ClinicallyVerifyVM) {
                //     let cvvm: ClinicallyVerifyVM = ObjectHelper.CreateType<ClinicallyVerifyVM>(super.DataContext, ClinicallyVerifyVM);
                //     if (cvvm != null && cvvm.GpConnectMedicationItem != null) {
                //         gpConnectItem = cvvm.GpConnectMedicationItem;
                //     }
                // }
                //else 
                // if (super.DataContext instanceof MedicationPrescribeVM) {
                //     let mpvm: MedicationPrescribeVM = ObjectHelper.CreateType<MedicationPrescribeVM>(super.DataContext, MedicationPrescribeVM);
                //     if (mpvm != null && mpvm.GpConnectMedicationItem != null) {
                //         gpConnectItem = mpvm.GpConnectMedicationItem;
                //     }
                // }
                this.spGPItemDetail.Visibility = gpConnectItem != null && !String.IsNullOrEmpty(gpConnectItem.MedicationItemDetail) ? Visibility.Visible : Visibility.Collapsed;
                this.objPrescriptionMedication = new MedicationOptionVM(ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM));
                let sIsFormulary: string[] = null;
                if (this.sTagObj.OID > 0) {
                    sIsFormulary = this.sTagObj.IsFormulary.Split('^');
                    if (sIsFormulary != null && sIsFormulary.length > 1) {
                        //this.objPrescriptionMedication.IsFormulary = (sIsFormulary[1] == "False" || sIsFormulary[1] == "false") ? "0" : "1";
                        this.objPrescriptionMedication.IsFormulary = String.Equals(sIsFormulary[1], "false", StringComparison.InvariantCultureIgnoreCase) ? "0" : "1";
                        this.chkInclNonFor.Visibility = Visibility.Collapsed;
                    }
                    else {
                        this.objPrescriptionMedication.IsFormulary = this.sTagObj.IsFormulary;
                    }
                    this.grdPrescribe.DataContext = this.objPrescriptionMedication;
                    //this.grdPrescribe.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("MedPrescribedOptionList"), { Mode: BindingMode.OneWay }));
                    this.grdPrescribe.SetBinding('data',this.objPrescriptionMedication.MedPrescribedOptionList);
                }
                else {
                    this.grdPrescribe.DataContext = this.objPrescriptionMedication;
                    //this.grdPrescribe.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("Meddrugprescriptionoption"), { Mode: BindingMode.OneWay }));
                    this.grdPrescribe.SetBinding('data',this.objPrescriptionMedication.Meddrugprescriptionoption);
                }
                let sMCIToolTip: string = "";
                if (!String.IsNullOrEmpty(this.sTagObj.ItemSubType) && String.Equals(this.sTagObj.ItemSubType, DrugItemSubTypeCode.MULTI_COMPONENT)) {
                    if (!String.IsNullOrEmpty(this.sTagObj.MCItemName))
                        sMCIToolTip = Common.GetMCIToolTip(this.sTagObj.MCItemName);
                    this.ImgMCI.Visibility = Visibility.Visible;
                    ToolTipService.SetToolTip(this.ImgMCI, sMCIToolTip);
                }
                this.chkInclNonFor.DataContext = this.objPrescriptionMedication;
                this.objPrescriptionMedication.TagObjVM = this.sTagObj;
                if (sIsFormulary != null && sIsFormulary.length > 1) {
                    if (String.Compare(sIsFormulary[0], "FAV", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        (<ManagePrescSer.PrescribeItemBase>(this.objPrescriptionMedication.TagObjVM)).IsFormulary = "0";
                    }
                }
                this.objPrescriptionMedication.IsFormularyCheckedPrescOptions = String.Compare((<ManagePrescSer.PrescribeItemBase>(this.objPrescriptionMedication.TagObjVM)).IsFormulary, "0", StringComparison.InvariantCultureIgnoreCase) == 0 ? true : false;
                this.lblDrugOptions.Text = this.sTagObj.Name;
                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && !String.IsNullOrEmpty(this.sTagObj.Type) && !String.IsNullOrEmpty(this.sTagObj.LorenzoID) && !String.IsNullOrEmpty(this.sTagObj.MCVersion)) {
                    let oParam: string[] = new Array(3);
                    let Isauthorise: string = String.Empty;
                    oParam[0] = this.sTagObj.Type;
                    oParam[1] = this.sTagObj.LorenzoID;
                    oParam[2] = this.sTagObj.MCVersion;
                    Isauthorise = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetIsItemAuthorise", oParam), String);
                    if (String.Equals(Isauthorise, "1", StringComparison.InvariantCultureIgnoreCase)) {
                        this.lblDrugOptions.Text = this.sTagObj.Name + CConstants.sAuthoriseText;
                    }
                }
                if (!String.IsNullOrEmpty(this.sTagObj.PrescNote)) {
                    this.R_Name.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                    //Revisit required
                    //this.R_Name.TextData = this.sTagObj.PrescNote;
                    let sToolTip: string = String.Empty;
                    if (this.sTagObj.PrescNote.length > 200) {
                        sToolTip = this.sTagObj.PrescNote.Substring(0, 199) + "...";
                        this.R_Name.ToolTip = sToolTip;
                    }
                    else {
                        this.R_Name.ToolTip = this.sTagObj.PrescNote;
                    }
                }
                else {
                     this.R_Name.Source = null;
                     this.R_Name.TextData = String.Empty;
                     this.R_Name.ToolTip = String.Empty;
                }
            }
        }
        private grdPrescribe_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
            if (this.grdPrescribe.GetColumnIndexByName("SlctColumn") == args.ColumnIndex) {
                Busyindicator.SetStatusIdle("Favourites");
                this.objVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
                this.objPresItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdPrescribe.GetRowData(args.RowIndex), PrescriptionItemVM);
                if (this.objPresItemVM.IsProcessinIconEnable) {
                    iBusyIndicator.Start("FormViewer", true);
                    CommonVariables.FormViewerIsInProgress = true;
                }
                this.objPresItemVM.IsProcessinIconEnable = false;
                this.objVM.PrescribeNewItemEvent  = (s) => { this.objMPVM_PrescribeNewItemEvent(s); } ;
                this.objDrugItemInputData = new DrugItemInputData();
                if (this.objPresItemVM != null && this.objPresItemVM.FormViewerDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingName)) {
                    this.objDrugItemInputData.IdentifyingName = this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                    this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingOID);
                    this.objDrugItemInputData.IdentifyingType = this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
                    this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                    this.objDrugItemInputData.IsFormulary = (this.objPresItemVM.IsNonformulary == '0') ? true : false;
                    this.objDrugItemInputData.FavouritesDetailOID = 0;
                    this.objDrugItemInputData.IsAccessContraint = this.objPresItemVM.IsAccessContraint;
                    this.objDrugItemInputData.IsPrescribeByBrand = this.objPresItemVM.IsPrescribeByBrand;
                    this.objDrugItemInputData.ItemType = this.objPresItemVM.ItemMainType;
                    this.objDrugItemInputData.ITMSUBTYP = this.objPresItemVM.ItemSubType;
                    this.objDrugItemInputData.LorenzoID = this.sTagObj.LorenzoID;
                    this.objDrugItemInputData.FormularyNote = this.objPresItemVM.FormularyNote;
                    if (this.objPresItemVM != null && this.objPresItemVM.FormViewerDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && this.objVM.InfusionContinousSeq != null && (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "0" || (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "1" && this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType != null && this.objVM.InfusionContinousSeq.Infusiontype != null && !String.Equals(this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, this.objVM.InfusionContinousSeq.Infusiontype.Value))) && (this.objVM.InfusionContinousSeq.SequentialRoute != null || this.objVM.InfusionContinousSeq.SequentialMultiplsRoutes != null) && this.objVM.InfusionContinousSeq.IsSequentialPrescribing) {
                        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                            Title: "Lorenzo - Manage prescription",
                            Message: Resource.Infusion.SequentialRouteDifferentitemlevel_Message,
                            MessageButton: MessageBoxButton.OKCancel,
                            IconType: MessageBoxType.Question
                        });
                        iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose(s,e); } ;
                        iMsgBox.Show();
                    }
                    else {
                        if (this.objPresItemVM.IsOther) {
                            this.objVM.IsOtherClick = true;
                            this.objVM.PrescribeNewItem(this.objDrugItemInputData);
                        }
                        else {
                            this.objPresItemVM.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                            this.objPresItemVM.ePrescribeSource = PrescribeSource.DOS;
                            this.objVM.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemVM);
                        }
                    }
                }
                else if (this.objPresItemVM.IsOther && this.sTagObj != null) {
                    this.objDrugItemInputData.IdentifyingName = (this.lblDrugOptions.Text).Replace(CConstants.sAuthoriseText, "");
                    this.objDrugItemInputData.IdentifyingOID = this.sTagObj.PrescribeItemID;
                    this.objDrugItemInputData.IdentifyingType = this.sTagObj.Type;
                    this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                    this.objDrugItemInputData.IsFormulary = String.Equals(this.sTagObj.IsFormulary, "0") ? false : true;
                    this.objDrugItemInputData.FavouritesDetailOID = 0;
                    this.objDrugItemInputData.IsAccessContraint = this.sTagObj.HasAccessConstraint.ToString();
                    this.objDrugItemInputData.IsPrescribeByBrand = this.sTagObj.IsPrescribeByBrand;
                    this.objDrugItemInputData.ItemType = this.sTagObj.Itemtype;
                    this.objDrugItemInputData.LorenzoID = this.sTagObj.LorenzoID;
                    this.objDrugItemInputData.ITMSUBTYP = this.sTagObj.ItemSubType;
                    this.objVM.IsOtherClick = true;
                    this.objVM.PrescribeNewItem(this.objDrugItemInputData);
                }
            }
        }
        iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.OK) {
                this.objVM.PrescribeNewItemEvent  = (s) => { this.objMPVM_PrescribeNewItemEvent(s); } ;
                this.objVM.InfusionContinousSeq = new InfContinousSequentail();
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData = new InfContinousSequentail();
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder = 0;
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber = 0;
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi = Visibility.Collapsed;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi = Visibility.Collapsed;
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsDisplayOrderSeqPresc = String.Empty;
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.CurrentSequentialOrder = 0;
                this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsShowRouteDiscrepency = false;
                if (this.objPresItemVM.IsOther)
                    this.objVM.PrescribeNewItem(this.objDrugItemInputData);
                else {
                    this.objPresItemVM.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                    this.objPresItemVM.ePrescribeSource = PrescribeSource.DOS;
                    this.objVM.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemVM);
                }
            }
            else {
                if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                    Busyindicator.SetStatusIdle("FormViewer");
                    CommonVariables.FormViewerIsInProgress = false;
                }
            }
        }
        objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
            this['dupDialogRef'].close();
            if(this.objVM != null && this.objVM.oSecChild != null && this.objVM.oSecChild.dupDialogRef != null)
                this.objVM.oSecChild.dupDialogRef.close();            
            //this.appDialog.DialogResult = IsChildWindowClosed;            
            // if (this.IsmeddrugprescriptionoptionChildCloseEvent != null) {
            //     this.IsmeddrugprescriptionoptionChildCloseEvent(true);
            // }
        }
        private MedDrugPrescriptionoptionChild_Unloaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
            this.DisposeFormObjects();
        }
        public DisposeFormEvents(): void {
            if (this.objVM != null) {
            //     this.objVM.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
            //     this.objVM.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
            }
        }
        public DisposeFormObjects(): void {
            if (this.objVM != null)
                this.objVM.PackOptionItem = null;
        }
    }
