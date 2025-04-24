import { Dictionary } from 'epma-platform/dictionary';
import { ObjectHelper } from 'epma-platform/helper';
import {
  AppDialogEventargs,
  CListItem,
  List,
  ObservableCollection,
  RTEEventargs,
  Visibility,
  WindowButtonType,
  iAppDialogWindow,
  AppDialogResult,
  ChildWindow
  
} from 'epma-platform/models';
import { Resource } from '../resource';
import { Common } from '../utilities/common';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  Border,
  DataTemplate,
  FrameworkElement,
  Image,
  TextBlock,
  Thickness,
  UserControl,
} from 'epma-platform/controls';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { GPConnectAddlDetailVM } from '../viewmodel/GPConnectAddlDtlsVM';
import { TextWrapping } from 'src/app/shared/epma-platform/controls-model/TextWrapping';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { AppActivity, AppLoadService, ProcessRTE, iBusyIndicator } from 'epma-platform/services';
import { CResMsgGetGPConnectAdministration, GetGPConnectAdministrationCompletedEventArgs, GPConnectDispenseDetail } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { ValueDomain } from '../utilities/constants';
import {tempData} from '../../../assets/json/tempFile';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  Color,
  MouseButtonEventArgs,
  MouseEventArgs,
  SolidColorBrush,
} from 'src/app/shared/epma-platform/controls/Control';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import {
  GridExtension,
  RowLoadedEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Resource_medlistdetails } from 'src/app/shared/epma-platform/controls-model/Resource';
import DateTime from 'epma-platform/DateTime';
import { DataConversionService } from 'src/app/shared/epma-platform/services/data-conversion.service';
import { GPConnectAddlDtls } from './GPConnectAddlDtls';

@Component({
  selector: 'GpConnectListView',
  templateUrl: './gpconnectlistview.html',
  styleUrls: ['./gpconnectlistview.css'],
})
export class GpConnectListView extends UserControl implements AfterViewInit {
  get isChildWizard(){
    return AppLoadService.isChildWizard;
  }
  @ViewChildren(DataTemplate) templates: QueryList<DataTemplate>;
  public grdData: GridExtension = new GridExtension();
  totalRowCount = 0;
  rowCount = 0;
  mldetails = Resource.Medlistdetails;
  oGPConnectAddlDtls: GPConnectAddlDtls;
  onCellClick(): void {}
  rowSelectionChanged(event: any) {}

  // grdata1: GPConnectItemVM = new GPConnectItemVM();
  // grdata2: GPConnectItemVM = new GPConnectItemVM();
  // grdata3: GPConnectItemVM = new GPConnectItemVM();
  // grdata4: GPConnectItemVM = new GPConnectItemVM();
  // grdata5: GPConnectItemVM = new GPConnectItemVM();

  @ViewChild('grdDataTempRef', { read: GridComponent, static: false  }) set _gridTest(
    comp: GridComponent
  ) {
    if (comp) {
      //this.grdData.ItemsSourceData = comp.data;
      this.grdData.grid = comp;
      this.grdData.columns = comp.columns;
    }
  }
  private lblGPCDisclaimer: TextBlock;
  @ViewChild('lblGPCDisclaimerTempRef', { read: TextBlock, static: false })
  set _lblGPCDisclaimer(c: TextBlock) {
    if (c) {
      this.lblGPCDisclaimer = c;
    }
  }
  oVM: IPPMABaseVM;
  
  private oChildWindow: ChildWindow;
 
