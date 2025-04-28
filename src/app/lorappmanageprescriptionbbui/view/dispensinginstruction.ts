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
  StringSplitOptions,
  iAppDialogWindow,
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
  iTextBox,
  iCheckedListbox,
  TextBlock,
} from 'epma-platform/controls';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  CellComponent,
  ColumnComponent,
  GridComponent,
  PageChangeEvent,
  RowArgs,
  RowClassArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import {
  Binding,
  BindingMode,
  Color,
  Colors,
  EventArgs,
  OnSelectEventArgs,
  OnUnSelectEventArgs,
  SolidColorBrush,
} from 'src/app/shared/epma-platform/controls/Control';

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
import {
  DispensinginstructionHistory,
  DispensingInstructionsVM,
} from '../viewmodel/dispensinginstructionsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import * as _Styles from '../../shared/epma-platform/controls/ControlStyles';
import { Dispensinginstruction } from '../resource/dispensinginstruction.designer';

@Component({
  selector: 'Meddispensinginstructions',
  templateUrl: './dispensinginstruction.html',
  styleUrls: ['./dispensinginstruction.css'],
})
export class meddispensinginstructions
  extends iAppDialogWindow
  implements AfterViewInit
{
  Dispensinginstruction = Resource.Dispensinginstruction;
  // DispensinginstructionDetails:any[]
  DispenseVM: DispensingInstructionsVM;
  public Styles = _Styles;
  // grdDispensinghistory: GridExtension = new GridExtension();
  grdDispensinghistory: GridExtension = new GridExtension();
  @ViewChild('grdDispensinghistoryTempRef', {
    read: GridComponent,
    static: false,
  })
  set _grdDispensinghistory(c: GridComponent) {
    if (c) {
      this.grdDispensinghistory.grid = c;
      this.grdDispensinghistory.columns = c.columns;
      //this.grdDispensinghistory.ItemsSourceData = c.data;
    }
  }
  @ViewChildren('tempGrdDispensinghistory')
  dataTemplates: QueryList<DataTemplate>;
  private lblDispensinghistory: TextBlock;
  @ViewChild('lblDispensinghistoryTempRef', { read: TextBlock, static: false })
  set _lblDispensinghistory(c: TextBlock) {
    if (c) {
      this.lblDispensinghistory = c;
    }
  }
  txtadditionalComments: iTextBox;
  @ViewChild('txtadditionalCommentsTempRef', { read: iTextBox, static: false })
  set _txtadditionalComments(c: iTextBox) {
    if (c) {
      this.txtadditionalComments = c;
    }
  }
  txtOtherInstructions: iTextBox;
  @ViewChild('txtOtherInstructionsTempRef', { read: iTextBox, static: false })
  set _txtOtherInstructions(c: iTextBox) {
    if (c) {
      this.txtOtherInstructions = c;
    }
  }
  public lblDispensingInstructions: iLabel;
  @ViewChild('lblDispensingInstructionsTempRef', {
    read: iLabel,
    static: false,
  })
  set _lblDispensingInstructions(c: iLabel) {
    if (c) {
      this.lblDispensingInstructions = c;
    }
  }
  public lblDispensinginstruction: iLabel;
  @ViewChild('lblDispensinginstructionTempRef', { read: iLabel, static: false })
  set _lblDispensinginstruction(c: iLabel) {
    if (c) {
      this.lblDispensinginstruction = c;
    }
  }
  public lblEncounter: iLabel;
  @ViewChild('lblEncounterTempRef', { read: iLabel, static: false })
  set _lblEncounter(c: iLabel) {
    if (c) {
      this.lblEncounter = c;
    }
  }
  public lblComments: iLabel;
  @ViewChild('lblCommentsTempRef', { read: iLabel, static: false })
  set _lblComments(c: iLabel) {
    if (c) {
      this.lblComments = c;
    }
  }
  public chkDispensingInstructions: iCheckedListbox;
  @ViewChild('chkDispensingInstructionsTempRef', {
    read: iCheckedListbox,
    static: false,
  })
  set _chkDispensingInstructionsTempRef(c: iCheckedListbox) {
    if (c) {
      this.chkDispensingInstructions = c;
    }
  }

  public lblOtherInstructions: iLabel;
  @ViewChild('lblOtherInstructionsTempRef ', { read: iLabel, static: false })
  set _lblOtherInstructions(c: iLabel) {
    if (c) {
      this.lblOtherInstructions = c;
    }
  }
  public lbladditionalcomments: iLabel;
  @ViewChild('lbladditionalcommentsTempRef ', { read: iLabel, static: false })
  set _lbladditionalcomments(c: iLabel) {
    if (c) {
      this.lbladditionalcomments = c;
    }
  }
  cosntructorimpl(oVM?: PrescriptionItemVM) {
    this.DispenseVM = new DispensingInstructionsVM(oVM);
    this.DispenseVM.OnValidationError = (s, e) => {
      this.ShowMandatoryMsg();
    };
    this.DataContext = this.DispenseVM;
  }
  constructor() {
    super();
    //  InitializeComponent();
  }
  ngAfterViewInit(): void {
    this.grdDispensinghistory.GenerateColumns();
    // let obj = new DispensinginstructionHistory();
    // obj.EncounterDetail = 'SampleEncounter';
    // obj.DispensinginstructionsName = 'SampleDispensingInstName';
    // obj.Additionalcomments = 'This is a sample comment';
    // this.DispenseVM.DispensinginstructionDetails.Add(obj);
    // this.DispenseVM.DispensinginstructionDetails.Add(obj);
    this.grdDispensinghistory.SetBinding(
      'data',
      this.DataContext.DispensinginstructionDetails
    );
  }

  rowLoaded(context: any) {
    let rowEventArgs = this.grdDispensinghistory.GetRowEventArgs(
      this.dataTemplates,
      context
    );
  }
  public ShowMandatoryMsg(): void {
    let msgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
      Title: Resource.Dispensinginstruction.sLorenzoTitle,
      Message: Resource.Dispensinginstruction.sMandatoryMessage,
      IconType: MessageBoxType.Information,
      MessageButton: MessageBoxButton.OK,
    });
    msgBox.MessageBoxClose = (s, e) => {
      this.msgBox_MessageBoxClose(s, e);
    };
    msgBox.Show();
  }
  msgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    this.txtOtherInstructions.Focus();
  }
  DisposeFormEvents(): void {
    if (this.DispenseVM != null) {
      this.DispenseVM.OnValidationError = (s, e) => {
        this.ShowMandatoryMsg();
      };
    }
  }
  DisposeFormObject(): void {
    this.DispenseVM = null;
    this.appDialog = null;
  }
  iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {
    this.DisposeFormEvents();
    this.DisposeFormObject();
  }
  chkInstructions_OnSelect_Func = (s,e)=>{
    this.chkInstructions_OnSelect(s,e);
  }
  chkInstructions_OnSelect(sender: Object, e: OnSelectEventArgs): void {
    if (this.DispenseVM != null) {
      this.DispenseVM.chkInstructions_OnSelect(e.Value);
    }
  }
  chkInstructions_OnUnSelect_Func = (s,e)=>{
    this.chkInstructions_OnUnSelect(s,e);
  }
  chkInstructions_OnUnSelect(sender: Object, e: OnUnSelectEventArgs): void {
    if (this.DispenseVM != null) {
      this.DispenseVM.chkInstructions_OnUnSelect(e.Value);
    }
  }
  grdDispensinghistory_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    let oDis: DispensinginstructionHistory =
      ObjectHelper.CreateType<DispensinginstructionHistory>(
        this.grdDispensinghistory.SelectedItem,
        DispensinginstructionHistory
      );
    if (oDis != null) {
      this.DispenseVM.BindValtoCntrlFrmGrid(oDis);
      this.grdDispensinghistory.UnselectAll();
    }
  }
}
