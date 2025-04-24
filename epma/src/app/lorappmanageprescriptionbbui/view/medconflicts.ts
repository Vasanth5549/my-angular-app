import { ObjectHelper } from 'epma-platform/helper';
import { HtmlPage, Visibility, StringComparison } from 'epma-platform/models';
import { Convert, iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs } from 'epma-platform/services';
import { ActivityTypes } from '../model/common';
import { UserPermissions } from '../utilities/profiledata';
import { Resource } from '../resource';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { UserControl, iComboBox, DataTemplate } from 'epma-platform/controls';
import { GridExtension, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { ConflictsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/conflictsvm';
import { CConstants, PrescriptionItemStatusCodes } from '../utilities/constants';
import { ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { GridComponent } from '@progress/kendo-angular-grid';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CommonService } from 'src/app/product/shared/common.service';


@Component({
  selector: 'medconflicts',
  templateUrl: './medconflicts.html',
  styleUrls: ['./medconflicts.css']
})

export class medconflicts extends UserControl implements OnInit, AfterViewInit, OnDestroy {
  public comobBoxInstance;
  public grdConflicts: GridExtension = new GridExtension();
  public Styles = ControlStyles;
  public conflicts = Resource.conflicts;
  public bIsLoaded: boolean = false;
  public bBreakSeal: boolean = false;
  public oVM: ConflictsVM;
  public oIPVM: PrescriptionItemVM;
  override _DataContext: PrescriptionItemVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: PrescriptionItemVM) {
    this._DataContext = value;
  }
  private cboReason: QueryList<iComboBox>;
  @ViewChildren('cboReasonTempRef', { read: iComboBox })
  set _cboReason(c: QueryList<iComboBox>) {
      if (c) {
      this.cboReason = c;
      }
  };
  @ViewChild('grdConflictsTempRef', { read: GridComponent, static: false }) set _grdConflicts(c: GridComponent) {
    if (c) {
      this.grdConflicts.grid = c;
      this.grdConflicts.columns = c.columns;
    }
  }

  @ViewChildren('medConflictsDataTemplate') dataTemplates: QueryList<DataTemplate>;
  public gridsLastItem:any = null;
  public gridLastItemClicked:any = null;

  constructor() {
    super();
  }
  
  ngOnInit(): void {
    this.grdConflicts.RowIndicatorVisibility = Visibility.Visible;
  }

  ContentScrollEvent(e) {
    if (this.gridsLastItem != null && this.gridLastItemClicked != null && (this.gridsLastItem-1) == this.gridLastItemClicked) {
      this.gridLastItemClicked = null;
      this.comobBoxInstance.toggle(true);
    } else {
      this.comobBoxInstance.toggle(false);
    }
  }

  getCombo(e) {
    this.comobBoxInstance = e;
  }
  onLastItemClicked(rowIndex) {
    this.gridLastItemClicked = rowIndex;
  }

  public HideHorizontalScrollBar: boolean = false;
  public ShowHorizontalScrollBar: boolean = false;
  public maxGridHeight;
  ngAfterViewInit(): void {
    this.maxGridHeight = CommonService.setDynamicScrollviewerHeight();
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxGridHeight = this.maxGridHeight - 70;
    }
    else{  
    if(this.maxGridHeight){
      this.maxGridHeight = (this.maxGridHeight - 70);
    }
    else{
      this.maxGridHeight = 390;
    }
  }
    // generate columns is used to access the column data using uniquename
    this.grdConflicts.GenerateColumns();
    this.LayoutRoot_Loaded(null,null);
    this.SetGridScrollBar();
     if(this.DataContext.IsFormViewerDisable){
      this.grdConflicts.IsEnabled = false;
    } else {
      this.grdConflicts.IsEnabled = this.DataContext.FormViewerDetails.BasicDetails.IsEnableDRCDoseType;
    }
    if (this.DataContext.FormViewerDetails.ConflictDetails&&this.DataContext.FormViewerDetails.ConflictDetails.Count>0) {
      this.grdConflicts.SetBinding('data',this.DataContext.FormViewerDetails.ConflictDetails);
      let itemsource: any = this.DataContext.FormViewerDetails.ConflictDetails.array;
      this.gridsLastItem = itemsource.length;

    }
    this.DataContext.FormViewerDetails.PropertyChanged = (s, e) => {
      if (e.PropertyName == 'ConflictDetails') {
        this.grdConflicts.SetBinding('data',this.DataContext?.FormViewerDetails?.ConflictDetails);
        this.grdConflicts.RowIndicatorVisibility = Visibility.Visible;
        this.grdConflicts.IsEnabled = this.DataContext?.FormViewerDetails?.BasicDetails?.IsEnableDRCDoseType;
        let itemsource: any = this.DataContext?.FormViewerDetails?.ConflictDetails?.array;
        this.gridsLastItem = itemsource?.length;
      }
  }
  }

  cboClinicalReason_LostFocus_func = (s, e) => { this.cboClinicalReason_LostFocus(s, e); }
  
  public rowLoaded(context: any) {
    let rowEventArgs = this.grdConflicts.GetRowEventArgs(this.dataTemplates, context);
    this.grdConflicts_RowLoaded({}, rowEventArgs);
  }
  
  private ColumnVisibility(IsAllColumn: boolean, visibility: boolean): void {
    if (IsAllColumn) {
      this.grdConflicts.Columns['AuthoriserReason'].IsVisible = false;
      this.grdConflicts.Columns['AuthVerifyAuthoriserReason'].IsVisible = false;
      this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = false;
      this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = false;
    } else {
      this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = visibility;
      this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = !visibility;
      this.grdConflicts.Columns['AuthoriserReason'].IsVisible = !visibility;
      this.grdConflicts.Columns['AuthVerifyAuthoriserReason'].IsVisible = visibility;
    }
    this.grdConflicts.UpdateColumns();
  }

  private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
    let oIPVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
    if (oIPVM != null) {      
      oIPVM.IsConflictViewed = true;
      oIPVM.IsConflictFaxTabLoaded = true;
      let bIsModificationReasonExists: boolean = oIPVM.FormViewerDetails.BasicDetails.IsModificationReasonExists;
      if (!oIPVM.IsLoadBasicFaxTab && !oIPVM.IsTechValFauxTabLoaded) {
        oIPVM.IsReasonForModificationVisible = Visibility.Collapsed;
        oIPVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
        oIPVM.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD = false;
        oIPVM.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
        oIPVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
        oIPVM.FormViewerDetails.BasicDetails.IsValidateDose = true;
        oIPVM.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
        oIPVM.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
        if (bIsModificationReasonExists)
          oIPVM.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
      }
    }
    if (oIPVM != null && !this.bIsLoaded) {
      this.bIsLoaded = true;
    }
    let oVM: IPPMABaseVM;
    if (<PrescriptionItemVM>this.DataContext != null) {
      oVM = (<PrescriptionItemVM>this.DataContext).ParentbaseVM;
      if (oVM != null && oVM.MedsResolve != null && oVM.MedsResolve.Count > 0) {
        let ResCount: number = oVM.MedsResolve.Count;
        for (let i: number = 0; i < ResCount; i++) {
          if (
            oVM.MedsResolve[i].PrescriptionItemOID ==
              oIPVM.PrescriptionItemOID &&
            !String.IsNullOrEmpty(oVM.MedsResolve[i].LorenzoID) &&
            oVM.MedsResolve[i].LorenzoID.Equals(oIPVM.LorenzoID)
          ) {
            oIPVM.IsUnholddrug = oVM.MedsResolve[i].IsUnholddrug;
            oIPVM.IsHold = oVM.MedsResolve[i].IsHold;
            if (
              String.Compare(
                oVM.MedsResolve[i].PrescriptionItemStatus,
                CConstants.ONHOLD,
                StringComparison.OrdinalIgnoreCase
              ) == 0 &&
              !String.IsNullOrEmpty(oVM.MedsResolve[i].HoldReason)
            )
              oIPVM.IsHold = true;
            // oIPVM.PrescribeThisItemEvent -= oVM.PrescribeExistingItem;
            oIPVM.PrescribeThisItemEvent = (s, e) => { oVM.PrescribeExistingItem(s, e); };
            break;
          }
        }
      }
    }
    if (oIPVM != null && oIPVM.ActionCode == ActivityTypes.Amend) {
      if (
        String.Equals(oIPVM.OperationMode, 'N', StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(oIPVM.OperationMode, 'U', StringComparison.InvariantCultureIgnoreCase) ||
        oIPVM.HIIsAcknowledged == '2' || oIPVM.IsUnholddrug
      ) {
        this.grdConflicts.Columns['PrescriberReason'].IsVisible = true;
        this.grdConflicts.Columns['AuthVerifyPrescriberReason'].IsVisible = false;
        if (
          String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) ||
          String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenu, StringComparison.InvariantCultureIgnoreCase)
        ) {
          this.ColumnVisibility(false, true);
        } else if (
          String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) ||
          String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenu, StringComparison.InvariantCultureIgnoreCase)
        ) {
          this.ColumnVisibility(false, false);
        } else {
          this.ColumnVisibility(true, false);
        }
      } else {
        this.grdConflicts.Columns['PrescriberReason'].IsVisible = false;
        this.grdConflicts.Columns['AuthVerifyPrescriberReason'].IsVisible = true;
        if (
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.ClinicallyVerifyMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.ClinicallyVerifyMenu,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          this.grdConflicts.Columns['AuthoriserReason'].IsVisible = false;
          this.grdConflicts.Columns['AuthVerifyAuthoriserReason'].IsVisible = true;
          if (String.Equals(oIPVM.PrescriptionItemStatus, PrescriptionItemStatusCodes.SUBMITTED, StringComparison.InvariantCultureIgnoreCase)
          ) {
            if (
              oIPVM.FormViewerDetails != null &&
              oIPVM.FormViewerDetails.BasicDetails != null &&
              oIPVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD
            ) {
              this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = false;
              this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = true;
            } else {
              this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = true;
              this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = false;
            }
          } else {
            this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = false;
            this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = true;
          }
        } else if (
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.AuthoriseMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.AuthoriseMenu,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          this.grdConflicts.Columns['ClinicalVerfierReason'].IsVisible = false;
          this.grdConflicts.Columns['AuthVerifyClinicalVerfierReason'].IsVisible = true;
          if (
            String.Equals(
              oIPVM.PrescriptionItemStatus,
              PrescriptionItemStatusCodes.AWAITINGAUTHORISE,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            this.grdConflicts.Columns['AuthoriserReason'].IsVisible = true;
            this.grdConflicts.Columns['AuthVerifyAuthoriserReason'].IsVisible = false;
          } else {
            this.grdConflicts.Columns['AuthoriserReason'].IsVisible = false;
            this.grdConflicts.Columns['AuthVerifyAuthoriserReason'].IsVisible = true;
          }
        } else {
          this.ColumnVisibility(true, false);
        }
      }
    } else {
      this.grdConflicts.Columns['PrescriberReason'].IsVisible = true;
      this.grdConflicts.Columns['AuthVerifyPrescriberReason'].IsVisible = false;
      if (
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.ClinicallyVerifyMenuCode,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.ClinicallyVerifyMenu,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.ColumnVisibility(false, true);
      } else if (
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.AuthoriseMenuCode,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.AuthoriseMenu,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.ColumnVisibility(false, false);
      } else {
        this.ColumnVisibility(true, false);
      }
    }
  }

  private grdConflicts_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(
        e.Row.Item,
        ConflictsVM
      );
      if (oVM instanceof ConflictsVM) {
        let sWarningType: string = oVM.WarningBehaviourType;
        if (
          String.Equals(
            sWarningType,
            'Type 1',
            StringComparison.OrdinalIgnoreCase
          ) ||
          (UserPermissions.PrescribeWithRestriction &&
            (String.Equals(
              sWarningType,
              'Type 2',
              StringComparison.OrdinalIgnoreCase
            ) ||
              String.Equals(
                sWarningType,
                'Type 3',
                StringComparison.OrdinalIgnoreCase
              )))
        ) {
          e.Row.IsEnabled = false;
        }
        if ((oVM.IsSeal && !this.bBreakSeal) || String.Equals(oVM.SealType, 'CC_SEALLOCK')) {
          e.Row.IsEnabled = false;
          e.Row.Visibility = Visibility.Collapsed;
        }
      }
    }
  }

  public cmdMedConflctSeal_Click(sender: Object, e: RoutedEventArgs): void {
    let oMsg: iMessageBox = new iMessageBox();
    oMsg.Title = 'Warning - LORENZO';
    oMsg.Height = 200;
    oMsg.Width = 360;
    oMsg.Message = Resource.prescribedrugs.Seal_msg;
    oMsg.MessageButton = MessageBoxButton.YesNo;
    oMsg.IconType = MessageBoxType.Question;
    oMsg.Show();
    oMsg.MessageBoxClose = (s, e) => { this.oMsg_MessageBoxClose(s, e); };
  }

  oMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.LaunchBreakSeal();
    }
  }

  private LaunchBreakSeal(): void {
    let oReturn: Object;
    oReturn = HtmlPage.Window.Invoke('LaunchBreakSeal');
    if (oReturn != null) {
      this.bBreakSeal = true;
      PatientContext.PatientSealBreakExists = true;
      let oIPVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
      if (oIPVM != null && oIPVM.FormViewerDetails != null && oIPVM.FormViewerDetails.BasicDetails != null) {
        oIPVM.FormViewerDetails.BasicDetails.IsConflictExistSealInfo = false;
      }
      this.grdConflicts.Rebind();
    }
  }

  public cboClinicalReason_LostFocus(sender: Object, e: RoutedEventArgs): void {
    let cboClinicalReason: iComboBox = ObjectHelper.CreateType<iComboBox>(sender, iComboBox);
    let oIPVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
    if (
      cboClinicalReason != null &&
      !String.IsNullOrEmpty(
        Convert.ToString(cboClinicalReason.SelectedValue)
      ) &&
      oIPVM != null &&
      oIPVM.HIIsAcknowledged != '5'
    ) {
      if (
        String.Equals(
          Convert.ToString(cboClinicalReason.SelectedValue),
          CConstants.Selectreason,
          StringComparison.OrdinalIgnoreCase
        ) != true
      ) {
        oIPVM.HIIsAcknowledged = '5';
      }
    } else {
    }
  }

  public DisposeFormEvents(): void {
    // this.grdConflicts.RowLoaded -= grdConflicts_RowLoaded;
  }

  public DisposeFormObjects(): void {
    this.oVM = null;
    this.oIPVM = null;
    this.grdConflicts = null;
  }
  private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
    this.DisposeFormEvents();
    if (this.oIPVM != null) {
      this.oIPVM.DoCleanUP();
    }
  }

  private SetGridScrollBar() {
    setTimeout(() => {
      const GridDOM = document.querySelector('#grdConflicts');
      const GridContentWidth = this.grdConflicts?.grid?.columnsContainer?.unlockedWidth;
      if (GridDOM && GridContentWidth) {
        const GridWidth = GridDOM.getBoundingClientRect().width;
        if (GridContentWidth <= GridWidth) {
          this.HideHorizontalScrollBar = true;
        }
        else {
          this.ShowHorizontalScrollBar = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.UserControl_Unloaded(null,null);
  }
  public iCheckBox_OnChange(sender: any, rowIndex): void {
      this.cboReason.forEach((combobox: iComboBox, i:number) => {
          if(rowIndex==i){
            combobox.SelectedValue = null;
            combobox.inputSelector.value=null;
            combobox.text="";
          }
      });
  }
}
