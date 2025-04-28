import { ObjectHelper } from 'epma-platform/helper';
import {
  AppDialogEventargs,
  AppDialogResult,
  ChildWindow,
  HtmlPage,
  IEnumerable,
  KeyEventArgs,
  List,
  ObservableCollection,
  Visibility,
  WindowButtonType,
  StringComparison,
  StringSplitOptions
} from 'epma-platform/models';
import {
  AppActivity,
  Convert,
  iMessageBox,
  MessageBox,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
  ProfileFactoryType,
  StringBuilder,
} from 'epma-platform/services';
import {
  CListItem,
  IProfileProp,
  TextWrapping,
} from 'src/app/shared/epma-platform/models/model';
import { ActivityTypes, ConflictIcons } from '../model/common';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { Resource } from '../resource';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
  CommonFlags,
  GlobalVariable,
  QueryStringInfo,
} from '../utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import {
  Border,
  ContentPresenter,
  iButton,
  iCheckBox,
  iLabel,
  iTab,
  iTabItem,
  Image,
  CheckBox,
  Thickness,
  DataTemplate,
  UserControl,
  HorizontalAlignment,
  TextBlock,
  Stretch,
  BitmapImage,
  Uri,
  UriKind,
  VerticalAlignment,
  ToolTipService,
  Grid,
  StackPanel,
  HeaderImageListItem,
  HeaderImageAlignment,
} from 'epma-platform/controls';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  CellComponent,
  ColumnComponent,
  GridComponent,
  PageChangeEvent,
  RowArgs,
  RowClassArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';

