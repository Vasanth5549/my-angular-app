import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, RadRoutedEventArgs, Visibility } from 'epma-platform/models';
import { AppDialog, BitmapImage, Color, Colors, DataTemplate, FontWeights, FrameworkElement, Grid, HorizontalAlignment, ScrollViewer, SolidColorBrush, StackPanel, TextBlock, TextWrapping, Thickness, ToolTipService, Uri, UriKind, UserControl, iCheckBox, iTextBox, iComboBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { RadExpander } from 'src/app/shared/epma-platform/controls/epma-radExpander/epma-radExpander.component';
import { DRCConflictDetail, MedDRCVM } from '../viewmodel/meddrcvm';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import {  VerticalAlignment } from "epma-platform/controls";
import { Image } from 'src/app/shared/epma-platform/controls/epma-image/epma-image.component';
import { MedImage, MedImages } from 'src/app/product/shared/models/constant';
import { CommonService } from 'src/app/product/shared/common.service';
import { QueryStringInfo } from '../utilities/globalvariable';

@Component({
    selector: 'medDRC',
    templateUrl: './meddrc.html',
    styleUrls: ['./meddrc.css']

})
export class medDRC extends UserControl implements AfterViewInit {
    bIsLoaded: boolean = false;
    objVM: PrescriptionItemVM;
    private grdConflictDtls: GridExtension = new GridExtension();
    DRCConflictDetail: any=[];
    public Styles = ControlStyles;
    @ViewChild('grdConflictDtlsTempRef', { read: GridComponent }) set _grdConflictDtls(c: GridComponent) {
        this.grdConflictDtls.grid = c;
    }




    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private svwDRCConflict: ScrollViewer;
    @ViewChild("svwDRCConflictTempRef", { read: ScrollViewer }) set _svwDRCConflict(c: ScrollViewer) {
        if (c) { this.svwDRCConflict = c; }
    };
    public DRCConflictItems: StackPanel;
    @ViewChild("DRCConflictItemsTempRef", { read: StackPanel }) set _DRCConflictItems(c: StackPanel) {
        if (c) { this.DRCConflictItems = c; }
    };
    private AcknowldgeRSN: Grid;
    @ViewChild("AcknowldgeRSNTempRef", { read: Grid }) set _AcknowldgeRSN(c: Grid) {
        if (c) { this.AcknowldgeRSN = c; }
    };
    private ilblAcknowldgeRSN: iLabel;
    @ViewChild("ilblAcknowldgeRSNTempRef", { read: iLabel }) set _ilblAcknowldgeRSN(c: iLabel) {
        if (c) { this.ilblAcknowldgeRSN = c; }
    };
    private lblAcknowledgementRsn: iLabel;
    @ViewChild("lblAcknowledgementRsnTempRef", { read: iLabel }) set _lblAcknowledgementRsn(c: iLabel) {
        if (c) { this.lblAcknowledgementRsn = c; }
    };
    private Acknowldge: Grid;
    @ViewChild("AcknowldgeTempRef", { read: Grid }) set _Acknowldge(c: Grid) {
        if (c) { this.Acknowldge = c; }
    };
    private ilblDRCkAcknowldgeMsg: iLabel;
    @ViewChild("ilblDRCkAcknowldgeMsgTempRef", { read: iLabel }) set _ilblDRCkAcknowldgeMsg(c: iLabel) {
        if (c) { this.ilblDRCkAcknowldgeMsg = c; }
    };
    private chcDRCkAcknowldge: iCheckBox;
    @ViewChild("chcDRCkAcknowldgeTempRef", { read: iCheckBox }) set _chcDRCkAcknowldge(c: iCheckBox) {
        if (c) { this.chcDRCkAcknowldge = c; }
    };
    private lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    private CommentsText: StackPanel;
    @ViewChild("CommentsTextTempRef", { read: StackPanel }) set _CommentsText(c: StackPanel) {
        if (c) { this.CommentsText = c; }
    };
    private txtComments: iTextBox;
    @ViewChild("txtCommentsTempRef", { read: iTextBox, static: false }) set _txtComments(c: iTextBox) {
        if (c) { this.txtComments = c; }
    };
    public cboMedDRCReason: iComboBox;
    @ViewChild("cboMedDRCReasonTempRef", { read: iComboBox, static: false }) set _cboUOM(c: iComboBox) {
        if (c) { this.cboMedDRCReason = c; }
    };
    public tempRef: TemplateRef<any>;
    @ViewChild('DRCConflictTemp', { read: TemplateRef }) set itemTemplate(value) {
        this.tempRef = value;
    }
    errorCode = Resource.DRCConflict;
    errorMessage = Resource.DRCConflict;
    constructor() {
        super();
    }
    ngOnInit(): void {
        this.grdConflictDtls.RowIndicatorVisibility = Visibility.Collapsed;

      }
    public maxGridHeight;
    public maxHeight = 10;
    ngAfterViewInit(): void {
        // generate columns is used to access the column data using uniquename
        // this.grdConflictDtls.GenerateColumns();
        this.LayoutRoot_Loaded(null, null);
        this.maxGridHeight = CommonService.setDynamicScrollviewerHeight();
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxGridHeight -= 150;
        }
        else {
            if (this.maxGridHeight) {
                this.maxGridHeight -= 147; // acknowledge reason (kendo-gridlayout-item) + tabstrip = 102 + 42 = 147
            }
        }
        if((!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
      String.Equals(
       QueryStringInfo.IsLaunchformMedchart,
       'True',
       StringComparison.InvariantCultureIgnoreCase
     )) || (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschart) &&
     String.Equals(
       QueryStringInfo.IsLaunchformPreschart,
       'True',
       StringComparison.InvariantCultureIgnoreCase
     ))){
        this.maxGridHeight -= 31;
        this.maxHeight =5;
     }
    }
    private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null) {
            this.bIsLoaded = true;
            this.objVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.objVM != null) {
                if (this.objVM.IsFormViewerDisable) {
                    this.ilblAcknowldgeRSN.IsEnabled = false;
                    this.cboMedDRCReason.IsEnabled = false;
                    this.ilblDRCkAcknowldgeMsg.IsEnabled = false;
                    this.chcDRCkAcknowldge.IsEnabled = false;
                }
                this.objVM.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                this.objVM.IsDRCConflictViewed = true;
                this.objVM.DRCConflictsDelegateCompleted = (s, e) => {
                    this.objVM_DRCConflictsDelegateCompleted();
                }
                this.LoadDRCConflict();
            }
        }
    }
    LoadDRCConflict(): void {
        if (this.DRCConflictItems != null && this.DRCConflictItems.Children != null)
            this.DRCConflictItems.Children.Clear();
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.PresItemDRCVM != null && this.objVM.FormViewerDetails.PresItemDRCVM.MedDRCVM != null && this.objVM.FormViewerDetails.PresItemDRCVM.MedDRCVM.Count > 0) {
            let _counter: number = 1;
            this.objVM.FormViewerDetails.PresItemDRCVM.MedDRCVM.forEach((omedDRC) => {
                if (omedDRC.DRCConflictDetail != null && omedDRC.DRCConflictDetail.Count > 0) {
                    if (omedDRC.DRCOutCome) {
                        let dosetype: RadExpander = this.CreateAConflictItem(omedDRC, null, _counter);
                        let frmElementItm = this.tempRef;
                        if (frmElementItm != null && !String.IsNullOrEmpty(frmElementItm['Name'])) {
                            frmElementItm['Name'] += _counter;
                        }
                        if (omedDRC.DRCOutCome) {
                            frmElementItm['DataContext'] = omedDRC;
                        }
                        else {
                            let objmedDRC: MedDRCVM = new MedDRCVM();
                            objmedDRC.DRCConflictDetail = new ObservableCollection<DRCConflictDetail>();
                            let objDRCConflictDetail: DRCConflictDetail = new DRCConflictDetail();
                            objDRCConflictDetail.ERRORText = omedDRC.DRCDefDoseType;
                            objDRCConflictDetail.ErrorMessage = omedDRC.DRCMessage;
                            this.DRCConflictDetail=[];
                            this.DRCConflictDetail.push(objDRCConflictDetail);
                            objmedDRC.DRCConflictDetail.Add(objDRCConflictDetail);
                            frmElementItm['DataContext'] = objmedDRC;
                        }
                        dosetype.Content = frmElementItm;
                        // dosetype.Expanded += dosetype_Expanded;
                        // dosetype.Collapsed += dosetype_Collapsed;
                        let _expander: RadRoutedEventArgs = ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => { this.dosetype_Expanded(null, R) }, RadExpander);
                        dosetype.Expanded.emit(_expander);

                        let _collapsed: RadRoutedEventArgs = ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => { this.dosetype_Collapsed(null, R) }, RadExpander);
                        dosetype.Collapsed.emit(_collapsed);
                        dosetype.Tag = omedDRC.DRCOutCome;
                        _counter++;
                        this.DRCConflictItems.Children.Add(dosetype);
                    }
                    else {
                        omedDRC.DRCConflictDetail.forEach((DRCConflict) => {
                            let dosetype: RadExpander = this.CreateAConflictItem(omedDRC, DRCConflict, _counter);
                            if (omedDRC.DRCConflictDetail != null && omedDRC.DRCConflictDetail.Count > 0) {
                                let frmElementItm = this.tempRef;
                                if (frmElementItm != null && !String.IsNullOrEmpty(frmElementItm['Name'])) {
                                    frmElementItm['Name'] += _counter;
                                }
                                if (omedDRC.DRCOutCome) {
                                    frmElementItm['DataContext'] = omedDRC;
                                }
                                else {
                                    let objmedDRC: MedDRCVM = new MedDRCVM();
                                    objmedDRC.DRCConflictDetail = new ObservableCollection<DRCConflictDetail>();
                                    let objDRCConflictDetail: DRCConflictDetail = new DRCConflictDetail();
                                    objDRCConflictDetail.ERRORText = omedDRC.DRCDefDoseType;
                                    objDRCConflictDetail.ErrorMessage = omedDRC.DRCMessage;
                                    this.DRCConflictDetail=[];
                                    this.DRCConflictDetail.push(objDRCConflictDetail);
                                    objmedDRC.DRCConflictDetail.Add(objDRCConflictDetail);
                                    frmElementItm['DataContext'] = objmedDRC;
                                }
                                dosetype.Content = frmElementItm;
                                let _expander: RadRoutedEventArgs = ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => { this.dosetype_Expanded(null, R) }, RadExpander);
                                dosetype.Expanded.emit(_expander);

                                let _collapsed: RadRoutedEventArgs = ObjectHelper.CreateType<RadRoutedEventArgs>((s, R) => { this.dosetype_Collapsed(null, R) }, RadExpander);
                                dosetype.Collapsed.emit(_collapsed);

                                // dosetype.Expanded = (s,e) =>{
                                //     this.dosetype_Expanded(s,e);
                                // } 
                                // dosetype.Collapsed = (s,e) =>{
                                //     this.dosetype_Collapsed(s,e);
                                // } 
                                //  dosetype.Expanded = dosetype_Expanded;
                                // dosetype.Collapsed += dosetype_Collapsed;
                                dosetype.Tag = omedDRC.DRCOutCome;
                                _counter++;
                            }
                            this.DRCConflictItems.Children.Add(dosetype);
                          
                        });
                    }
                }
            });
        }
    }
    private dosetype_Collapsed(sender: Object, e: RadRoutedEventArgs): void {
        let isflag: boolean = <boolean>(ObjectHelper.CreateType<RadExpander>((e.Source), RadExpander)).Tag;
        let _expander: RadExpander = ObjectHelper.CreateType<RadExpander>((e.Source), RadExpander);
        if (_expander != null && !isflag) {
            ToolTipService.SetToolTip(_expander, "Click to view more information");
        }
    }
    dosetype_Expanded(sender: Object, e: RadRoutedEventArgs): void {
        let isflag: boolean = <boolean>(ObjectHelper.CreateType<RadExpander>((e.Source), RadExpander)).Tag;
        let _expander: RadExpander = ObjectHelper.CreateType<RadExpander>((e.Source), RadExpander);
        if (_expander != null) {
            if (isflag) {
                _expander.IsExpanded = false;
            }
            else {
                ToolTipService.SetToolTip(_expander, "Click to view less information");
            }
        }
    }
    objVM_DRCConflictsDelegateCompleted(): void {
        this.LoadDRCConflict();
    }
    private GetTemplate(TemplateKey: string): TemplateRef<any> {
        // return this[TemplateKey];
        try {
            let oFrameworkElement: TemplateRef<any>;
            let dtDrugDetails: DataTemplate = <DataTemplate>this.LayoutRoot[TemplateKey];
            if (dtDrugDetails == null)
                return null;
            oFrameworkElement = ObjectHelper.CreateType<TemplateRef<any>>(dtDrugDetails.Content, TemplateRef);
            return oFrameworkElement;
        }
        catch (err) {
            return null;
        }

    }
    private CreateAConflictItem(objMedDRCVM: MedDRCVM, DRCConflict: DRCConflictDetail, counter: number): RadExpander {
        let item: RadExpander = new RadExpander();
        if (objMedDRCVM != null) {
            let stPanel: StackPanel = new StackPanel();
            stPanel.heightchanged = (el) => {
                let tbs = el.nativeElement.getElementsByTagName("textblock");
                let height = 0
                for (let i = 0; i < tbs.length; i++) {
                    height = height + tbs[i].getElementsByTagName("div")[0].clientHeight;
                }
                el.nativeElement.style.height = (height == 0) ? "auto" : height + 'px';
            }
            stPanel.VerticalAlignment = VerticalAlignment.Top;
            stPanel.Orientation = Orientation.Horizontal;
            let sTitle: string = String.Empty;
            let lbl1: iLabel = null;
            if (objMedDRCVM.DRCOutCome) {
                sTitle = objMedDRCVM.DRCDefDoseType;
                let txtlength: number = sTitle.length;
                let addlen: number = 0;
                if (txtlength < 11) {
                    addlen = 11;
                }
                for (let i: number = 0; i < addlen; i++) {
                    sTitle += " ";
                }
                lbl1 = ObjectHelper.CreateObject(new iLabel(), { Text: sTitle, FontWeight: FontWeights.ExtraBold });
                lbl1.Text += " - ";
            }
            else {
                ToolTipService.SetToolTip(item, "Click to view less information");
                if (DRCConflict != null && !String.IsNullOrEmpty(DRCConflict.ERRORText)) {
                    sTitle = DRCConflict.ERRORText;
                    sTitle += "  ";
                    lbl1 = ObjectHelper.CreateObject(new iLabel(), { Text: sTitle, FontWeight: FontWeights.ExtraBold });
                }
            }
            stPanel.Children.Add(lbl1);
            if (objMedDRCVM.DRCOutCome) {
                stPanel.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.AcknowledgedIcon)))
                stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: " ", Width: 10, TextWrapping: TextWrapping.Wrap ,style:{'display':'inline-block' }}));
                stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), {
                     Text: objMedDRCVM.DRCMessage, Width: 760, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block' } 
                    }));
            }
            else {
                if (DRCConflict != null && !String.IsNullOrEmpty(DRCConflict.ErrorMessage)) {
                    var MTop=(DRCConflict.ErrorMessage.length<135)?"3px":"0px"
                    stPanel.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.Removefieldhot)))
                    stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: " ", Width: 10, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block' } }));
                    stPanel.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: DRCConflict.ErrorMessage, Width: 760, TextWrapping: TextWrapping.Wrap,style:{'display':'inline-block','margin-top':MTop }  }));
                }
            }
            item.Header = stPanel;
            item.Background = new SolidColorBrush(Color.FromArgb(255, 121, 192, 193));
            item.BorderThickness = new Thickness(1);
            item.BorderBrush = new SolidColorBrush(Colors.Black);
            if (objMedDRCVM.DRCOutCome) {
                item.Name = "rder_" + objMedDRCVM.DRCDefDoseTypeCode;
                item.IsExpanded = false;
                item.CanExpand = true;
            }
            else {
                if (DRCConflict != null && !String.IsNullOrEmpty(DRCConflict.ERRORCode)) {
                    item.Name = "rder_" + String.Concat(objMedDRCVM.DRCDefDoseTypeCode, "_", DRCConflict.ERRORCode, "_", counter);
                }
                item.IsExpanded = true;
            }
        }
        return item;
    }
    public DisposeFormEvents(): void {
        this.objVM.DRCConflictsDelegateCompleted = undefined;
    }
    private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    ngOnDestroy(): void {
        this.UserControl_Unloaded(null,null);
        this.DRCConflictDetail = [];
      }
    private GetImage(sName: string, sPath: string): Image {
        let infoIcon: Image = new Image();
        infoIcon.HorizontalAlignment = HorizontalAlignment.Center;
        infoIcon.VerticalAlignment = VerticalAlignment.Center;
        infoIcon.Name = sName;
        infoIcon.Margin = new Thickness(2);
        infoIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
    //     if (!String.IsNullOrEmpty(sToolTip))
    //         ToolTipService.SetToolTip(infoIcon, sToolTip);
       return infoIcon;
     }
}
