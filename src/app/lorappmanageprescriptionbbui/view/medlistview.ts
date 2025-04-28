import { ObjectHelper } from 'epma-platform/helper';
import {
  AppDialogEventargs,
  AppDialogResult,
  List,
  ObservableCollection,
  Visibility,
  WindowButtonType,
  StringComparison,
} from 'epma-platform/models';
import {
  AggregateService,
  AppActivity,
  AppLoadService,
  Convert,
  iBusyIndicator,
  iMessageBox,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
} from 'epma-platform/services';
import { ActivityTypes } from '../model/common';
import { Resource } from '../resource';
import {
  CAActivity,
  CConstants,
  InfusionTypesCode,
  MedImage,
  MedImages,
  PrescriptionTypes,
} from '../utilities/constants';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { Common } from '../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import DateTime from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import {
  BitmapImage,
  Color,
  Colors,
  MouseButtonEventArgs,
  SolidColorBrush,
  Stretch,
  ToolTipService,
  Uri,
  UriKind,
} from 'src/app/shared/epma-platform/controls/Control';
import {
  Border,
  DataTemplate,
  FrameworkElement,
  Image,
  Thickness,
  UserControl,
} from 'epma-platform/controls';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { TextWrapping } from 'src/app/shared/epma-platform/controls-model/TextWrapping';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { CSequentialHelper } from '../utilities/CSequentialHelper';
import { CommonSequentialHelper } from '../utilities/CommonSequentialHelper';
import {
  OrderSetSecMezzanineVM,
  PrescriptionItemAssociations,
} from '../viewmodel/ordersetsecmezzanineVM';
import { MultipleDoseDetail } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import { Medlistdetails } from '../resource/medlistdetails.designer';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ColumnComponent,
  GridComponent,
  PageChangeEvent,
  RowArgs,
  RowClassArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import {
  Grid,
  GridExtension,
  GridViewCell,
  GridViewColumn,
  GridViewRow,
  GridViewRowItem,
  RowLoadedEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import {
  Resource_Infusion,
  Resource_medlistdetails,
} from 'src/app/shared/epma-platform/controls-model/Resource';
import { FormViewerVM } from '../viewmodel/formviewervm';
import { SubService } from '../viewmodel/data.service';
import { InjectorInstance } from 'src/app/app.module';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';

@Component({
  selector: 'MedListView',
  templateUrl: './medlistview.html',
  styleUrls: ['./medlistview.css'],
})
export class MedListView extends UserControl implements OnInit, AfterViewInit {
  get isChildWizard(){
    return AppLoadService.isChildWizard;
  }
  public IncludeCheck: boolean = null;
  public IncludeDisCompletedCheck: boolean = null;
  public OmitReorderMsgShown: boolean = false;
  public GridIns = { gridData: [], selectedRowsIndex: [] };
  oVM: IPPMABaseVM;
  sMenuCode: string;
  enableGroupHeaderBg = false;
  //objStepped: MedSteppedDose;
  ddetChild: medddetailsChild;
  oItemReorderSeq: PrescriptionItemVM;
  // oORSChild: OrderSetSecMezzanine; //Not Required for LHS. To be Re-Visited.
  bProfileFlag: boolean = false;
  lGroupSeqNo: number;
  objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
  grdData: GridExtension = new GridExtension();
  @ViewChild('grdDataTempRef', { read: GridComponent, static: false })
  set _grdEnc(c: GridComponent) {
    if (c) {
      this.grdData.grid = c;
      this.grdData.columns = c.columns;
      // this.grdData.ItemsSourceData = c.data;
    }
  }
  @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
  ResolveGridNoRecordsText = 'ResolveGrid NoRecords Text';
  public mldetails = Resource.Medlistdetails;
  Infusion = Resource.Infusion;
  FormViewerDetails = new FormViewerVM();
  PrescriptionItem_Header = this.mldetails.PrescriptionItem_Header;
  StartDateIco_Header = this.mldetails.StartDateIco_Header;
  private counter = 0;
  medtabObj:any;
  ngAfterViewInit(): void {
    this.grdData.GenerateColumns();
    this.UserControl_Loaded(null, null);
    if (!this.oVM) {
      this.oVM = new IPPMABaseVM();
      this.oVM.MedsInPatient = new ObservableCollection<PrescriptionItemVM>();
    }
    this.constructorImplAfterViewInit();
    AppLoadService.medtabChangeFlag.subscribe(val=>{
      if (val) {
            this.grdData.ItemsSource.Clear();
      }
    });
    console.log('DataTemplates..', this.dataTemplates);
    this.oVM.selectrow.subscribe((key) => {
      if(key !=null &&  key !=undefined )
      {
        this.grdData.selectedRowsIndex = [];
      }
    })
    this.oVM.colorChange_observable.subscribe((key) => {
      if(key !=null &&  key !=undefined )
      {
        this.medtabObj=key;
        this.counter = key.counter
        setTimeout(() => {
          if(this.counter == 0){
            Busyindicator.SetStatusIdle("colourchange")
          }
        }, 3000);
      }
    })
  }

  SetProfileData(): void {
    if (ProfileData.ResolveGridConfig != null) {
      ProfileData.MedListViewGridConfig.Columns.forEach((oColumn) => {
        let sColName: string = oColumn.Name;
        let oGridColumn: GridViewColumn = this.grdData.Columns[sColName];
        if (oGridColumn instanceof GridViewColumn) {
          oGridColumn.DisplayIndex = oColumn.DisplayOrder + 2;
          // oGridColumn.Width = oColumn.Width;
          oGridColumn.IsVisible = oColumn.Visible;
          oGridColumn.IsResizable = oColumn.CanResize;
          // need to be revisited
          // oGridColumn.TextWrapping = oColumn.CellWrap
          //   ? TextWrapping.Wrap
          //   : TextWrapping.NoWrap;
          if (
            String.Compare(
              sColName,
              'StartDateIco',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                this.sMenuCode,
                PrescriptionTypes.Clerking,
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              oGridColumn.Header = this.StartDateIco_Header = 'Date commenced';
            }
          } else if (
            String.Compare(
              sColName,
              'PrescriptionItem',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                this.sMenuCode,
                PrescriptionTypes.Clerking,
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              oGridColumn.Header = this.PrescriptionItem_Header = 'Clerked medication item';
            }
          }
        }
      });
    }
  }
  public aggregateService: AggregateService =
    InjectorInstance.get<AggregateService>(AggregateService);
    public maxLayoutHeight;
public maxGridHeight;
  constructor(
    private changeDetectorRef?: ChangeDetectorRef,
    public subService?: SubService
  ) {
    super();
    console.log('subservice', this.subService);
    console.log('medlistview.aggregateService.pData');

    this.grdData.changeDetectionRef = this.changeDetectorRef;
    this.grdData.ItemsSource.Clear();
    //this.grdData.columnsCount = 6;
    this.temp_assigningDataContext();
    this.constructorimpl('CC_MEDCLERK1', true);
  }
  ngOnInit(): void {
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxLayoutHeight = window.innerHeight;
      this.maxGridHeight = this.maxLayoutHeight - 244;
    }
    else if (!this.isChildWizard && window.screen.height > 1000 ){
      this.maxLayoutHeight = 720;
      this.maxGridHeight = 570;
    }
  }
  rowLoaded(context: any) {
    let rowEventArgs = this.grdData.GetRowEventArgs(
      this.dataTemplates,
      context
    );
    this.grdData_RowLoaded(rowEventArgs, {});
    if(this.medtabObj){
      this.counter++;
      let lengthDisComp: any[] = [];
      try {
        lengthDisComp = this.grdData.ItemsSource.array.filter(x => x.PrescriptionItemStatus == "MEDStatus3" || x.PrescriptionItemStatus == "MEDStatus14" || x.PrescriptionItemStatus == "MEDStatus2")
      } catch (e) {
        console.log("colourchange.error", e);
      }
      console.log("colourchange.counter", this.counter, "this.grdData.ItemsSource.array.length", this.grdData.ItemsSource.array.length, "lengthDisComp", lengthDisComp.length);
      let rowCount = this.medtabObj.event ? lengthDisComp.length : this.grdData.ItemsSource.array.length
      if (this.counter >= rowCount) {
        this.asigncolor();
        Busyindicator.SetStatusIdle("colourchange")
      }
    }
  }
  asigncolor() {
    this.grdData.ItemsSource.array.forEach(x => {
      this.disCompleted(x);
    })
  }
  disCompleted(x) {
    console.log("colourchange.disCompleted", x);
    if (
      String.Compare(
        x.PrescriptionItemStatus,
        CConstants.DISCONTINUED,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    ) {
      // e.Row.Background = new SolidColorBrush(Colors.Grey);
      this.grdData.styles.push({
        class: 'Background_DISCONTINUED',
      });
    } else if (
      String.Compare(
        x.PrescriptionItemStatus,
        CConstants.CANCELLED,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    ) {
      // e.Row.Foreground = new SolidColorBrush(Colors.Red);
      this.grdData.styles.push({
        class: 'Foreground_CANCELLED',
      });
    } else if (
      String.Compare(
        x.PrescriptionItemStatus,
        CConstants.COMPLETED,
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      // e.Row.Background = new SolidColorBrush(
      //   Color.FromArgb(255, 185, 251, 114)
      // );
      this.grdData.styles.push({
        class: 'Background_COMPLETED',
      });
    }
  }

  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdData.getRowClasses(context);
    return rowStyles;
  };

  sShowReorderIcon: boolean;
  constructorimpl(Menucode: string, showReorderIcon: boolean) {
    //let Menucode: string; let showReorderIcon: boolean
    this.sShowReorderIcon = showReorderIcon;
    this.sMenuCode = Menucode;
    this.SetProfileData();
  }
  private constructorImplAfterViewInit() {
    if (!this.sShowReorderIcon) {
      this.grdData.Columns[0].IsVisible = false;
    }
    switch (this.sMenuCode) {
      case 'CC_MEDCLERK1':
        this.grdData.SetBinding('data', this.oVM.MedsClerked);
        break;
      case 'CC_Patientleave':
        this.grdData.SetBinding('data', this.oVM.MedsLeave);
        break;
      case 'CC_DSCHRG':
        this.grdData.SetBinding('data', this.oVM.MedsDischarge);
        break;
      case 'CC_MED_TYP_OP':
        this.grdData.SetBinding('data', this.oVM.MedsOutPatient);
        break;
      case 'CC_FRADMINSTN':
      case 'CC_FOR_ADMIN':
        this.grdData.SetBinding('data', this.oVM.MedsInPatient);
        break;
    }
  }
  private oItemReorder: PrescriptionItemVM;
  private ReorderImage_MouseLeftButtonUp(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      (<FrameworkElement>sender).DataContext,
      PrescriptionItemVM
    );
    if (
      oItem != null &&
      String.Compare(
        oItem.ReorderImage,
        MedImage.GetPath(MedImages.SelectionIcon),
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      oItem.IsDosCalciReOrderShowFormviewerRequired = false;
      if (UserPermissions.CanReorder) {
        this.oItemReorder = oItem;
        let IsActiveMeds: boolean = true;
        if (
          oItem.FormViewerDetails != null &&
          oItem.FormViewerDetails.BasicDetails != null &&
          oItem.FormViewerDetails.BasicDetails.ReplaceDrugActiveStatus.Equals(
            '0'
          )
        ) {
          IsActiveMeds = false;
        }
        if (
          IsActiveMeds &&
          MedicationCommonProfileData.PrescribeConfig != null &&
          MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc &&
          oItem.FormViewerDetails != null &&
          oItem.FormViewerDetails.BasicDetails != null &&
          oItem.FormViewerDetails.BasicDetails.IsDoseCalcExist
        ) {
          let oPatientLatHWDTTM: DateTime = DateTime.MinValue;
          let bIsHeightOutOfDate: boolean = false;
          let bIsWeighttOutOfDate: boolean = false;
          let bIsHWUpdatedAfterItmPrsbed: boolean = false;
          if (
            DateTime.GreaterThanOrEqualTo(PatientContext.PatientHeightDTTM, PatientContext.PatientWeightDTTM)
          ) {
            oPatientLatHWDTTM = PatientContext.PatientHeightDTTM;
          } else if (
            DateTime.LessThan(PatientContext.PatientHeightDTTM, PatientContext.PatientWeightDTTM)
          ) {
            oPatientLatHWDTTM = PatientContext.PatientWeightDTTM;
          }
          bIsHeightOutOfDate = PrescriptionHelper.CheckHeightOutOfDate();
          bIsWeighttOutOfDate = PrescriptionHelper.CheckWeightOutOfDate();
          if (
            !Common.IsClosedEncounter() &&
            DateTime.GreaterThan(oPatientLatHWDTTM,
              oItem.FormViewerDetails.BasicDetails.DCCalDTTM) &&
            MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert
          ) {
            bIsHWUpdatedAfterItmPrsbed = true;
          }
          if (
            bIsHWUpdatedAfterItmPrsbed ||
            bIsHeightOutOfDate ||
            bIsWeighttOutOfDate
          ) {
            oItem.IsDosCalciReOrderShowFormviewerRequired = true;
            let oMsgBox: iMessageBox = new iMessageBox();
            oMsgBox.MessageBoxClose = (s, e) => {
              this.oMsgBox_IsAllowReorderMessageBox_Close(s, e);
            };
            oMsgBox.Title = 'Information - Lorenzo';
            oMsgBox.Height = 140;
            oMsgBox.Width = 350;
            oMsgBox.MessageButton = MessageBoxButton.OK;
            oMsgBox.IconType = MessageBoxType.Information;
            oMsgBox.Message =
              'This item has a dose calculation. Please review details and recalculate the dose.';
            oMsgBox.Show();
          } else {
            this.ReorderItem();
          }
        } else {
          this.ReorderItem();
        }
      } else {
        iMessageBox.Show(
          'Lorenzo',
          'You do not have rights to order any drugs.',
          MessageBoxType.Information,
          MessageBoxButton.OK
        );
      }
    }
  }
  oMsgBox_IsAllowReorderMessageBox_Close(
    sender: Object,
    e: MessageEventArgs
  ): void {
    this.ReorderItem();
  }
  public ReorderItem(): void {
    if (
      this.oItemReorder != null &&
      this.oItemReorder.FormViewerDetails != null &&
      this.oItemReorder.FormViewerDetails.BasicDetails != null &&
      !this.oItemReorder.IsAllowedToPerform
    ) {
      let oMsgBox: iMessageBox = new iMessageBox();
      oMsgBox.Title = 'Information - Lorenzo';
      oMsgBox.Height = 140;
      oMsgBox.Width = 350;
      oMsgBox.MessageButton = MessageBoxButton.OK;
      oMsgBox.IconType = MessageBoxType.Information;
      oMsgBox.Message = Resource.prescribedrugs.IsReorderAllowed;
      oMsgBox.Show();
    } else {
      iBusyIndicator.Start('Reorder', true);
      if (this.oVM != null) {
        if (
          !PatientContext.IsINFUSIONON &&
          this.oItemReorder != null &&
          this.oItemReorder.FormViewerDetails != null &&
          this.oItemReorder.FormViewerDetails.BasicDetails != null &&
          this.oItemReorder.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
          this.oItemReorder.FormViewerDetails.BasicDetails.Infused != null &&
          this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType !=
            null &&
          (!String.IsNullOrEmpty(
            this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType.Value
          ) ||
            (String.Compare(
              this.oItemReorder.FormViewerDetails.BasicDetails.Infused,
              '1',
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
              !String.IsNullOrEmpty(
                this.oItemReorder.FormViewerDetails.BasicDetails.itemSubType
              ) &&
              (String.Compare(
                this.oItemReorder.FormViewerDetails.BasicDetails.itemSubType,
                CConstants.SUBTYPE_GAS,
                StringComparison.OrdinalIgnoreCase
              ) == 0 ||
                String.Compare(
                  this.oItemReorder.FormViewerDetails.BasicDetails.itemSubType,
                  CConstants.SUBTYPE_BLOOD,
                  StringComparison.OrdinalIgnoreCase
                ) == 0)))
        ) {
          iMessageBox.Show(
            'Lorenzo',
            Resource.prescribedrugs.Reorder_InfusionOFF,
            MessageBoxType.Information,
            MessageBoxButton.OK
          );
          Busyindicator.SetStatusIdle('Reorder');
        } else if (
          PatientContext.IsINFUSIONON &&
          this.oItemReorder != null &&
          this.oItemReorder.FormViewerDetails != null &&
          this.oItemReorder.FormViewerDetails.BasicDetails != null &&
          this.oItemReorder.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
          this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType !=
            null &&
          !String.IsNullOrEmpty(
            this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType.Value
          ) &&
          (this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType
            .Value == InfusionTypesCode.CONTINUOUS ||
            this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.SINGLEDOSEVOLUME ||
            this.oItemReorder.FormViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.FLUID) &&
          this.oItemReorder.FormViewerDetails.BasicDetails.InfusionDetails
            .ParentPrescriptionItemOID > 0
        ) {
          if (
            !String.IsNullOrEmpty(this.oItemReorder.PrescriptionItemStatus) &&
            !String.Equals(
              this.oItemReorder.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.oItemReorder.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.oItemReorder.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            this.oItemReorder.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
              Visibility.Visible;
            this.oItemReorder.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
              Visibility.Visible;
          }
          this.oVM.IsNonSequentialitem = true;
          this.oVM.PrescribeExistingItem(
            this.oItemReorder,
            ActivityTypes.Reorder
          );
        } else {
          this.oVM.IsNonSequentialitem = true;
          this.oItemReorder.PrescribableItemOID =
            this.oItemReorder.FormViewerDetails.BasicDetails.IdentifyingOID;
          if (
            this.oItemReorder != null &&
            this.oItemReorder.FormViewerDetails != null &&
            this.oItemReorder.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              this.oItemReorder.FormViewerDetails.BasicDetails.OmitComments
            )
          ) {
            this.isOmit();
          } else {
            this.oVM.PrescribeExistingItem(
              this.oItemReorder,
              ActivityTypes.Reorder
            );
          }
        }
      }
    }
  }
  Rx_MouseLeftButtonUp_Func = (s, e) => {
    this.Rx_MouseLeftButtonUp(s, e);
  };
  ReorderImage_MouseLeftButtonUp_Func = (s,e) => {this.ReorderImage_MouseLeftButtonUp(s,e);};

  private Rx_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
    let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      (<FrameworkElement>sender).DataContext,
      PrescriptionItemVM
    );
    if (oItem instanceof PrescriptionItemVM) {
      this.ddetChild = new medddetailsChild();
      this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = oItem.PrescriptionItemOID;
      this.ddetChild.MedDetailsUserControl.MCVersion = oItem.FormViewerDetails.BasicDetails.MCVersion;
      this.ddetChild.MedDetailsUserControl.LorenzoID =
        oItem.FormViewerDetails.BasicDetails.MCILorenzoID;
      this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
      this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
      this.ddetChild.MedDetailsUserControl.DoseCalcExist =
        oItem.FormViewerDetails.BasicDetails.DoseCalcExist;
      this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.PrescribeLHS;
      this.ddetChild.MedDetailsUserControl.PresType = oItem.PrescriptionType;
      let sDrugTitle: string = String.Empty;
      if (
        oItem.FormViewerDetails != null &&
        oItem.FormViewerDetails.BasicDetails != null &&
        String.Compare(
          oItem.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      )
        sDrugTitle = Medlistdetails.Multicomponent_Caption;
      else sDrugTitle = oItem.FormViewerDetails.BasicDetails.IdentifyingName;
      let dialogWindowHeight = (650/window.devicePixelRatio); 
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow(
        sDrugTitle,
        this.ddetChild,
        (s, e) => {
          this.ddetChild_Closed(s);
        },
        '',
        false,
        dialogWindowHeight,
        930,
        false,
        WindowButtonType.Close,
        null
      );
    }
  }

  sequence_MouseLeftButtonUp_Func = (s, e) => {
    this.sequence_MouseLeftButtonUp(s, e);
  }

  sequence_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
    let oItm: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      (<FrameworkElement>sender).DataContext,
      PrescriptionItemVM
    );
    let iGrpSeqNo: number = 0;
    if (
      oItm != null &&
      oItm.FormViewerDetails != null &&
      oItm.FormViewerDetails.BasicDetails != null
    ) {
      if (
        oItm.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        oItm.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
      ) {
        iGrpSeqNo =
          oItm.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
      } else if (
        oItm.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        oItm.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
      ) {
        iGrpSeqNo =
          oItm.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo;
      }
      if (iGrpSeqNo > 0) {
        this.LaunchSequentialDetails(this.sMenuCode, iGrpSeqNo);
      }
    }
  }
  public LaunchSequentialDetails(PresType: string, GroupSeqNo: number): void {
    Busyindicator.SetStatusBusy('LaunchSeqMez');
    this.lGroupSeqNo = GroupSeqNo;
    this.FillPrescriptions(PresType);
  }
  public FillPrescriptions(PresType: string): void {
    let lEncOID: number = 0;
    if (this.oVM != null && this.oVM.EncounterGridObj != null)
      lEncOID = Convert.ToInt64(this.oVM.EncounterGridObj.EncounterID);
    else lEncOID = PatientContext.EncounterOid;
    if (lEncOID > 0) {
      this.objCommPrescriptionItemViewVM = new CommPrescriptionItemViewVM();
      this.objCommPrescriptionItemViewVM.GetPatientMedications(
        PresType,
        '7',
        lEncOID
      );
      this.objCommPrescriptionItemViewVM.GetMedicationsEvent = (s) => {
        this.CommPrescriptionItemViewVM_GetMedicationsEvent(s);
      };
    } else {
      Busyindicator.SetStatusIdle('LaunchSeqMez');
    }
  }
  public CommPrescriptionItemViewVM_GetMedicationsEvent(
    PresItemDetails: CommPrescriptionItemViewVM
  ): void {
    if (
      PresItemDetails != null &&
      PresItemDetails.MedsResolve != null &&
      this.lGroupSeqNo > 0
    ) {
      //Not Required for LHS. To be Re-Visited.

      CCommSequentialHelper.LaunchItemsInSequenceMezzanine(
        PresItemDetails.MedsResolve,
        this.lGroupSeqNo,
        (s,e) => { this.OnSequentialMezzanineClosedComm(s); }
      );
      return;
    }
  }
  OnSequentialMezzanineClosedComm(args: AppDialogEventargs): void {
    this.lGroupSeqNo = 0;
    //this.objCommPrescriptionItemViewVM.GetMedicationsEvent -= new CommPrescriptionItemViewVM.GetMedicationsDelegate(CommPrescriptionItemViewVM_GetMedicationsEvent);
    Busyindicator.SetStatusIdle('LaunchSeqMez');
    if (args != null && args.AppChildWindow != null)
      args.AppChildWindow.DialogResult = true;
  }
  dataGridRow: GridViewRow;
  private grdData_RowLoaded(e: RowLoadedEventArgs, sender: Object): void {
    if (!this.bProfileFlag) {
      this.SetProfileData();
      this.bProfileFlag = true;
    }
    if (e.Row != null && e.Row.Item != null) {
      let oItemVM: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          e.Row.Item,
          PrescriptionItemVM
        );
      this.dataGridRow = ObjectHelper.CreateType<GridViewRow>(
        e.Row,
        GridViewRow
      );
      if (
        oItemVM != null &&
        oItemVM.FormViewerDetails != null &&
        oItemVM.FormViewerDetails.BasicDetails != null &&
        (oItemVM.FormViewerDetails.BasicDetails.AsRequired ||
          String.Equals(
            oItemVM.FormViewerDetails.BasicDetails.Direction,
            CConstants.AsNeeded,
            StringComparison.InvariantCultureIgnoreCase
          ))
      ) {
        // e.Row.Background = new SolidColorBrush(
        //   MedChartData.AsRequiredSlotsColor
        // );
        this.grdData.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
        //this.grdData.styles.push({
          //index: e.index,
         // class: 'AsRequiredSlotsColor',
       // });
        e.Row.IsAlternating = false;
      }
      if (oItemVM.IsGroupHeader) {
        if (oItemVM.IsFirstHeader) {
          // let rowBorder: Border = e.Row.ChildrenOfType<Border>()
          //   .Where((c) => c.Name == 'PART_RowBordeTOP')
          //   .First();
          // rowBorder.Visibility = Visibility.Visible;
          // rowBorder.BorderThickness = new Thickness(0, 2, 0, 0);
          this.grdData.styles.push({
            index: e.index,
            class: 'PART_RowBordeTOP',
          });
        }
        if (
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0
        ) {
          // e.Row.Background = new SolidColorBrush(
          //   Color.FromArgb(255, 118, 179, 180)
          // );
          this.grdData.styles.push({ index: e.index, class: 'GroupHeader' });
          this.grdData.styles.push({
            index: e.index,
            class: 'PART_RowBordeTOP_Blue',
          });
          this.dataGridRow.Cells[1].Content = null;
          this.dataGridRow.Cells[2].Content = null;
          this.dataGridRow.Cells[4].Content = null;
          this.dataGridRow.Cells[5].Content = null;
        } else {
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
          this.grdData.styles.push({ index: e.index, class: 'GroupHeader' });
        }
        e.Row.IsHitTestVisible = false;
        e.Row.IsAlternating = false;
      }
      if (
        CSequentialHelper.IsFirstSequentialInfusionHeader(
          oItemVM,
          ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
            this.grdData.ItemsSource,
            ObservableCollection<PrescriptionItemVM>
          )
        )
      ) {
        //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
        //     .Where((c) => c.Name == 'PART_RowBordeTOP')
        //     .FirstOrDefault();
        //   if (rowBorder1 != null) {
        //     rowBorder1.Visibility = Visibility.Visible;
        //     rowBorder1.BorderBrush = new SolidColorBrush(
        //       Color.FromArgb(255, 63, 72, 204)
        //     );
        //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
        //   }
        this.grdData.styles.push({ index: e.index, class: 'PART_RowBordeTOP' });
      }
      if (
        CSequentialHelper.IsLastSequentialInfusionItem(
          oItemVM,
          ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
            this.grdData.ItemsSource,
            ObservableCollection<PrescriptionItemVM>
          )
        )
      ) {
        //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
        //     .Where((c) => c.Name == 'PART_RowBorder')
        //     .FirstOrDefault();
        if (
          //     rowBorder1 != null &&
          String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) ||
          (!oItemVM.PrescriptionItemStatus.Equals(
            CConstants.CANCELLED,
            StringComparison.OrdinalIgnoreCase
          ) &&
            !oItemVM.PrescriptionItemStatus.Equals(
              CConstants.DISCONTINUED,
              StringComparison.OrdinalIgnoreCase
            ) &&
            !oItemVM.PrescriptionItemStatus.Equals(
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            ))
        ) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(
          //       Color.FromArgb(255, 63, 72, 204)
          //     );
          //     rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
          this.grdData.styles.push({
            index: e.index,
            class: 'PART_RowBorderBOTTOM_Blue',
          });
        }
      }
      if (
        CommonSequentialHelper.IsFirstSequentialInfusionHeader(
          oItemVM,
          ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
            this.grdData.ItemsSource,
            ObservableCollection<PrescriptionItemVM>
          )
        )
      ) {
        //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
        //     .Where((c) => c.Name == 'PART_RowBordeTOP')
        //     .FirstOrDefault();
        //   if (rowBorder1 != null) {
        //     rowBorder1.Visibility = Visibility.Visible;
        //     rowBorder1.BorderBrush = new SolidColorBrush(
        //       Color.FromArgb(255, 63, 72, 204)
        //     );
        //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
        //   }
        this.grdData.styles.push({
          index: e.index,
          class: 'PART_RowBordeTOP_Blue',
        });
      }
      if (
        CommonSequentialHelper.IsLastSequentialInfusionItem(
          oItemVM,
          ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
            this.grdData.ItemsSource,
            ObservableCollection<PrescriptionItemVM>
          )
        )
      ) {
        //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
        //     .Where((c) => c.Name == 'PART_RowBorder')
        //     .FirstOrDefault();
        if (
          //     rowBorder1 != null &&
          String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) ||
          (!oItemVM.PrescriptionItemStatus.Equals(
            CConstants.CANCELLED,
            StringComparison.OrdinalIgnoreCase
          ) &&
            !oItemVM.PrescriptionItemStatus.Equals(
              CConstants.DISCONTINUED,
              StringComparison.OrdinalIgnoreCase
            ) &&
            !oItemVM.PrescriptionItemStatus.Equals(
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            ))
        ) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(
          //       Color.FromArgb(255, 63, 72, 204)
          //     );
          //     rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
          this.grdData.styles.push({
            index: e.index,
            class: 'PART_RowBorderBOTTOM_Blue',
          });
        }
      }
      // to be revisited
      // if (!oItemVM.ShowCells) {
      //   let objGrid: Grid = ObjectHelper.CreateType<Grid>(
      //     this.dataGridRow.Cells[0].Content,
      //     Grid
      //   );
      //   let objImg: Image = ObjectHelper.CreateType<Image>(
      //     objGrid.Children[0],
      //     Image
      //   );
      //   objImg.Visibility = Visibility.Collapsed;
      //   this.dataGridRow.Cells[0].IsEnabled = false;
      //   this.dataGridRow.Cells[1].IsEnabled = false;
      //   this.dataGridRow.Cells[2].IsEnabled = false;
      // }
      // let oReorderCell: GridViewCell = ObjectHelper.CreateType<GridViewCell>(
      //   e.Row.Cells[this.grdData.GetColumnIndexByName('Reorder')],
      //   GridViewCell
      // );
      // oReorderCell.SetBinding(
      //   ToolTipService.ToolTipProperty,
      //   new Binding('ReorderToolTip')
      // );
      if (
        oItemVM.IsPGD &&
        String.Compare(
          oItemVM.IsPGD.ToString(),
          '1',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        let img1: Image = new Image();
        img1.Stretch = Stretch.None;
        img1.DataContext = e.Row.Item;
        img1.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.PGDAdministration),
            UriKind.RelativeOrAbsolute
          )
        );
        //img1.MouseLeftButtonUp -= new MouseButtonEventHandler(Rx_MouseLeftButtonUp);
        img1.MouseLeftButtonUp = (s, e) => {
          this.Rx_MouseLeftButtonUp(s, e);
        };
        // e.Row.Cells[this.grdData.GetColumnIndexByName('ViewDetails')].dataTemplates.Content = img1;
          // To Be revist
        // e.Row.Cells[this.grdData.GetColumnIndexByName('ViewDetails')].SetValue(
        //   ToolTipService.ToolTipProperty,
        //   'Select to view details'
        // );
      }
      if (
        String.Compare(
          oItemVM.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        // e.Row.Background = new SolidColorBrush(Colors.Grey);
        this.grdData.styles.push({
          index: e.index,
          class: 'Background_DISCONTINUED',
        });
      } else if (
        String.Compare(
          oItemVM.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        // e.Row.Foreground = new SolidColorBrush(Colors.Red);
        this.grdData.styles.push({
          index: e.index,
          class: 'Foreground_CANCELLED',
        });
      } else if (
        String.Compare(
          oItemVM.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        // e.Row.Background = new SolidColorBrush(
        //   Color.FromArgb(255, 185, 251, 114)
        // );
        this.grdData.styles.push({
          index: e.index,
          class: 'Background_COMPLETED',
        });
      }
    }
  }
  private MultiDoseDetailVM: MultipleDoseDetail;
  public isOmit(): void {
    let iMsgBox: iMessageBox = new iMessageBox();
    iMsgBox.IconType = MessageBoxType.Question;
    iMsgBox.MessageButton = MessageBoxButton.YesNo;
    iMsgBox.Title = Resource.MedicationForm.MsgBoxTitleName;
    iMsgBox.Message = Resource.MedicationForm.OmitReorder_Message;
    iMsgBox.Height = 190;
    iMsgBox.Width = 450;
    iMsgBox.HasCloseButton = false;
    //iMsgBox.MessageBoxClose -= OmittedReorderWarning_Close;
    iMsgBox.MessageBoxClose = (s, e) => {
      this.OmittedReorderWarning_Close(s, e);
    };
    iMsgBox.Show();
    // message box and indicator opened at the same time. So, commenting the indicator
    // Busyindicator.SetStatusBusy('isOmitReorder');
  }
  OmittedReorderWarning_Close(sender: Object, e: MessageEventArgs): void {
    // Busyindicator.SetStatusIdle('isOmitReorder');
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.oVM.PrescribeExistingItem(this.oItemReorder, ActivityTypes.Reorder);
    } else {
      Busyindicator.SetStatusIdle('Reorder');
    }
  }
  ProcessOrderSetMezzanine(
    oORSItemReorder: PrescriptionItemVM,
    sTeamOIDs: string
  ): void {
    let presitemientifyingoid: Dictionary<string, PrescriptionItemVM> =
      new Dictionary<string, PrescriptionItemVM>();
    let objItemVM: ObservableCollection<PrescriptionItemVM> =
      ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
        this.grdData.ItemsSource,
        ObservableCollection<PrescriptionItemVM>
      );
    if (objItemVM != null) {
      let result = objItemVM
        .Where(
          (c) =>
            c != null &&
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            !String.IsNullOrEmpty(
              c.FormViewerDetails.BasicDetails.Ordersets.Value
            ) &&
            c.OrderSetGroupID == oORSItemReorder.OrderSetGroupID &&
            String.Compare(c.PrescriptionItemStatus, 'MEDStatus3') != 0 &&
            String.Compare(c.PrescriptionItemStatus, 'MEDStatus2') != 0
        )
        .Select((c) => c);
      let objOrdersetItemVM: List<PrescriptionItemVM> = result.ToList();
      let ncount: number = 0;
      let sdickey: string = String.Empty;
      objOrdersetItemVM.forEach((ovm) => {
        sdickey =
          ovm.FormViewerDetails.BasicDetails.IdentifyingOID.ToString() +
          '-' +
          ncount.ToString();
        presitemientifyingoid.Add(sdickey, ovm);
        ncount++;
      });
    }
    //Not Required for LHS. To be Re-Visited.
    /*
            this.oORSChild = new OrderSetSecMezzanine();
            let ordersetOID: number;
            Number.TryParse(oORSItemReorder.FormViewerDetails.BasicDetails.Ordersets.Value, (o) => { ordersetOID = o; });
            let orsname: string = oORSItemReorder.FormViewerDetails.BasicDetails.Ordersets.DisplayText;
            let objVM: OrderSetSecMezzanineVM = new OrderSetSecMezzanineVM(ordersetOID, orsname, presitemientifyingoid, oORSItemReorder.OrderSetLoreznoID, CAActivity.CA_REORDER, sTeamOIDs);
            this.oORSChild.objsecondary = new OrderSetChildfooter();
            this.oORSChild.objsecondary.DataContext = objVM;
            this.oORSChild.DataContext = objVM;
            
            //objVM.OnOrderSetItemsLoadedDelegateChanged -= Launch_OrderSet_PermissionMessage;
            objVM.OnOrderSetItemsLoadedDelegateChanged  = (s) => { this.Launch_OrderSet_PermissionMessage(s); } ;
            */
  }
  private Launch_OrderSet_PermissionMessage(
    NotAllowedToReorder: boolean
  ): void {
    if (!NotAllowedToReorder) {
      //Not Required for LHS. To be Re-Visited.
      //this.LaunchOrsersetMezzanine();
    } else {
      let oMsgBox: iMessageBox = new iMessageBox();
      oMsgBox.Title = 'Information - Lorenzo';
      oMsgBox.Height = 140;
      oMsgBox.Width = 350;
      oMsgBox.MessageButton = MessageBoxButton.OK;
      oMsgBox.IconType = MessageBoxType.Information;
      oMsgBox.Message = Resource.prescribedrugs.IsOrdersetAllowedToReorder;
      oMsgBox.Show();
      Busyindicator.SetStatusIdle('Reorder');
    }
  }
  //Not Required for LHS. To be Re-Visited.
  /*
        LaunchOrsersetMezzanine(): void {
            if (this.oORSChild != null && this.oORSChild.objsecondary != null) {
                let sWindowTitle: string = (this.oORSChild.objsecondary.DataContext != null && this.oORSChild.objsecondary.DataContext instanceof OrderSetSecMezzanineVM) ? (ObjectHelper.CreateType<OrderSetSecMezzanineVM>(this.oORSChild.objsecondary.DataContext, OrderSetSecMezzanineVM)).OrderSetName + " - contents" : String.Empty;
                AppActivity.OpenWindow(sWindowTitle, this.oORSChild,(s,e)=>{this.oORSChild_Closed(s);}, "", false, 450, 560, false, WindowButtonType.OkCancel, this.oORSChild.objsecondary);
            }
        }
        oORSChild_Closed(args: AppDialogEventargs): void {
            let objmezz: OrderSetSecMezzanine = ObjectHelper.CreateType<OrderSetSecMezzanine>(args.Content, OrderSetSecMezzanine);
            if (!Common.OssOkClick(objmezz)) {
                return
            }
            let objItems: ObservableCollection<Object> = null;
            if (objmezz != null && objmezz.grdPatientSelect != null) {
                objItems = objmezz.grdPatientSelect.GetSelectedRows();
            }
            if (args.Result == AppDialogResult.Ok) {
                if (objItems.Count <= 0) {
                    iMessageBox.Show("Lorenzo", Resource.ORSSecMezzanine.ORSOKClick_Text, MessageBoxType.Information, MessageBoxButton.OK);
                }
                else {
                    Busyindicator.SetStatusIdle("Reorder");
                    Busyindicator.SetStatusBusy("OrderSetPrescribe1");
                    let objPresItmCollection: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                    for(let i: number=0; i < objItems.Length; i++)
                    {
                        let obj: object = objItems[i];
                        let objassociation: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(obj, PrescriptionItemAssociations);
                        if (objassociation != null && objassociation.PrescrptionItem != null) {
                            if (objassociation.PrescrptionItem.OsInstance != null && objassociation.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                                continue;
                            }
                            objPresItmCollection.Add(objassociation.PrescrptionItem);
                            if (objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento != null && objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento.Count != 0)
                                objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.Restore(objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento[0]);
                            if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                                if (objassociation.IsPresOpenFVVisiblity == Visibility.Visible)
                                    objassociation.PrescrptionItem.formViewerDetails.BasicDetails.IsDoNotOpenFVForOrderSet = !objassociation.IsPresOpenFVChecked;
                                else objassociation.PrescrptionItem.formViewerDetails.BasicDetails.IsDoNotOpenFVForOrderSet = null;
                            }
                        }
                    }
                    objPresItmCollection.Where(x => x.OsInstance != null && x.OsInstance.OsIsSequential && !x.OsInstance.OsIsProtected).GroupBy(x => x.OsInstance.OsSeqGroupNo).ForEach(x => {
                        x.ForEach(y => {
                            y.OsInstance.OsIsFirstItem = false;
                            y.OsInstance.OsIsLastItem = false;
                        });
                        x.First().OsInstance.OsIsFirstItem = true;
                        x.Last().OsInstance.OsIsLastItem = true;
                    });
                    this.oVM.orsseqcount = 1;
                    this.oVM.CallOrderSetSequence(objPresItmCollection, 0);
                    this.oORSChild.appDialog.DialogResult = false;
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                Busyindicator.SetStatusIdle("Reorder");
                objItems.forEach( (obj)=> {
                    let objassociation: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(obj, PrescriptionItemAssociations);
                    if (objassociation != null && objassociation.PrescrptionItem != null) {
                        if (objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento != null && objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento.Count != 0)
                            objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.Restore(objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.CareTaker.Memento[0]);
                    }
                });
                this.oORSChild.appDialog.DialogResult = false;
            }
        }
        */

  MedSteppedDose_Closed(args: AppDialogEventargs): void {
    args.AppChildWindow.DialogResult = true;
  }
  ddetChild_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  private AppActivityBB_Unloaded(sender: Object, e: RoutedEventArgs): void {
    if (this.oVM != null && (this.oVM.IsFinish || this.oVM.IsFinishNow)) {
      if (this.grdData != null) {
        if (this.grdData.Rows != null) {
          this.grdData.Rows.Clear();
        }
        if (this.grdData.Columns != null) {
          this.grdData.Columns.Clear();
        }
        this.grdData.ItemsSource.Clear();
      }
      //GC.Collect();
    }
  }
  private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.oVM = ObjectHelper.CreateType<IPPMABaseVM>(
      this.DataContext,
      IPPMABaseVM
    );
    //this.grdData.Rebind();
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


  GetClass(i:number)
  {
    var CN:String="";
    if(this.grdData.Items[i].oPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments!=undefined){
      var str = new String(this.grdData.Items[i].oPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments); 
          if(str.length>40)
          CN="Comments";
    }
    return CN;
  }
}
