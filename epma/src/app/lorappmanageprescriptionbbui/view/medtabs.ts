import { ObjectHelper } from 'epma-platform/helper';
import {
  IProfileProp,
  KeyEventArgs,
  ObservableCollection,
  Visibility,
} from 'epma-platform/models';
import { AppLoadService, Convert, ProfileFactoryType } from 'epma-platform/services';
import { Common } from '../utilities/common';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import {
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import {RoutedEventArgs} from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { CValuesetCollection } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { ProfileData } from '../utilities/profiledata';
import { MedicationPrescribeVM } from '../ca/prescribe/medicationprescribevm';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { MedListView } from './medlistview';
import {
  CReqMsgGetLastCreatedPrescTypeForEnc,
  CResMsgGetLastCreatedPrescTypeForEnc,
  GetLastCreatedPrescTypeForEncCompletedEventArgs,
  IPPMAManagePrescriptionWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { PrescribingMethodConfigData } from 'src/app/lorappslprofiletypes/medication';
import {
  EventArgs,
} from 'src/app/shared/epma-platform/controls/Control';
import { iCheckBox, iLabel, iTab, UserControl } from 'epma-platform/controls';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  GridComponent,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import {
  GridExtension,
  SelectionChangeEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ApplicationHelper } from 'src/app/shared/epma-platform/services/applicationhelper.service';
import {
  AnimationDirection,
  AnimationType,
  Offset,
  PopupAnimation,
} from '@progress/kendo-angular-popup';
import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { Resource } from '../resource';
import { MedicationPrescriptionCA } from '../ca/prescribe/medicationprescriptionview';
import { ClinicallyVerifyVM } from '../viewmodel/clinicallyverifyvm';
//import { Visibility } from "src/app/shared/epma-platform/controls-model/Visibility";

var that;

@Component({
  selector: 'MedTabs',
  templateUrl: './medtabs.html',
  styleUrls: ['./medtabs.css'],
})
export class MedTabs extends UserControl implements OnInit, AfterViewInit {

  get isChildWizard(){
    return AppLoadService.isChildWizard;
  }
  public grdEnc: GridExtension = new GridExtension();
  @ViewChild('lblEncounterTempRef', { read: iLabel, static: false })
  set _lblEncounter(c: iLabel) {
    if (c) {
      this.lblEncounter = c;
    }
  }
  @ViewChild('lblGPCStopCompTempRef', { read: iLabel, static: false })
  set _lblGPCStopComp(c: iLabel) {
    if (c) {
      this.lblGPCStopComp = c;
    }
  }
  @ViewChild('chkViewDiscontinueCancelTempRef', {
    read: iCheckBox,
    static: false,
  })
  set _chkViewDiscontinueCancel(c: iCheckBox) {
    if (c) {
      this.chkViewDiscontinueCancel = c;
    }
  }
  @ViewChild('chkViewDiscontinueCompleteTempRef', {
    read: iCheckBox,
    static: false,
  })
  set _chkViewDiscontinueComplete(c: iCheckBox) {
    if (c) {
      this.chkViewDiscontinueComplete = c;
    }
  }
  @ViewChild('lblDisCompTempRef', { read: iLabel, static: false })
  set _lblDisComp(c: iLabel) {
    if (c) {
      this.lblDisComp = c;
    }
  }
  @ViewChild('grdEncTempRef', { read: GridComponent, static: false })
  set _grdEnc(c: GridComponent) {
    if (c) {
    //  this.grdEnc.ItemsSourceData = c.data;
      this.grdEnc.grid = c;
      this.grdEnc.columns = c.columns;
    }
  }
  @ViewChild('tabLstVwTempRef', { read: iTab, static: false }) set _tabLstVw(
    c: iTab
  ) {
    if (c) {
      this.tabLstVw = c;
    }
  }
  @ViewChild('CellTemplateStyle', { read: CellStyle, static: false })
  set cellTemplateStyle(value: CellStyle) {
    this._cellStyle = this.grdEnc.setCellStyle(
      value,
      this.grdEnc.columns
    );
  }
  // temporary solution
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    if (event.srcElement.localName == 'div') this.show = true;
  }

  constructor(private changeDetectorRef?: ChangeDetectorRef) {
    super();
    that = this;
    this.bIsLoaded = false;

    /* Revisit required */
    this.temp_assigningDataContext();

    //this.iPPMABaseVM.CurrentEncounterPageIndex = 1;
  }

  
  public totalCount: number = 0;
  public pageSize = 20;
  public skip: number = 0;
  public currentPage: number = 1;
  mldetails = Resource.Medlistdetails;
  _cellStyle = {};
  show: boolean = true;
  public offset: Offset = { left: 0, top: 120 };
  public type: AnimationType = 'expand';
  public direction: AnimationDirection = 'right';
  public duration = 200;
  public get animate(): boolean | PopupAnimation {
    if (this.show) {
      return {
        type: this.type,
        direction: this.direction,
        duration: this.duration,
      };
    }
    return false;
  }
  private lblEncounter: iLabel;
  private lblGPCStopComp: iLabel;
  private chkViewDiscontinueCancel: iCheckBox;
  private chkViewDiscontinueComplete: iCheckBox;
  private lblDisComp: iLabel;
  private tabLstVw: iTab;
  bIsLoaded: boolean;
  bIsTabDefault: boolean;
  iPPMABaseVM: IPPMABaseVM;
  oColl: ObservableCollection<CValuesetCollection>;
  private profile: ProfileFactoryType = new ProfileFactoryType();
  public gridView: GridDataResult;
  public IsGpConnectTab: boolean = true;
public maxLayoutHeight;
public maxGridHeight;
  ngOnInit(): void {
    this.grdEnc.RowIndicatorVisibility = Visibility.Visible;
   
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxLayoutHeight = window.innerHeight - 90;
      this.maxGridHeight = window.innerHeight - 250;
    }
    else if(!this.isChildWizard && window.screen.height > 1000 && window.devicePixelRatio != 1.25) {
      this.maxLayoutHeight = 713;
      this.maxGridHeight = 570;
    }
    else{
      this.maxLayoutHeight = window.innerHeight - 90;
      this.maxGridHeight = window.innerHeight - 250;
    }
  }
  ngAfterViewInit(): void {
    console.log('this.tabLstVw', this.tabLstVw);
    setTimeout(() => {
      console.log('this.tabLstVw settimeout', this.tabLstVw);
    }, 2000);
    this.UserControl_Loaded(null, null);
    /* Revisit required */
    // this.iPPMABaseVM.PageNavigationText = 'sample';    
    this.iPPMABaseVM.DefaultTabloadObs.subscribe((key) => {
      if(key !=null &&  key !=undefined && key.length > 0)
      {
      this.tabLstVw.SelectedKey = key;
      this.tabLstVw_SelectionChanged(null,null);
      }
    })
    this.grdEnc.selectedRowsIndex = [0];
  }

  mouseLeave(data) {
    this.show = data;
  }

  private sliceGridData(): void {
    this.gridView = {
      data: this.iPPMABaseVM.EncounterGrid.array.slice(
        this.skip,
        this.skip + this.pageSize
      ),
      total: this.iPPMABaseVM.EncounterGrid.Length,
    };
  }
  setGridData(): void {
    this.grdEnc.SetBinding('data', this.iPPMABaseVM.EncounterGrid);
  }
  onCellClick(): void {}
  getSelectedItems(event: number[]): void {
    this.grdEnc.SelectedItem = event[event.length - 1];
  }
  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.sliceGridData();
  }
  private grdEnc_LastPagerButtonClick(): void {
    this.iPPMABaseVM.CurrentEncounterPageIndex = this.pageSize;
  }
  private grdEnc_FirstPagerButtonClick(): void {
    this.iPPMABaseVM.CurrentEncounterPageIndex = 1;
  }
  private grdEnc_NextPagerButtonClick(): void {
    this.iPPMABaseVM.CurrentEncounterPageIndex = this.currentPage;
  }
  private grdEnc_PreviousPagerButtonClick(): void {
    this.iPPMABaseVM.CurrentEncounterPageIndex = this.currentPage;
  }
  private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (!this.bIsLoaded) {
      this.bIsLoaded = true;
    
      if (this.DataContext instanceof ClinicallyVerifyVM) {
        this.iPPMABaseVM = ObjectHelper.CreateType<ClinicallyVerifyVM>(
          this.DataContext,
          ClinicallyVerifyVM
        );
      } 
        //Not Required for LHS. To be Re-Visited.
      /*
      else if (this.DataContext instanceof AuthoriseVM) {
        this.iPPMABaseVM = ObjectHelper.CreateType<AuthoriseVM>(
          this.DataContext,
          AuthoriseVM
        );
      } else
      */
      {
        this.iPPMABaseVM = ObjectHelper.CreateType<MedicationPrescribeVM>(
          this.DataContext,
          MedicationPrescribeVM
        );
      }
      try {
        if (this.iPPMABaseVM != null) {
          this.iPPMABaseVM.EncDockerPanelHeight =
            ApplicationHelper.ActualHeight - 330;
        }
      } catch (ex: any) {
        let _ErrorSource: string =
          'LorAppManagePrescriptionBBUI_P2.dll, Class:Medtabs, Method:UserControl_Loaded()';
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          80000024,
          _ErrorSource,
          ex
        );
      }
    }
    console.log('this.tabLstVw user control', this.tabLstVw);
  }
  private profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result == null) return;
    if (Result.Profile instanceof PrescribingMethodConfigData) {
      ProfileData.PrescribeMethodConfig =
        ObjectHelper.CreateType<PrescribingMethodConfigData>(
          Result.Profile,
          PrescribingMethodConfigData
        );
    }
    this.PopulateTabs();
  }
  PopulateTabs(): void {
    let sMenuCode: string = ContextInfo.MenuCode;
    let sPresType: string = PrescriptionHelper.GetPrescriptionType(sMenuCode);
    if (String.Compare(sPresType, 'Inpatient') == 0)
      sPresType = PrescriptionTypes.Foradministration;
    let sPresMedCount: string = String.Empty;
    let sEncType: string = String.Empty;
    let strAllPresTypes: string = String.Empty;
    let sEncOID: string = String.Empty;
    if (String.IsNullOrEmpty(this.iPPMABaseVM.GridSelEncounterType)) {
      sEncType = PatientContext.EncounterType;
      sEncOID = PatientContext.EncounterOid.ToString();
    } else {
      sEncType = this.iPPMABaseVM.GridSelEncounterType;
      sEncOID = this.iPPMABaseVM.EncounterGridObj.EncounterID;
    }
    if (
      this.iPPMABaseVM.ViewEncounterType != null &&
      String.Compare(
        this.iPPMABaseVM.GridSelEncounterType,
        this.iPPMABaseVM.ViewEncounterType,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0 &&
      String.Compare(
        this.iPPMABaseVM.EncounterGridObj.EncounterID,
        this.iPPMABaseVM.ViewEncounterOID,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    )
      return;
    else {
      Common.LHSEncounterType = this.iPPMABaseVM.ViewEncounterType = sEncType;
      Common.LHSEncounterOID = this.iPPMABaseVM.ViewEncounterOID = sEncOID;
    }
    if (
      ProfileData.PrescribeMethodConfig != null &&
      ProfileData.PrescribeMethodConfig.EncounPresConfig != null
    ) {
      if (this.tabLstVw.HasItems) {
        for (
          let nCnt: number = this.tabLstVw.Items.Count - 1;
          nCnt >= 0;
          nCnt--
        )
          this.tabLstVw.Items.RemoveAt(nCnt);
      }
      let lstEncounterPresConfigurations =
        ProfileData.PrescribeMethodConfig.EncounPresConfig.Where(
          (x) =>
            x.EncounterCode == sEncType &&
            ((PatientContext.EncounterOid.ToString() ==
              this.iPPMABaseVM.ViewEncounterOID &&
              x.PrescriptionCodes != sPresType) ||
              PatientContext.EncounterOid.ToString() !=
                this.iPPMABaseVM.ViewEncounterOID)
        ).Select((x) => x);
      lstEncounterPresConfigurations.forEach((oList) => {
        if (!this.bIsTabDefault) this.bIsTabDefault = oList.IsDefault;
        switch (oList.PrescriptionCodes) {
          case 'Medication clerking':
            this.tabLstVw.AddTabItem(
              'CC_MEDCLERK1',
              'Clerked',
              // new MedListView('CC_MEDCLERK1', true),
              new MedListView(),
              oList.IsDefault,
              'Clerked'
            );
            sPresMedCount = 'CC_MEDCLERK1';
            break;
          case 'Discharge':
            this.tabLstVw.AddTabItem(
              'CC_DSCHRG',
              'Discharge',
              // new MedListView('CC_DSCHRG', true),
              new MedListView(),
              oList.IsDefault,
              'Discharge'
            );
            sPresMedCount = 'CC_DSCHRG';
            break;
          case 'Patient leave':
            this.tabLstVw.AddTabItem(
              'CC_Patientleave',
              'Leave',
              // new MedListView('CC_Patientleave', true),
              new MedListView(),
              oList.IsDefault,
              'Leave'
            );
            sPresMedCount = 'CC_Patientleave';
            break;
          case 'Outpatient':
            this.tabLstVw.AddTabItem(
              'CC_MED_TYP_OP',
              'Outpatient',
              // new MedListView('CC_MED_TYP_OP', true),
              new MedListView(),
              oList.IsDefault,
              'Outpatient'
            );
            sPresMedCount = 'CC_MED_TYP_OP';
            break;
          case PrescriptionTypes.Foradministration:
            if (!(!PatientContext.IPPMADU_P2 && PatientContext.TTOPBBDU_P2)) {
              if (String.Compare(sEncType, 'CC_INPAT') == 0) {
                this.tabLstVw.AddTabItem(
                  'CC_FOR_ADMIN',
                  'Inpatient',
                  // new MedListView('CC_FOR_ADMIN', true),
                  new MedListView(),
                  oList.IsDefault,
                  'Inpatient'
                );
                sPresMedCount = 'CC_FOR_ADMIN';
                break;
              } else {
                this.tabLstVw.AddTabItem(
                  'CC_FRADMINSTN',
                  PrescriptionTypes.Foradministration,
                  // new MedListView('CC_FRADMINSTN', true),
                  new MedListView(),
                  oList.IsDefault,
                  PrescriptionTypes.Foradministration
                );
                sPresMedCount = 'CC_FRADMINSTN';
                break;
              }
            }
            break;
        }
        if (String.Compare(strAllPresTypes, String.Empty) == 0)
          strAllPresTypes = sPresMedCount;
        else strAllPresTypes = strAllPresTypes + ',' + sPresMedCount;
      });
      this.iPPMABaseVM.AllPresTypes = strAllPresTypes;
      if (!this.bIsTabDefault) {
        this.iPPMABaseVM.DefSearchPresType = this.tabLstVw.SelectedKey;
        this.bIsTabDefault = true;
        if (String.IsNullOrEmpty(this.tabLstVw.SelectedKey))
          this.tabLstVw.SelectedIndex = 0;
      }
    }
  }
  tabLstVw_SelectionChanged_func = (s, e) => {
    // console.log('tabLstVw_SelectionChanged_func', this.tabLstVw, that.tabLstVw, that);
    //this.tabLstVw = that.tabLstVw;
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.tabLstVw_SelectionChanged(s, e);
  };
  tabLstVw_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
    if (this.iPPMABaseVM != null) {
      if (this.tabLstVw.SelectedKey != CConstants.TABGPCONNECT) {
        that.IsGpConnectTab = false;
      } else {
        that.IsGpConnectTab = true;
      }
      this.iPPMABaseVM.SearchPresType = this.tabLstVw.SelectedKey;
      this.lblEncounter.Visibility =
        this.lblDisComp.Visibility =
        this.chkViewDiscontinueCancel.Visibility =
        this.chkViewDiscontinueComplete.Visibility =
          !String.IsNullOrEmpty(this.iPPMABaseVM.SearchPresType) &&
          this.iPPMABaseVM.SearchPresType.Equals(CConstants.TABGPCONNECT)
            ? Visibility.Collapsed
            : Visibility.Visible;
      this.iPPMABaseVM.GPCStopCompTxtVisibility =
        !String.IsNullOrEmpty(this.iPPMABaseVM.SearchPresType) &&
        this.iPPMABaseVM.SearchPresType.Equals(CConstants.TABGPCONNECT) &&
        this.iPPMABaseVM.GPCStopCompTxtDisplay
          ? Visibility.Visible
          : Visibility.Collapsed;
      this.iPPMABaseVM.GpConnectMedicationItem =
        this.iPPMABaseVM.SelectedGPConnectItem = null;
      if (this.iPPMABaseVM.SearchPresType.Equals(CConstants.TABGPCONNECT)) {
        this.iPPMABaseVM.LoadGpConnectItems();             
      } else {
        let oMedListView: MedListView = ObjectHelper.CreateType<MedListView>(
          this.tabLstVw.SelectedContent,
          MedListView
        );
        if (oMedListView != null) {
          if (
            (String.Equals(this.iPPMABaseVM.SearchPresType, 'CC_FOR_ADMIN') &&
              this.iPPMABaseVM.MedsInPatient != null) ||
            (String.Equals(this.iPPMABaseVM.SearchPresType, 'CC_DSCHRG') &&
              this.iPPMABaseVM.MedsDischarge != null) ||
            (String.Equals(this.iPPMABaseVM.SearchPresType, 'CC_MED_TYP_OP') &&
              this.iPPMABaseVM.MedsOutPatient != null) ||
            (String.Equals(
              this.iPPMABaseVM.SearchPresType,
              'CC_Patientleave'
            ) &&
              this.iPPMABaseVM.MedsLeave != null) ||
            (String.Equals(this.iPPMABaseVM.SearchPresType, 'CC_MEDCLERK1') &&
              this.iPPMABaseVM.MedsClerked != null)
          ) {
            this.iPPMABaseVM.CompletedItemMsg(
              'LHS',
              this.iPPMABaseVM.SearchPresType
            );
          }
          let IncludeCheck: boolean =
            !ObjectHelper.HasValue(oMedListView.IncludeCheck) ||
            oMedListView.IncludeCheck != this.iPPMABaseVM.IsSearchDisCanChecked
              ? true
              : false;
          let IncludeDisCompletedCheck: boolean =
            !ObjectHelper.HasValue(oMedListView.IncludeDisCompletedCheck) ||
            oMedListView.IncludeDisCompletedCheck !=
              this.iPPMABaseVM.IsSearchDisCompletedChecked
              ? true
              : false;
          if (IncludeCheck || IncludeDisCompletedCheck) {
            if (IncludeCheck && IncludeDisCompletedCheck) {
              this.iPPMABaseVM.IsTabSelectionChanged =
                this.iPPMABaseVM.IsSearchDisCanChecked;
            } else if (IncludeCheck && !IncludeDisCompletedCheck) {
              this.iPPMABaseVM.IsTabSelectionChanged =
                this.iPPMABaseVM.IsSearchDisCanChecked;
            } else if (!IncludeCheck && IncludeDisCompletedCheck) {
              this.iPPMABaseVM.IsTabSelectionChanged =
                this.iPPMABaseVM.IsSearchDisCompletedChecked;
            }
            if (IncludeCheck) {
               oMedListView.IncludeCheck =
                 this.iPPMABaseVM.IsSearchDisCanChecked;
            }
            if (IncludeDisCompletedCheck) {              
               oMedListView.IncludeDisCompletedCheck =
                 this.iPPMABaseVM.IsSearchDisCompletedChecked;
            }
          }
        }
      }
    }
  }
  grdEnc_SelectionChanged(e: SelectionChangeEventArgs, sender?: Object): void {
    let sEncOID: string = String.Empty;
    if (e && e.selectedRows && e.selectedRows.length > 0)
    this.iPPMABaseVM.EncounterGridObj = e.selectedRows[0].dataItem; 
    if (String.IsNullOrEmpty(this.iPPMABaseVM.GridSelEncounterType)) {
      sEncOID = PatientContext.EncounterOid.ToString();
    } else {
      sEncOID = this.iPPMABaseVM.EncounterGridObj.EncounterID;
    }
    if (this.iPPMABaseVM != null) {
      if (sEncOID != PatientContext.EncounterOid.ToString()) {
        this.iPPMABaseVM.EncounterLHSColorSet = 'Blue';
      } else {
        this.iPPMABaseVM.EncounterLHSColorSet = 'Black';
      }
    }
    let objReq: CReqMsgGetLastCreatedPrescTypeForEnc =
      new CReqMsgGetLastCreatedPrescTypeForEnc();
    objReq = new CReqMsgGetLastCreatedPrescTypeForEnc();
    objReq.oContextInformation = Common.FillContext();
    objReq.EncounterOIDBC = Convert.ToInt64(sEncOID);
    objReq.PatientOIDBC = PatientContext.PatientOID;
    let obj: IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescriptionWSSoapClient();
    obj.GetLastCreatedPrescTypeForEncCompleted = (s, e) => {
      this.obj_GetLastCreatedPrescTypeForEncCompleted(s, e);
      AppLoadService.medtabChangeFlag.next(true); 
    };
    obj.GetLastCreatedPrescTypeForEncAsync(objReq);
    this.show = true;
  }
  obj_GetLastCreatedPrescTypeForEncCompleted(
    sender: Object,
    e: GetLastCreatedPrescTypeForEncCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResponse: CResMsgGetLastCreatedPrescTypeForEnc = e.Result;
    if (objResponse != null && objResponse.sPrescType != null) {
      this.iPPMABaseVM.CopyAcrossPresType = objResponse.sPrescType;
    }
    this.iPPMABaseVM.bIsMedTabDefault = false;
    this.iPPMABaseVM.PopulateTabs();
      this.changeDetectorRef.detectChanges();
  }
  chkViewDiscontinueCancel_KeyDown(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.chkViewDiscontinueCancel.IsChecked =
        !this.chkViewDiscontinueCancel.IsChecked;
    }
  }
  chkViewDiscontinueComplete_KeyDown(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.chkViewDiscontinueComplete.IsChecked =
        !this.chkViewDiscontinueComplete.IsChecked;
    }
  }
  toggleText: string = 'Hide';
  DockPanel_OnExpand(sender?: Object, e?: EventArgs): void {
    this.show = !this.show;
    this.toggleText = this.show ? 'Hide' : 'Show';
    if (this.iPPMABaseVM.CurrentEncounterPageIndex == 0) {
      let temp = this.iPPMABaseVM.Currentindexsetcomplete.subscribe(data => {
        this.sliceGridData();
        let selectedIdx = this.grdEnc.ItemsSource.array.findIndex(
          (x) => x.EncounterID === this.iPPMABaseVM.EncounterGridObj.EncounterID
        );
        if (selectedIdx != undefined && selectedIdx >= 0) {
          this.grdEnc.selectedRowsIndex = [selectedIdx];
          this.grdEnc_SelectionChanged(null);
        }    
        this.totalCount = this.grdEnc.ItemsSource.Length;    
        // To be revisited - proper paging needs to be implemented.
        // this.grdEnc.NavigatorText = this.DataContext.PageNavigationText
        this.grdEnc.NavigatorText = '1 of 1';
        temp.unsubscribe();
        this.changeDetectorRef.detectChanges();
      });
      this.iPPMABaseVM.CurrentEncounterPageIndex = 1;                 
    }
  }
  public DisposeFormEvents(): void {
    // if (this.grdEnc != null) {
    //     this.grdEnc.PreviousPagerButtonClick -= grdEnc_PreviousPagerButtonClick;
    //     this.grdEnc.NextPagerButtonClick -= grdEnc_NextPagerButtonClick;
    //     this.grdEnc.FirstPagerButtonClick -= grdEnc_FirstPagerButtonClick;
    //     this.grdEnc.LastPagerButtonClick -= grdEnc_LastPagerButtonClick;
    // }
  }
  private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
    this.DisposeFormEvents();
  }

  private temp_assigningDataContext() {
    // let parent = new MedicationPrescriptionCA();
    // parent.InvokeForm();
    this.DataContext = Common.oIPPMABaseVM;

    this.iPPMABaseVM = ObjectHelper.CreateType<MedicationPrescribeVM>(
      this.DataContext,
      MedicationPrescribeVM
    );
  }

  getSelectedKey() {
    console.log(
      'this.tabLstVw.SelectedContent',
      this.tabLstVw.SelectedContent,
      this.tabLstVw.SelectedKey
    );
    // alert(this.tabLstVw.SelectedKey);
  }
}
