import {
    ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
  iAppDialogWindow,
  AppSessionInfo,
} from 'epma-platform/models';
import {
  AppDialog,
  Colors,
  Grid,
  SolidColorBrush,
  iLabel,
} from 'epma-platform/controls';
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
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedChartData } from '../utilities/globalvariable';
import {
  GridExtension,
  GridViewCellClickEventArgs,
  RowLoadedEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { PrescriptionItemViewVM } from '../viewmodel/PrescriptionItemViewVM';
import { CConstants } from '../utilities/CConstants';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { GridComponent,RowClassArgs } from '@progress/kendo-angular-grid';
import {
  ColumnDefinition,
  RowDefinition,
} from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { DisplayOtherInformationLineItemMedPipe,  DisplayPrescriptionLineMedsItemPipe, InfoMedIconPipe} from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import {
  Binding,
  DataTemplate,
  EventArgs,
  HorizontalAlignment,
  iButton,
  iTextBox,
  KeyEventArgs,
  StackPanel,
  Thickness,
  VerticalAlignment,
} from 'epma-platform/controls';
import { AdministrableQtyView } from '../resource/administrableqtyview.designer';
import { medddetails } from '../../lorappmedicationcommonbb/view/medddetails';
import { Resource } from '../resource';

@Component({
  selector: 'medsadmindischgprescriptions',
  templateUrl: './medsadmindischgprescriptions.component.html',
  styleUrls: ['./medsadmindischgprescriptions.component.css'],
})
export class MedsAdminDischgPrescriptions extends iAppDialogWindow {
  valueUsed: any;

  private LayoutRoot: Grid;
    oAdministrableQtyView: any;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
  set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  private lblEncounter: iLabel;
  @ViewChild('lblEncounterTempRef', { read: iLabel, static: false })
  set _lblEncounter(c: iLabel) {
    if (c) {
      this.lblEncounter = c;
    }
  }
  public grdData: GridExtension = new GridExtension();
  @ViewChild('grdDataTempRef', { read: GridComponent, static: false })
  set _grdData(c: GridComponent) {
    if (c) {
      this.grdData.grid = c;
      this.grdData.columns = c.columns;
    }
  }
  @ViewChildren('temp', { read: DataTemplate })
  dataTemplates: QueryList<DataTemplate>;
  rowLoaded(context: any) {
    let rowEventArgs = this.grdData.GetRowEventArgs(
      this.dataTemplates,
      context
    );
    this.grdData_RowLoaded({}, rowEventArgs);
  }
  public MedAdminOtherDisplay:DisplayOtherInformationLineItemMedPipe;
  public MedAdminLineDisplay:DisplayPrescriptionLineMedsItemPipe;
  public InfoIconKey: InfoMedIconPipe;
  oMedsAdminChart = Resource.MedsAdminChartToolTip;
  constructor(private changeDetectionRef?: ChangeDetectorRef){
    super();
    this.DataContext = new PrescriptionItemViewVM();
  }
  ovm: PrescriptionItemViewVM;
  ddetChild: medddetails;
  ngOnInit() {
    this.ChildWindow_Loaded();
    this.grdData.onCellClick = (s, e) => {
      this.grdData_onCellClick(s, e);
    };
  }

  private ChildWindow_Loaded(): void {
    this.DataContext = MedChartData.oPrescriptionItemViewVM;
    this.setEncounterHeaderText();
  }
  private setEncounterHeaderText(): void {
    if (MedChartData.oPrescriptionItemViewVM != null)
      MedChartData.oPrescriptionItemViewVM.GetEncounterDescription();
  }
  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdData.getRowStyles(context);
    return rowStyles;
  };
  private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      let dischItem: PrescriptionItemViewVM =
        ObjectHelper.CreateType<PrescriptionItemViewVM>(
          e.DataElement,
          PrescriptionItemViewVM
        );
      if (
        String.Compare(
          ObjectHelper.CreateType<PrescriptionItemViewVM>(
            e.Row.Item,
            PrescriptionItemViewVM
          ).PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        e.dataItem['RowStyles'].push("Background_Grey");
      } else if (
        String.Compare(
          ObjectHelper.CreateType<PrescriptionItemViewVM>(
            e.Row.Item,
            PrescriptionItemViewVM
          ).PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        e.dataItem['RowStyles'].push("Foreground_CANCELLED");//Red
      } else if (
        dischItem != null &&
        dischItem.PrescriptionItemViewDetails != null &&
        dischItem.PrescriptionItemViewDetails.oPresItemBasicPropertiesView !=
          null &&
        !String.IsNullOrEmpty(
          dischItem.PrescriptionItemViewDetails.oPresItemBasicPropertiesView
            .Direction
        ) &&
        String.Equals(
          dischItem.PrescriptionItemViewDetails.oPresItemBasicPropertiesView
            .Direction,
          CConstants.AsNeeded,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        // e.Row.Background = new SolidColorBrush(
        //   MedChartData.AsRequiredSlotsColor
        // );
        this.grdData.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
        // e.dataItem['RowStyles'].push("AsRequiredSlotsColor");
        e.Row.IsAlternating = false;
      }
    }
  }
  public grdData_onCellClick(
    sender: Object,
    args: GridViewCellClickEventArgs
  ): void {
    let sCurrCol: string = args.ColumnCell.Column.UniqueName;
    let sDrugName: string = String.Empty;
    // if (
    //   String.Compare(
    //     sCurrCol,
    //     'ViewDetails',
    //     StringComparison.CurrentCultureIgnoreCase
    //   ) == 0
    // ) {
      if(this.grdData.GetColumnIndexByName("Rx") == args.ColumnIndex){
      let oItem: PrescriptionItemViewVM =
        ObjectHelper.CreateType<PrescriptionItemViewVM>(
          this.grdData.GetRowData(args.RowIndex),
          PrescriptionItemViewVM
        );
      if (oItem instanceof PrescriptionItemViewVM) {
        this.ddetChild = new medddetails();
        this.ddetChild.PrescriptionItemOID =
          oItem.PrescriptionItemOID;
        this.ddetChild.MCVersion = AppSessionInfo.AMCV;
        if (
          String.Compare(
            oItem.Itemsubtype,
            CConstants.ItemSubType,
            StringComparison.InvariantCultureIgnoreCase
          ) == 0
        )
          sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
        else {
          sDrugName = oItem.PrescriptionItemName;
          if (!String.IsNullOrEmpty(oItem.VMVPIdentifyingName))
            sDrugName =
              oItem.VMVPIdentifyingName + ' - ' + oItem.PrescriptionItemName;
        }
        //this.ddetChild.onDialogClose = this.ddetChild_Closed;
        AppActivity.OpenWindow(
          sDrugName,
          this.ddetChild,
          (s, e) => {
            this.ddetChild_Closed(s);
          },
          '',
          false,
          650,
          930,
          false,
          WindowButtonType.Close,
          null
        );
      }
    }
  }
  private ddetChild_Closed(args: AppDialogEventargs): void {

    //this.ddetChild.appDialog.DialogResult = true;
    args.AppChildWindow.DialogResult = true;
  }

  ngAfterViewInit(): void {
    this.grdData.GenerateColumns();
    this.grdData.changeDetectionRef = this.changeDetectionRef;
      this.grdData.SetBinding('data', this.DataContext.MedsResolve);
  }

  GetResourceString(sKey: string) {
    this.oAdministrableQtyView = new AdministrableQtyView();
    return this.oAdministrableQtyView.GetResourceString(sKey);
  }
}
