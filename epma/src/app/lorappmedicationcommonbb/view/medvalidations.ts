import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  base,
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
  ContentControl,
  HtmlPage,
  iAppDialogWindow,
  Visibility,
} from 'epma-platform/models';
import {
  AppDialog,
  Border,
  FrameworkElement,
  GridLength,
  iButton,
  iLabel,
  MouseButtonEventArgs,
  Thickness,
  Binding,
  UserControl,
  Grid,
  BindingMode,
  EventArgs,
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
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import { Resource } from '../resource';
//import { BindingMode } from 'src/app/shared/epma-platform/controls/Control';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
//import { AnyARecord } from 'dns';
@Component({
  selector: 'medvalidations',
  templateUrl: './medvalidations.html',
  styleUrls: ['./medvalidations.css']
})

export class medvalidations extends UserControl {
  isEPRview:boolean;
  private LayoutRoot: Grid;
  maxGridHeight = 460;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  grdData: GridExtension = new GridExtension();
  @ViewChild('grdDataTempRef', { read: GridComponent, static: false }) set _grdData(c: GridComponent) {
    if (c) {
      this.grdData.grid = c;
      this.grdData.columns = c.columns;
    }
  }
  oVM: IPPMABaseVM;
  ddkey = Resource.DrugDetails;
  // override _DataContext: PrescriptionItemDetailsVM;
  // override get DataContext() {
  //   return this._DataContext;
  // }
  // @Input() override set DataContext(value: PrescriptionItemDetailsVM) {
  //   this._DataContext = value;
  // }
  objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
  constructor() {
    super();
  }
  ngOnInit() {
    this.grdData.RowIndicatorVisibility = Visibility.Collapsed;
    let viewcheck : any = base.WizardContext;
    if(viewcheck?.IconClick){
        this.isEPRview=true;
    }
    else this.isEPRview=false;
  }
  ngAfterViewInit(): void {
    // this.maxGridHeight = 460;
    this.medvalidations_Loaded({}, null);
    let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
    let medformviewerHeight
    if (this.isEPRview)
      medformviewerHeight = (650 - 105);
    else
      medformviewerHeight = ((650 - (105 * window.devicePixelRatio)) / window.devicePixelRatio);
    if ((elem?.children[1]?.scrollHeight) >= 500) {
      this.maxGridHeight = (medformviewerHeight - (elem.children[0].scrollHeight + 47));
    }
    else if (((elem?.children[1]?.scrollHeight) - 50) < 460) {
      this.maxGridHeight = (elem.children[1].scrollHeight) - 47;
    }
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxGridHeight = window.innerHeight - ((elem.children[0].scrollHeight) + 135);
    }
  }
  medvalidations_Loaded(sender: Object, e: RoutedEventArgs) {
    if (this.DataContext != null) {
      this.objPrescriptionItemDetailsVM =
        ObjectHelper.CreateType<PrescriptionItemDetailsVM>(
          this.DataContext,
          PrescriptionItemDetailsVM
        );
      this.objPrescriptionItemDetailsVM.GetValidationDetails(
        this.objPrescriptionItemDetailsVM.PrescriptionItemOID
      );
      this.objPrescriptionItemDetailsVM.ValidationEvent = (s, e) => {
        this.grdValidationDetails_DataLoaded(s, {});
      };
    }
  }
  grdValidationDetails_DataLoaded(sender: Object, e: EventArgs) {
    this.grdData.SetBinding('data', this.objPrescriptionItemDetailsVM.ValidationDetails)
  }
  // medvalidations_Loaded(sender: Object, e: RoutedEventArgs) {
  //   console.log('inside medval load :');
  //   if (this.DataContext != null) {
  //     console.log('inside datacontext medval load :');
  //     this.objPrescriptionItemDetailsVM =
  //       ObjectHelper.CreateType<PrescriptionItemDetailsVM>(
  //         this.DataContext,
  //         PrescriptionItemDetailsVM
  //       );
  //     console.log('First', this.objPrescriptionItemDetailsVM);
  //     this.objPrescriptionItemDetailsVM.GetValidationDetails(
  //       this.objPrescriptionItemDetailsVM.PrescriptionItemOID
  //     );
  //     console.log('Middle', this.objPrescriptionItemDetailsVM);
  //     //this.oVM.MedsClerked=data;
  //     //this.grdData.ItemsSource = this.objPrescriptionItemDetailsVM.ValidationDetails;
  //     this.grdData.SetBinding('data', this.objPrescriptionItemDetailsVM.ValidationDetails);
  //     console.log('Last', this.objPrescriptionItemDetailsVM.ValidationDetails);
  //     // this.grdData.SetBinding(
  //     //   GridExtension.ItemsSourceProperty,
  //     //   ObjectHelper.CreateObject(new Binding('ValidationDetails'), {
  //     //     Mode: BindingMode.OneWay,
  //     //   })
  //     // );
  //   }
  // }
}
