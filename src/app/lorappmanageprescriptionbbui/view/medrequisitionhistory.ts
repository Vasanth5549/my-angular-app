import { Component, Input, ViewChild } from '@angular/core';
import { StringBuilder, Convert } from 'epma-platform/services';
import { StringComparison, ObservableCollection, Visibility } from 'epma-platform/models';
import { BitmapImage, Image, ContentPresenter, HorizontalAlignment, Stretch, TextBlock, Thickness, ToolTipService, Uri, UriKind, UserControl, VerticalAlignment, iLabel } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { StackPanel } from 'src/app/shared/epma-platform/controls/epma-stackpanel/epma-stackpanel.component';
import { LineDisplayHelper } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { Environment } from 'src/app/product/shared/models/Common';
import { CConstants, MedImage, MedImages, PrescriptionTypes } from '../utilities/constants';
import { ProfileData } from 'src/app/lorappmanageprescriptionbbui/utilities/profiledata';
import { PrescriptionItemVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/PrescriptionItemVM';
import { RequisitionHistoryVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/RequisitionHistoryVM';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { FormviewerDisplayHelper } from 'src/app/product/shared/convertor/medicationconverters.service';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridComponent } from '@progress/kendo-angular-grid';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonService } from 'src/app/product/shared/common.service';
import { QueryStringInfo } from '../utilities/globalvariable';

@Component({
    selector: 'medrequisitionhistory',
    templateUrl: './medrequisitionhistory.html',
    styleUrls: ['./medrequisitionhistory.css']
})

export class medrequisitionhistory extends UserControl {

    public grdRequisitionHistory: GridExtension = new GridExtension();

    private LayoutRoot: GridExtension;
    @ViewChild("LayoutRootTempRef", { read: GridExtension, static: false }) set _LayoutRoot(c: GridExtension) {
        if (c) { this.LayoutRoot = c; }
    };
    private MedLineDisplay: ContentPresenter;
    @ViewChild("MedLineDisplayTempRef", { read: ContentPresenter, static: false }) set _MedLineDisplay(c: ContentPresenter) {
        if (c) { this.MedLineDisplay = c; }
    };
    private lblDrugName: iLabel;
    @ViewChild("lblDrugNameTempRef", { read: iLabel, static: false }) set _lblDrugName(c: iLabel) {
        if (c) { this.lblDrugName = c; }
    };
    private DrugIcons: StackPanel;
    @ViewChild("DrugIconsTempRef", { read: StackPanel, static: false }) set _DrugIcons(c: StackPanel) {
        if (c) { this.DrugIcons = c; }
    };
    private lblpropduct: iLabel;
    @ViewChild("lblpropductTempRef", { read: iLabel, static: false }) set _lblpropduct(c: iLabel) {
        if (c) { this.lblpropduct = c; }
    };

    @ViewChild("grdRequisitionHistoryTempRef", { read: GridComponent, static: false }) set _grdRequisitionHistory(c: GridComponent) {
        if (c) {
            this.grdRequisitionHistory.grid = c;
            this.grdRequisitionHistory.columns = c.columns;
        }
    };

    public oVM: RequisitionHistoryVM = new RequisitionHistoryVM();
    public localPresItemVM: PrescriptionItemVM;

    private _MedlineVisibility: Visibility = Visibility.Visible;
    private _DrugVisibility: Visibility = Visibility.Visible;
    public get MedlineVisibility(): Visibility {
        return this._MedlineVisibility;
    }
    public set MedlineVisibility(value: Visibility) {
        this._MedlineVisibility = value;
    }
    public get DrugVisibility(): Visibility {
        return this._DrugVisibility;
    }
    public set DrugVisibility(value: Visibility) {
        this._DrugVisibility = value;
    }

    constructor() {
        super();
    }

    override _DataContext: any;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }

    public maxGridHeight;
    ngAfterViewInit(): void {
        this.grdRequisitionHistory.GenerateColumns();
        this.RequisitionHistory_Loaded({}, null);
        if (this.localPresItemVM != null)
            this.constructorCtrlsAccess(this.localPresItemVM)
        this.grdRequisitionHistory.SetBinding('data', this.oVM.RequisitionHistoryList);
    
        this.maxGridHeight = CommonService.setDynamicScrollHeight_MedSupplyInstructions("#medrequisitionHistory");
        if(this.maxGridHeight){
            if(window.screen.height > 1000 && window.devicePixelRatio != 1.25){
                this.maxGridHeight = this.maxGridHeight - 10;
              }else if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                this.maxGridHeight = this.maxGridHeight - 239;
              }else{
                this.maxGridHeight = this.maxGridHeight - 20;
              }
        }
        if (((!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
        String.Equals(
          QueryStringInfo.IsLaunchformMedchart,
          'True',
          StringComparison.InvariantCultureIgnoreCase
        )) || (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) &&
          String.Equals(
            QueryStringInfo.IsClinicalNote,
            'Yes',
            StringComparison.InvariantCultureIgnoreCase
          )) || (!String.IsNullOrEmpty(QueryStringInfo.FromPreschart) &&
            String.Equals(
              QueryStringInfo.FromPreschart,
              'True',
              StringComparison.InvariantCultureIgnoreCase
            )) || (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschartReview) &&
            String.Equals(
              QueryStringInfo.IsLaunchformPreschartReview,
              'True',
              StringComparison.InvariantCultureIgnoreCase
            )) || (!String.IsNullOrEmpty(QueryStringInfo.FromClinicalNote) &&
            String.Equals(
              QueryStringInfo.FromClinicalNote,
              'True',
              StringComparison.InvariantCultureIgnoreCase
            ))) && window.devicePixelRatio == 1.25) {
            this.maxGridHeight = this.maxGridHeight - 45;
        }
        if(!this.maxGridHeight){
            if(window.screen.height > 1000 && window.devicePixelRatio != 1.25){
                this.maxGridHeight = window.innerHeight - 309;
              }else if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                this.maxGridHeight = window.innerHeight - 230;
              }else{
                this.maxGridHeight = window.innerHeight - 250;
              }
        }
}

    constructorCtrlsAccess(PresItemVM) {
        if (PresItemVM != null && PresItemVM.FormViewerDetails != null && PresItemVM.FormViewerDetails.BasicDetails != null) {
            if (!PresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
                this.SetDrugHeaderContent(PresItemVM);
            }
        }
    }

    RequisitionHistory_Loaded(sender?: Object, e?: RoutedEventArgs): void {
        if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig) {
            this.grdRequisitionHistory.Columns["Status"].IsVisible = true;
        }
        else {
            this.grdRequisitionHistory.Columns["Status"].IsVisible = false;
            this.grdRequisitionHistory.Columns["ReqCanBy"].Header = "Requested by";
        }
        if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
            let P: string[] = PatientContext.PrescriptionOID.Split(',');
            if (P.length == 1) {
                this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
            }
        }
    }

    constructorImpl1(sLorenzo: string, OpresItemVm: PrescriptionItemVM) {
        this.grdRequisitionHistory.HorizontalAlignment = "Center"; // HorizontalAlignment.Center;
        this.grdRequisitionHistory.HorizontalContentAlignment = "Center"; // HorizontalAlignment.Center;

        // TODO - REVISIT REQUIRED
        /*
        this.grdRequisitionHistory.MinWidth = "885";
        this.grdRequisitionHistory.Columns[4].MinWidth = 200;
        */

        let grdSize: Thickness = new Thickness();
        grdSize.Left = Number.Parse("64.5");
        grdSize.Right = Number.Parse("0");
        grdSize.Top = Number.Parse("0");
        grdSize.Bottom = Number.Parse("25");
        this.grdRequisitionHistory.Margin = grdSize;
        this.DataContext = new RequisitionHistoryVM(sLorenzo, OpresItemVm);
        this.oVM.getdata.subscribe(x => { this.grdRequisitionHistory.SetBinding('data', this.oVM.RequisitionHistoryList); })

        // if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
        //     let P: string[] = PatientContext.PrescriptionOID.Split(',');
        //     if (P.length == 1) {
        //         this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
        //     }
        // }

        if (this.DataContext != null) {
            this.oVM = ObjectHelper.CreateType<RequisitionHistoryVM>(this.DataContext, RequisitionHistoryVM);
        }
        this.DataContext = this.oVM;
        this.localPresItemVM = OpresItemVm;
    }

    constructorImpl2(sDrugName: string, sLorenzo: string, OpresItemVm: PrescriptionItemVM) {

        this.DataContext = new RequisitionHistoryVM(sDrugName, sLorenzo, OpresItemVm);
        this.DataContext.sDrugName = sDrugName;
        this.oVM.getdata.subscribe(x => { this.grdRequisitionHistory.SetBinding('data', this.oVM.RequisitionHistoryList); })

        if (OpresItemVm != null && OpresItemVm.FormViewerDetails != null && OpresItemVm.FormViewerDetails.BasicDetails != null) {
            if (!OpresItemVm.FormViewerDetails.BasicDetails.DisplayFlag) {
                this.SetDrugHeaderContent(OpresItemVm);
            }
        }

        if (this.DataContext != null) {
            this.oVM = ObjectHelper.CreateType<RequisitionHistoryVM>(this.DataContext, RequisitionHistoryVM);
        }
        this.DataContext=this.oVM;
        this.localPresItemVM = OpresItemVm;
    }

    public GetLineItem(lPrescriptionItemOID: number): void {
        let oMedicationDrugDetailsVM: PrescriptionItemDetailsVM = new PrescriptionItemDetailsVM();
        oMedicationDrugDetailsVM.PrescriptionItemOID = lPrescriptionItemOID;
        oMedicationDrugDetailsVM.MedLineItemEvent = (s, e) => { this.oMedicationDrugDetailsVM_MedLineItemEvent(s); };
        oMedicationDrugDetailsVM.GetDrugDetailsWithDomainCodeValues();
    }

    private oMedicationDrugDetailsVM_MedLineItemEvent(PresItemDetails: PrescriptionItemDetailsVM): void {
        if (MedicationCommonProfileData.MedLineDisplay != null) {
            let tbTextBlock: TextBlock = null;
            this.MedLineDisplay.Content = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVM(PresItemDetails), 200, String.Empty, (o) => { tbTextBlock = o; });
        }
    }

    public SetDrugHeaderContent(PresItemVM: PrescriptionItemVM): void {
        if (this.DrugIcons != null && this.DrugIcons.Children != null) {
            this.DrugIcons.Children.Clear();
            let sTooltip: string[] = null;
            if (!String.IsNullOrEmpty(PresItemVM.ItemSubType) && (String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0)) {
                let MCtooltip: string = String.Empty;
                let sTip: StringBuilder = new StringBuilder();
                if (!String.IsNullOrEmpty(PresItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay)) {
                    sTooltip = PresItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay.Split('^');
                    let nLength: number = sTooltip.length;
                    for (let i: number = 0; i < nLength; i++) {
                        sTip.Append(sTooltip[i]);
                        sTip.Append(Environment.NewLine);
                    }
                }
                MCtooltip = sTip.ToString();
                MCtooltip = MCtooltip.TrimEnd('\n');
                MCtooltip = MCtooltip.TrimEnd('\r');
                let img1: Image = ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(2, 0, 2, 0) });
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ImgMltcmpnt), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 275, IsWordwrap: true, Text: MCtooltip }));
                img1.VerticalAlignment = VerticalAlignment.Bottom;
                this.DrugIcons.Children.Add(img1);
            }
            if ((PresItemVM.FormViewerDetails.BasicDetails.DrugProperties != null && PresItemVM.FormViewerDetails.BasicDetails.DrugProperties.Count > 0) && ((String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) || (String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0))) {
                FormviewerDisplayHelper.GetDrugProperties(PresItemVM.FormViewerDetails.BasicDetails.DrugProperties, PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, this.DrugIcons, PresItemVM.FormViewerDetails.BasicDetails.itemSubType);
                if (String.Compare(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.CATALOGUEITEM) != 0 && String.Compare(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.ACTUALMOIETY) != 0) {
                    let obsProp: ObservableCollection<ManagePrescSer.DrugProperty> = PresItemVM.FormViewerDetails.BasicDetails.DrugProperties;
                    let CntrlDrugs = obsProp.Where(obj => String.Compare(obj.DrugPropertyCode, "CC_CNTRLDDRUG") == 0);
                    if (CntrlDrugs != null && CntrlDrugs.Count() > 0) {
                        if ((PresItemVM.ItemSubType != CConstants.SUBTYPE)) {
                            if ((String.Compare(PatientContext.PrescriptionType, CConstants.Clerking) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0)) {
                                if (PresItemVM.FormViewerDetails.BHasFormViewParams && PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory) {
                                    PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = true;
                                }
                                else PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = false;
                            }
                            else {
                                PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = true;
                            }
                        }
                    }
                }
            }
        }
    }
}
