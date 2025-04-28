import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, AppSessionInfo, ObservableCollection, Visibility } from 'epma-platform/models';
import { AppDialog, iCheckBox, iTab, iTabItem, UserControl } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid, GridExtension, GridViewCellClickEventArgs, SortDescriptor } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { InfContinousSequentail, PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { BitmapImage, Uri, UriKind } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants, MedImage, MedImages, PrescribeSource } from '../utilities/constants';
import { CommonBB, CommonVariables } from 'src/app/lorappcommonbb/utilities/common';
import { Infusion } from '../resource/infusion.designer';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import {RoutedEventArgs} from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ResMedPrescribedOption } from '../resource/resmedprescribedoption.designer';
import { DisplayOtherInformationLineItem, DisplayPrescriptionLineItem, WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import { ResMedAlternateOption } from '../resource/resmedalternateoption.designer';
import { MedSecondaryTabChild } from '../view/medsecondarytabchild';
import { GridComponent } from '@progress/kendo-angular-grid';
import { MedicationOptionVM } from '../viewmodel/medicationoptionvm';
import { Resource } from '../resource';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { InjectorInstance } from 'src/app/app.module';
import { SubjectEventEmitterService } from 'src/app/shared/epma-platform/services/subject-eventemitter.service';
class testclass {
    field1:string
}

@Component({ selector: 'MedPrescribedOption',
 templateUrl: './medprescribedoption.html',styleUrls: ['./medprescribedoption.css']})

export class MedPrescribedOption extends UserControl implements OnInit, AfterViewInit {
    public objResMedPrescribedOption = Resource.ResMedPrescribedOption;
    public objResMedAlternateOption =Resource.ResMedAlternateOption;
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private chkInclNonFor: iCheckBox;
    @ViewChild("chkInclNonForTempRef", { read: iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox) {
        if (c) { this.chkInclNonFor = c; }
    };
    public grdPrescribe: GridExtension = new GridExtension();
    @ViewChild("grdPrescribeTempRef", { read: GridComponent, static: false }) set _grdPrescribe(c: GridComponent) {
        if (c) 
        { 
            this.grdPrescribe.grid = c;
            this.grdPrescribe.columns = c.columns;
            // this.grdPrescribe.ItemsSourceData = c.data;
        }
    };

    calcHeight = 100;
    @ViewChild("divGrid", { static: false }) divGrid: ElementRef;
   
    MedLineDisplay: DisplayPrescriptionLineItem
    MedOtherDisplay: DisplayOtherInformationLineItem
    NoteToolTip: WrapToolTip
    // objResMedAlternateOption: ResMedAlternateOption
    

    oPresItemDetails: PrescriptionItemVM;
    objDrugItemInputData: DrugItemInputData;
    oDetails: string[];
    objVM: IPPMABaseVM;
    public strDrugName: string;
    public objSecTab: MedSecondaryTabChild;

    public omedtabchild: MedSecondaryTabChild;
    PrescribedOption :  MedicationOptionVM = new MedicationOptionVM();
    public SubjectEventEmitterService: SubjectEventEmitterService=
        InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);
    descriptor: SortDescriptor = new SortDescriptor();
    
    ngAfterViewInit(): void 
    {

        setTimeout(() => {
            this.calcHeight = this.divGrid.nativeElement.clientHeight;    
        }, 0);

        this.grdPrescribe.GenerateColumns();
        //Munuvar suggest fix
       if( this.SubjectEventEmitterService.SearchCompleted )
       { 
        //   setTimeout(() => {
             this.UserControl_Loaded(null, null);
        //  },0);
       }
       else{
        iBusyIndicator.Start("prescribeoption", true);
        this.SubjectEventEmitterService.responseEventEmitter.subscribe(value => {
            this.UserControl_Loaded(null, null);
        })
    }
        //  setTimeout(() => {
        //     this.UserControl_Loaded(null, null);
        //  },2000);
        this.descriptor.Member = 'FormViewerDetails.BasicDetails.OrderSentenceDesc';
       this.grdPrescribe.OriginalItemsSource =  this.PrescribedOption.MedPrescribedOptionList;
    }
    constructor() {
        super();
        // InitializeComponent();
        // this.grdPrescribe.SetBinding(GridComponent.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PrescribedOption.MedPrescribedOptionList"), { Mode: BindingMode.OneWay }));
        this.grdPrescribe.SetBinding('data',this.PrescribedOption.MedPrescribedOptionList);
    }
    ngOnInit(): void {
        this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e); };
        this.grdPrescribe.SortDescriptors.Add(this.descriptor);
    }

    AuthoriseStringEvents(): void {
        if (this.omedtabchild == null) {
            this.omedtabchild = CommonBB.FindParent<MedSecondaryTabChild>(this);
            this.oDetails = this.objVM.SecondaryTabDetails.Split('~');
            let ITMSUBTYP: string = !String.IsNullOrEmpty(this.oDetails[10]) ? this.oDetails[10] : String.Empty;
            if (String.Equals(ITMSUBTYP, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase)) {
                this.omedtabchild.lblDrugtitle.Text = this.omedtabchild.lblDrugtitle.Text + " - " + CConstants.sMCAuthoriseText;
            }
        }
    }
    grdPrescribe_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        this.objDrugItemInputData = new DrugItemInputData();
        if (this.grdPrescribe.GetColumnIndexByName("SelectColumn") == args.ColumnIndex) {
            this.oPresItemDetails = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdPrescribe.GetRowData(args.RowIndex), PrescriptionItemVM);
            if (this.oPresItemDetails.IsProcessinIconEnable) {
                iBusyIndicator.Start("FormViewer", true);
                CommonVariables.FormViewerIsInProgress = true;
            }
            this.oPresItemDetails.IsProcessinIconEnable = false;
            if (this.oPresItemDetails != null && this.oPresItemDetails.FormViewerDetails != null && this.oPresItemDetails.FormViewerDetails.BasicDetails != null) {
                this.objDrugItemInputData.IdentifyingName = this.oPresItemDetails.FormViewerDetails.BasicDetails.IdentifyingName;
                this.objDrugItemInputData.IdentifyingOID = this.oPresItemDetails.FormViewerDetails.BasicDetails.IdentifyingOID;
                this.objDrugItemInputData.IdentifyingType = this.oPresItemDetails.FormViewerDetails.BasicDetails.IdentifyingType;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsFormulary = (this.oPresItemDetails.IsNonformulary == '0') ? true : false;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                if (this.oPresItemDetails.IsAccessContraint != null) {
                    this.objDrugItemInputData.IsAccessContraint = this.oPresItemDetails.IsAccessContraint;
                }
                else {
                    this.objDrugItemInputData.IsAccessContraint = !String.IsNullOrEmpty(this.oDetails[2]) ? this.oDetails[2] : String.Empty;
                }
                if (this.objDrugItemInputData.IsPrescribeByBrand != null) {
                    this.objDrugItemInputData.IsPrescribeByBrand = this.oPresItemDetails.IsPrescribeByBrand;
                }
                else {
                    this.objDrugItemInputData.IsPrescribeByBrand = !String.IsNullOrEmpty(this.oDetails[3]) ? this.oDetails[3] : String.Empty;
                }
                this.objDrugItemInputData.ItemType = this.oPresItemDetails.ItemMainType;
                this.objDrugItemInputData.ITMSUBTYP = this.oPresItemDetails.ItemSubType;
                this.objDrugItemInputData.LorenzoID = this.oPresItemDetails.LorenzoID;
                this.objDrugItemInputData.FormularyNote = !String.IsNullOrEmpty(this.oDetails[6]) ? this.oDetails[6] : String.Empty;
            }
            else if (this.objVM != null) {
                this.objDrugItemInputData.IdentifyingName = this.strDrugName;
                this.objDrugItemInputData.IdentifyingOID = !String.IsNullOrEmpty(this.oDetails[0]) ? Convert.ToInt64(this.oDetails[0]) : 0;
                this.objDrugItemInputData.IdentifyingType = !String.IsNullOrEmpty(this.oDetails[1]) ? this.oDetails[1] : String.Empty;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsFormulary = (!String.IsNullOrEmpty(this.oDetails[7]) && String.Compare(this.oDetails[7], "1") == 0) ? true : false;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.IsAccessContraint = !String.IsNullOrEmpty(this.oDetails[2]) ? this.oDetails[2] : String.Empty;
                this.objDrugItemInputData.IsPrescribeByBrand = !String.IsNullOrEmpty(this.oDetails[3]) ? this.oDetails[3] : String.Empty;
                this.objDrugItemInputData.ItemType = !String.IsNullOrEmpty(this.oDetails[5]) ? this.oDetails[5] : String.Empty;
                this.objDrugItemInputData.FormularyNote = !String.IsNullOrEmpty(this.oDetails[6]) ? this.oDetails[6] : String.Empty;
                this.objDrugItemInputData.ITMSUBTYP = !String.IsNullOrEmpty(this.oDetails[10]) ? this.oDetails[10] : String.Empty;
            }
            if (String.IsNullOrEmpty(this.objDrugItemInputData.LorenzoID) && this.oDetails != null && this.oDetails.length > 8 && !String.IsNullOrEmpty(this.oDetails[8])) {
                this.objDrugItemInputData.LorenzoID = this.oDetails[8];
            }
            if (this.oPresItemDetails != null && this.oPresItemDetails.FormViewerDetails != null && this.oPresItemDetails.FormViewerDetails.BasicDetails != null && this.oPresItemDetails.FormViewerDetails.BasicDetails.Route != null && this.oPresItemDetails.FormViewerDetails.BasicDetails.Route.Tag != null && this.objVM.InfusionContinousSeq != null && (this.oPresItemDetails.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "0" || (this.oPresItemDetails.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "1" && this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionType != null && this.objVM.InfusionContinousSeq.Infusiontype != null && !String.Equals(this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionType.Value, this.objVM.InfusionContinousSeq.Infusiontype.Value))) && (this.objVM.InfusionContinousSeq.SequentialRoute != null || this.objVM.InfusionContinousSeq.SequentialMultiplsRoutes != null) && this.objVM.InfusionContinousSeq.IsSequentialPrescribing) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "Lorenzo - Manage prescription",
                    Message: Infusion.SequentialRouteDifferentitemlevel_Message,
                    MessageButton: MessageBoxButton.OKCancel,
                    IconType: MessageBoxType.Question
                });
                iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
                iMsgBox.Show();
            }
            else {
                this.objVM.PrescribeNewItemEvent = (s) => { this.objMPVM_PrescribeNewItemEvent(s); };
                if (this.oPresItemDetails.IsOther) {
                    this.objVM.IsOtherClick = true;
                     this.objVM.PrescribeNewItem(this.objDrugItemInputData);
                }
                else {
                    this.oPresItemDetails.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                    this.oPresItemDetails.ePrescribeSource = PrescribeSource.DOS;
                     this.objVM.PrescribeNewItem(this.objDrugItemInputData, this.oPresItemDetails);
                }
            }
        }
    }
    public dialog:MedSecondaryTabChild;
    objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {       
        //this.objVM.oSecChild.appDialog.DialogResult = IsChildWindowClosed;
        this.objVM.oSecChild.dupDialogRef.close();
        
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.objVM.PrescribeNewItemEvent = (s) => { this.objMPVM_PrescribeNewItemEvent(s); };
            this.objVM.InfusionContinousSeq = new InfContinousSequentail();
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData = new InfContinousSequentail();
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder = 0;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber = 0;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi = Visibility.Collapsed;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.IsSequentiallinkvisi = Visibility.Collapsed;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.IsDisplayOrderSeqPresc = String.Empty;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.CurrentSequentialOrder = 0;
            this.oPresItemDetails.FormViewerDetails.BasicDetails.InfusionDetails.IsShowRouteDiscrepency = false;
            if (this.oPresItemDetails.IsOther)
                this.objVM.PrescribeNewItem(this.objDrugItemInputData);
            else {
                this.oPresItemDetails.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                this.objVM.PrescribeNewItem(this.objDrugItemInputData, this.oPresItemDetails);
            }
        }
        else {
            if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                Busyindicator.SetStatusIdle("FormViewer");
            }
        }
    }
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
     
        if (this.DataContext != null) {
            this.objVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
            if (this.objVM != null) {
                // console.log("UserControl_Loaded.intial",(new Date()).getTime().toString());
                ObjectHelper.CreateObject(this.PrescribedOption.MedPrescribedOptionList,this.objVM.PrescribedOption.MedPrescribedOptionList);
                this.grdPrescribe.SetBinding('data',this.DataContext.PrescribedOption.MedPrescribedOptionList);
                // console.log("UserControl_Loaded",this.PrescribedOption.MedPrescribedOptionList,this.objVM.PrescribedOption.MedPrescribedOptionList,this.objVM.PrescribedOption.MedPrescribedOptionList['length']);
                this.objVM.AuthoriseStringEvent = (s, e) => { this.AuthoriseStringEvents(); };
                this.oDetails = this.objVM.SecondaryTabDetails.Split('~');
                if (!String.IsNullOrEmpty(this.oDetails[15])) {
                    this.dialog.R_Name.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                   // this.dialog.R_Name.TextData = this.oDetails[15];
                    let sToolTip: string = String.Empty;
                    if (this.oDetails[15].length > 200) {
                        sToolTip = this.oDetails[15].Substring(0, 199) + "...";
                        this.dialog.R_Name.ToolTip = sToolTip;
                    }
                    else {
                        this.dialog.R_Name.ToolTip = this.oDetails[15];
                    }
                    this.objVM.oSecChild.R_Name.Visibility = Visibility.Visible;
                }
                else {
                    this.dialog.R_Name.Source = null;
                   // this.dialog.R_Name.TextData = String.Empty;
                    this.dialog.R_Name.ToolTip = String.Empty;
                }
            }
            //  this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e); };
        }
        iBusyIndicator.Stop("prescribeoption");
    }
    private DisposeFormObjects(): void {
        if (this.objVM != null) {
            this.oPresItemDetails = null;
            this.objDrugItemInputData = null;
            this.oDetails = null;
        }
    }
    private DisposeFormEvents(): void {
        // grdPrescribe.onCellClick -= grdPrescribe_onCellClick;
        // if (this.objVM != null) {
        //     this.objVM.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
        //     this.objVM.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
        //     this.objVM.AuthoriseStringEvent -= AuthoriseStringEvents;
        // }
    }
    private MedPrescribedOption_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
        this.DisposeFormObjects();
    }
}