  //  ddetChild: medddetailsChild;
  constructor(private cd?: ChangeDetectorRef, private el?: ElementRef) {
    super(); 
    this.temp_assigningDataContext();
    // this.grdData.columnsCount = 5;
    // this.grdData.SetBinding('data', this.grdDataTemp);
    // To be revistied.
    // this.grdData.SetBinding(
    //   'data',
    //   ObjectHelper.CreateObject(new Binding('MedsGPConnect'), {
    //     Mode: BindingMode.OneWay,
    //   })
    // );
 
  }
  public maxGridHeight;
  public maxLayoutHeight;
  ngOnInit(): void {
   
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxLayoutHeight = window.innerHeight;
      this.maxGridHeight = this.maxLayoutHeight - 175;
    }
    else if(!this.isChildWizard && window.screen.height > 1000){
      this.maxLayoutHeight = 720;
      this.maxGridHeight = 631;

    }
  }

  setImg() {
    let temp = this.templates.last as DataTemplate;
    let tempImg = temp.Content as Image;
    tempImg.Background = 'red';
    let img: Image = new Image();
    img.Source = '../../../assets/Images/completed.png';
    temp.Content = img;
    // alert(this.templates.length);
  }
  private temp_assigningDataContext() {
    // let parent = new MedicationPrescriptionCA();
    // parent.InvokeForm();
    this.DataContext = Common.oIPPMABaseVM;

    this.oVM = ObjectHelper.CreateType<IPPMABaseVM>(
      this.DataContext,
      IPPMABaseVM
    );
  }

  ngAfterViewInit(): void {
    this.grdData.GenerateColumns();
    this.grdData.SetBinding(
      'data',
      this.oVM.MedsGPConnect
      );
    if (Common.ConceptCodes == null) {
      ProcessRTE.GetValuesByDomainCodes(
        ValueDomain.ProductType + ',' + ValueDomain.MedicationOcInPrd,
        this.OnRTEResult
      );
    }    
    this.cd?.detectChanges();
  }
  @ViewChildren('temp') dataTemplates: QueryList<DataTemplate>;

  rowLoaded(context: any) {
    let rowEventArgs = this.grdData.GetRowEventArgs(this.dataTemplates, context);
      this.grdData_RowLoaded({}, rowEventArgs);
    }
  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdData.getRowClasses(context); 
    return rowStyles;
  };

  private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      let oItemVM: GPConnectItemVM = ObjectHelper.CreateType<GPConnectItemVM>(
        e.Row.Item,
        GPConnectItemVM
      );
      if (oItemVM.IsGroupheader) {
        // let rowBorder: Border = e.Row.ChildrenOfType<Border>()
        //   .Where((c) => c.Name == 'PART_RowBordeTOP')
        //   .First();
        // rowBorder.Visibility = Visibility.Visible;
        // rowBorder.BorderThickness = new Thickness(0, 2, 0, 0);
        this.grdData.styles.push({ index: e.index, class:'PART_RowBordeTOP'});
        /*
        Gradient color replaced with solidcolor based on PO advice.

        let GS1: GradientStopCollection = new GradientStopCollection();
        GS1.Add(
          ObjectHelper.CreateObject(new GradientStop(), {
            Color: Color.FromArgb(255, 122, 194, 193),
            Offset: 0.6,
          })
        );
        GS1.Add(
          ObjectHelper.CreateObject(new GradientStop(), {
            Color: Color.FromArgb(255, 176, 218, 217),
            Offset: 0.4,
          })
        );
        e.Row.Background = new LinearGradientBrush(GS1, 90.0);
        */
        // e.Row.Background = new SolidColorBrush(
        //   Color.FromArgb(1, 116, 185, 195)
        // ); //#74b9c3
        this.grdData.styles.push({ index: e.index, class:'GroupHeader'});
        e.Row.IsAlternating = false;
      }
    }
  }
  AddDtls_MouseLeftButtonUp_Func = (s, e) => {
    this.Launch_GPConnect_AddlDetails(s,e)
  };
  ReorderImage_MouseLeftButtonUp_Func = (s,e) => {this.ReorderImage_MouseLeftButtonUp(s,e);};
  private ReorderImage_MouseLeftButtonUp(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    {
      let oItem: GPConnectItemVM = ObjectHelper.CreateType<GPConnectItemVM>(
        ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)
          .DataContext,
        GPConnectItemVM
      );
      if (oItem != null) {
        ObjectHelper.CreateType<IPPMABaseVM>(
          this.DataContext,
          IPPMABaseVM
        ).SelectedGPConnectItem = oItem;
        if (
          Common.oIPPMABaseVM != null &&
          !Common.oIPPMABaseVM.ToAvoiddoubleClick
        ) {
          Common.oIPPMABaseVM.ToAvoiddoubleClick = true;
          Common.oIPPMABaseVM.GPCTransformConversion(oItem);
          iBusyIndicator.Start('gpConnect', true);
        }
      }
    }
  }
  AdditionDetailOpen: boolean = false;
  private SelectedItemTypeCode: string = String.Empty;
  private Launch_GPConnect_AddlDetails(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    if (this.AdditionDetailOpen) return;
    let oItem: GPConnectItemVM = ObjectHelper.CreateType<GPConnectItemVM>(
      ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)
        .DataContext,
      GPConnectItemVM
    );
    if (oItem != null && oItem instanceof GPConnectItemVM && !String.IsNullOrEmpty(oItem.GPConnectID)) {
      this.SelectedItemTypeCode = oItem.ItemTypeCode;
      this.AdditionDetailOpen = true;
      PrescriptionHelper.GetGPConnectAdditionalDetail(
        oItem.GPConnectID,
        (s,e) => {this.GPConnect_GetGPConnectAdditionalDetailCompleted(s,e);}
      );
    }
  }
  GPConnect_GetGPConnectAdditionalDetailCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.GetGPConnectAdditionalDetailCompletedEventArgs
  ): void {
    let _ErrorID: number = 92000001;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:GpConnectListView, Method:GPConnect_GetGPConnectAdditionalDetailCompleted()';
    if (e.Error == null) {
      let oGPConnAddlDtl: IPPMAManagePrescSer.CResMsgGetGPConnectAdditionalDetail =
        e.Result;
      let AddtlDtlsVM: GPConnectAddlDetailVM = new GPConnectAddlDetailVM();
      if (oGPConnAddlDtl != null && oGPConnAddlDtl.administration != null) {
        AddtlDtlsVM.Intent = !String.IsNullOrEmpty(
          Resource.Medlistdetails.GPConnAddlDtl_IntentVal
        )
          ? Resource.Medlistdetails.GPConnAddlDtl_IntentVal
          : 'Plan';
        AddtlDtlsVM.DrugName =
          oGPConnAddlDtl.administration.MedicationItemDetail;
        let sSnomedLabel: string = !String.IsNullOrEmpty(
          Resource.Medlistdetails.GPConnAddlDtl_SnomedCode
        )
          ? Resource.Medlistdetails.GPConnAddlDtl_SnomedCode
          : 'SNOMED Code';
        let SnomedVal: string = !String.IsNullOrEmpty(
          oGPConnAddlDtl.administration.MedicationCode
        )
          ? oGPConnAddlDtl.administration.MedicationCode
          : String.Empty;
        let GPConnectIdentifierLabel: string = !String.IsNullOrEmpty(
          Resource.Medlistdetails.GPConnAddlDtl_Identifier
        )
          ? Resource.Medlistdetails.GPConnAddlDtl_Identifier
          : 'Identifier';
        let GPConnectIdentifierVal: string = !String.IsNullOrEmpty(
          oGPConnAddlDtl.administration.GPConnectUniqueId
        )
          ? oGPConnAddlDtl.administration.GPConnectUniqueId
          : String.Empty;
        AddtlDtlsVM.SnomedCode =
          sSnomedLabel +
          ': ' +
          SnomedVal +
          '\n' +
          GPConnectIdentifierLabel +
          ': ' +
          GPConnectIdentifierVal;
        AddtlDtlsVM.LastIssuedDate = oGPConnAddlDtl.administration.LastIssued;
        AddtlDtlsVM.ItemTypeCode = this.SelectedItemTypeCode;
        AddtlDtlsVM.PrescriptionType =
          oGPConnAddlDtl.administration.ItemTypeDisplay;
        if (
          oGPConnAddlDtl.administration.Dosages != null &&
          oGPConnAddlDtl.administration.Dosages.Length > 0 &&
          oGPConnAddlDtl.administration.Dosages[0] != null
        ) {
          AddtlDtlsVM.DosageText =
            oGPConnAddlDtl.administration.Dosages[0].Text +
            ' - ' +
            oGPConnAddlDtl.administration.Dosages[0].Instruction;
          AddtlDtlsVM.Dosage = oGPConnAddlDtl.administration.Dosages[0].Text;
          AddtlDtlsVM.PatientInstructions =
            oGPConnAddlDtl.administration.Dosages[0].Instruction;
        }
        if (oGPConnAddlDtl.administration.AdditionalDetail != null) {
          AddtlDtlsVM.CareSettingName =
            oGPConnAddlDtl.administration.AdditionalDetail.CareSetting;
          AddtlDtlsVM.Status =
            oGPConnAddlDtl.administration.AdditionalDetail.Status;
          AddtlDtlsVM.EncounterName =
            oGPConnAddlDtl.administration.AdditionalDetail.Encounter;
          AddtlDtlsVM.NoOfRepeatsAllowed =
            oGPConnAddlDtl.administration.AdditionalDetail.NoOfRepeatAllowed;
          AddtlDtlsVM.NoOfRepeatsIssued =
            oGPConnAddlDtl.administration.AdditionalDetail.NoOfRepeatIssued;
          AddtlDtlsVM.DosageLastChanged =
            oGPConnAddlDtl.administration.AdditionalDetail.DosageLastChanged;
          if (
            oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned !=
            null
          ) {
            AddtlDtlsVM.Quantity =
              oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned.Quantity;
            AddtlDtlsVM.StartDate =
              oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned.StartDate;
            AddtlDtlsVM.EndDate =
              oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned.EndDate;
            AddtlDtlsVM.StatusChangedDate =
              oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned.StatusChangeDate;
            AddtlDtlsVM.StatusReason =
              oGPConnAddlDtl.administration.AdditionalDetail.DispensePlanned.StatusReason;
          }
          if (
            oGPConnAddlDtl.administration.AdditionalDetail.DispenseIssued != null) {
            AddtlDtlsVM.DispenseDetails =
              oGPConnAddlDtl.administration.AdditionalDetail.DispenseIssued.Select(
                (x) =>
                  ObjectHelper.CreateObject(new GPConnectDispenseDetail(), {
                    StartDate: x.StartDate,
                    EndDate: x.EndDate,
                    Quantity: x.Quantity,
                    DosageInstruction: x.DosageInstruction,
                  })
              ).ToList();
          }
        }
      }
      let sWindowTitle: string = !String.IsNullOrEmpty(
        Resource.Medlistdetails.GPConnAddlDtl_Title
      )
        ? Resource.Medlistdetails.GPConnAddlDtl_Title
        : 'Additional details - LORENZO';
      //Not Required for LHS. To be Re-Visited.
      
      let oGPConnectAddlDtls: GPConnectAddlDtls = new GPConnectAddlDtls();
       
      oGPConnectAddlDtls.DataContext = AddtlDtlsVM;
      
      if (AddtlDtlsVM!=null && AddtlDtlsVM.DispenseDetails != null && AddtlDtlsVM.DispenseDetails.Count>0){
         oGPConnectAddlDtls.grdData.SetBinding('data',AddtlDtlsVM.DispenseDetails);
      }
      let oAddDetCallBack = (s,e) => { oGPConnectAddlDtls = s;};
      //this.AdditionDetailsOpen = true;
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow(
        sWindowTitle,
        oGPConnectAddlDtls,
        (s,e) => {this.gpConnect_AddlDtl_Child_Closed(s);},
         '',
        false,
        660,
        650,
        false,
        WindowButtonType.Close,
        oAddDetCallBack
      );
      
    } else {
      let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  gpConnect_AddlDtl_Child_Closed(args: AppDialogEventargs): void {
    
    //args.AppChildWindow.DialogResult = true;
    // ObjectHelper.stopFinishAndCancelEvent(false);
    this.oChildWindow = args.AppChildWindow;
    this.oChildWindow.DialogResult = true;
    this.AdditionDetailOpen = false;
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (
      String.Compare(
        args.Request,
        ValueDomain.ProductType + ',' + ValueDomain.MedicationOcInPrd
      ) == 0
    ) {
      if (args.Result instanceof Dictionary) {
        let objResult: Dictionary<string, List<CListItem>> = <
          Dictionary<string, List<CListItem>>
        >args.Result;
        Common.ConceptCodes = new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key) {
            case ValueDomain.ProductType:
            case ValueDomain.MedicationOcInPrd:
              objDomainDetail.Value.forEach((oCListItem) => {
                Common.ConceptCodes.Add(
                  ObjectHelper.CreateObject(new CValuesetTerm(), {
                    csCode: oCListItem.Value,
                    csDescription: oCListItem.DisplayText,
                  })
                );
              });
              break;
          }
        });
      }
    }
  }
  private lblGPCDisclaimer_MouseEnter_1(
    sender: Object,
    e: MouseEventArgs
  ): void {
    let baseVm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(
      ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)
        .DataContext,
      IPPMABaseVM
    );
    if (baseVm != null) {
      baseVm.GPConnectWarningText = baseVm.GPConnectWarningTextDetail;
      this.lblGPCDisclaimer.TextWrapping = TextWrapping.Wrap;
    }
  }
  private lblGPCDisclaimer_MouseLeave_1(
    sender: Object,
    e: MouseEventArgs
  ): void {
    let baseVm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(
      ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)
        .DataContext,
      IPPMABaseVM
    );
    if (baseVm != null) {
      baseVm.GPConnectWarningText = baseVm.GPConnectWarningTextShort;
      this.lblGPCDisclaimer.TextWrapping = TextWrapping.NoWrap;
    }
  }
}