import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { MonoGraphVM } from 'src/app/lorappmedicationcommonbb/viewmodel/MonographVM';
import { PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { Environment } from '../../product/shared/models/Common';
import { RadSelectionChangedEventArgs } from 'src/app/shared/epma-platform/models/appdialog.type';
import {
  CResMsgGetPatientMedicationCount,
  GetPatientMedicationCountCompletedEventArgs,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import {
  GridExtension,
  GridViewCell,
  GridViewColumn,
  GridViewRow,
  RowLoadedEventArgs,
  SelectionChangeEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ApplicationHelper } from 'src/app/shared/epma-platform/services/applicationhelper.service';
import { GridLayoutDirective } from 'src/app/shared/epma-platform/controls/Directives/common.directive';
import { medQuickselect } from './medquickselect';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { SupplyHistoryVM } from '../viewmodel/SupplyHistoryVM';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CConstants, MedImage, MedImages, PrescriptionTypes } from '../utilities/constants';
import { LineDisplayHelper } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { FormviewerDisplayHelper } from 'src/app/product/shared/convertor/medicationconverters.service';
import { CommonService } from 'src/app/product/shared/common.service';


@Component({
  selector: 'Medsupplyhistory',
  templateUrl: './medsupplyhistory.html',
  styleUrls: ['./medsupplyhistory.css']
})
export class medsupplyhistory extends UserControl {

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

public objhistory: SupplyHistoryVM;

public RefreshWardStockIcon: Function; 
  
  private MedLineDisplay: ContentPresenter;
  @ViewChild("MedLineDisplayTempRef", { read: ContentPresenter, static: false }) set _MedLineDisplay(c: ContentPresenter) {
    if (c) { this.MedLineDisplay = c; }
  };
  private DrugIcons: StackPanel;
  @ViewChild("DrugIconsTempRef", { read: StackPanel, static: false }) set _DrugIcons(c: StackPanel) {
    if (c) { this.DrugIcons = c; }
  };
  public grdWardStock: GridExtension = new GridExtension();;
  @ViewChild("grdWardStockTempRef", { read: GridComponent, static: false }) set _grdWardStock(c: GridComponent) {
    if (c) { this.grdWardStock.grid = c; }
  };
  private LayoutRoot: Grid;
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };
  private lblDrugName: iLabel;
  @ViewChild("lblDrugNameTempRef", { read: iLabel, static: false }) set _lblDrugName(c: iLabel) {
    if (c) { this.lblDrugName = c; }
  };
  private lblpropduct: iLabel;
  @ViewChild("lblpropductTempRef", { read: iLabel, static: false }) set _lblpropduct(c: iLabel) {
    if (c) { this.lblpropduct = c; }
  };


  // constructor(identifyingOID: number, Identifyingtype: string, routeOID: string, drugformOID: string, StrengthText: string) {
  //     InitializeComponent();
  //     grdWardStock.HorizontalAlignment = HorizontalAlignment.Center;
  //     grdWardStock.HorizontalContentAlignment = HorizontalAlignment.Center;
  //     grdWardStock.MinWidth = 885;
  //     grdWardStock.Columns[2].MinWidth = 197;
  //     let objhistory: SupplyHistoryVM = new SupplyHistoryVM(identifyingOID, Identifyingtype, routeOID, drugformOID, StrengthText);
  //     if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
  //         let P: string[] = PatientContext.PrescriptionOID.Split(',');
  //         if (P.length == 1) {
  //             this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
  //         }
  //     }
  //     objhistory.RefreshWardStockEvent  = (s,e) => { RefreshWardStockICONS(s,e); } ;
  //     this.DataContext = objhistory;
  // }
  // constructor(PresItemVM: PrescriptionItemVM) {
  //     InitializeComponent();
  //     let objhistory: SupplyHistoryVM = new SupplyHistoryVM(PresItemVM);
  //     if (PresItemVM != null && PresItemVM.FormViewerDetails != null && PresItemVM.FormViewerDetails.BasicDetails != null) {
  //         if (!PresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
  //             this.SetDrugHeaderContent(PresItemVM);
  //         }
  //     }
  //     objhistory.RefreshWardStockEvent  = (s,e) => { RefreshWardStockICONS(s,e); } ;
  //     this.DataContext = objhistory;
  // }

  constructor() {
    super();
  }
  constructorImpl(identifyingOID_PresItemVM: any, Identifyingtype?: string, routeOID?: string, drugformOID?: string, StrengthText?: string){
    //let objhistory: any;
    switch (arguments.length) {
      case 1:
        //InitializeComponent();
        this.objhistory = new SupplyHistoryVM(identifyingOID_PresItemVM);
        if (identifyingOID_PresItemVM != null && identifyingOID_PresItemVM.FormViewerDetails != null && identifyingOID_PresItemVM.FormViewerDetails.BasicDetails != null) {
          if (!identifyingOID_PresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
            this.SetDrugHeaderContent(identifyingOID_PresItemVM);
          }
        }
        this.objhistory.RefreshWardStockEvent = (s, e) => { this.RefreshWardStockICONS(); };
        this.DataContext = this.objhistory;
        break;
      case 5:
        //InitializeComponent();
        //needs to Revisited
        // this.grdWardStock.HorizontalAlignment = HorizontalAlignment.Center;
        // this.grdWardStock.HorizontalContentAlignment = HorizontalAlignment.Center;
        // this.grdWardStock.MinWidth = 885;
        // this.grdWardStock.Columns[2].MinWidth = 197;
        this.objhistory = new SupplyHistoryVM(identifyingOID_PresItemVM, Identifyingtype, routeOID, drugformOID, StrengthText);
        // if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
        //   let P: string[] = PatientContext.PrescriptionOID.Split(',');
        //   if (P.length == 1) {
        //     this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
        //   }
        // }
       this.objhistory.RefreshWardStockEvent = (s, e) => { this.RefreshWardStockICONS(); };
        this.DataContext = this.objhistory;
        break;
    }
}
@ViewChildren('tempGrdWardStock') dataTemplates: QueryList<DataTemplate>;
rowLoaded(context: any) {
 
    let rowEventArgs = this.grdWardStock.GetRowEventArgs(
        this.dataTemplates,
        context
    );
}
public maxGridHeight;
ngAfterViewInit(): void { 
  if(this.DataContext != null && this.DataContext.oPrescriptionItemVM != null) 
    this.SetDrugHeaderContent(this.DataContext.oPrescriptionItemVM);     
  if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
    let P: string[] = PatientContext.PrescriptionOID.Split(',');
    if (P.length == 1) {
      this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
    }
  }
  if (this.DataContext.WardStockPresItemDetailsList)
    this.grdWardStock.SetBinding('data', this.DataContext.WardStockPresItemDetailsList);

  this.maxGridHeight = CommonService.setDynamicScrollHeight_MedSupplyInstructions("#medsupplyhistory");
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

  public GetLineItem(lPrescriptionItemOID: number): void {
    let oMedicationDrugDetailsVM: PrescriptionItemDetailsVM = new PrescriptionItemDetailsVM();
    oMedicationDrugDetailsVM.PrescriptionItemOID = lPrescriptionItemOID;   
    oMedicationDrugDetailsVM.MedLineItemEvent = (s, e) => { this.oMedicationDrugDetailsVM_MedLineItemEvent(s); };
    oMedicationDrugDetailsVM.GetDrugDetailsWithDomainCodeValues();
  }
  private oMedicationDrugDetailsVM_MedLineItemEvent(PresItemDetails: PrescriptionItemDetailsVM): void {
    if (MedicationCommonProfileData.MedLineDisplay != null) {
      let tbTextBlock: TextBlock = null;
      this.MedLineDisplay.Content = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVM(PresItemDetails), 200, String.Empty, (o) => { tbTextBlock });
    }
  }
  private RefreshWardStockICONS(): void {
    try {
      if (this.Parent != null) {
        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
        let oFauxTabItem: iTabItem = ObjectHelper.CreateType<iTabItem>(oFauxTab.Items[oFauxTab.Items.Count - 1], iTabItem);
        if (oFauxTabItem instanceof iTabItem) {
          oFauxTabItem.HeaderImageList = new List<HeaderImageListItem>();
          let obj: HeaderImageListItem = new HeaderImageListItem();
          if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
            oFauxTabItem.HeaderImage = MedImage.GetPath(MedImages.WardStockIcon);
            obj.HeaderImage = MedImage.GetPath(MedImages.WardStockIcon);
            obj.HeaderImgToolTip = "Item is stocked at this location";
          }
          else {
            oFauxTabItem.HeaderImage = MedImage.GetPath(MedImages.MandatoryIcon);
            obj.HeaderImage = MedImage.GetPath(MedImages.MandatoryIcon);
          }
          oFauxTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
          obj.HeaderImageAlignment = HeaderImageAlignment.Right;
          oFauxTabItem.HeaderImageList.Add(obj);
          if (obj.HeaderImage != null) {
            oFauxTabItem.UpdateHeader();
          }
        }
      }
      else{
        this.RefreshWardStockIcon();
      }
    }
    catch (e: any) {
      let i: string = e.InnerException.ToString();
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
        if (String.Compare(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.CATALOGUEITEM) != 0) {
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
