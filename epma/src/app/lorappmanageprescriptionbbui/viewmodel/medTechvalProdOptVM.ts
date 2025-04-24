import { Component, OnInit } from '@angular/core';
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
  Visibility,
  ChildWindow,
  ObservableCollection,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  CListItem,
  List,
  StringSplitOptions
} from 'epma-platform/models';
import { AppDialog, iLabel, iTabItem } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
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
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { BasicDetailsVM } from './BasicDetailsVM';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CustomTechValidatedItem } from './customtechvalidateditem';
import {
  CConstants,
  PrescriptionTypes,
  ValueDomain,
} from '../utilities/constants';
import { ProfileData } from '../utilities/profiledata';
import { TechValidateVM } from './TechValidateVM';
import { SupplyDispensingInstructionsVM } from './SupplyDispensingInstructionsVM';
import { Common } from '../utilities/common';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { FormviewerComboValues } from '../utilities/globalvariable';
import { Resource } from 'src/app/lorappmanageprescriptionbbui/resource';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
//import { DrugItemBasicInfo } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import {
  AppSessionInfo,
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { Environment } from '../../product/shared/models/Common';
import { disconcan1 } from '../resource/disconcan1.designer';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { medsupplydispensinginstructionstab } from '../view/medsupplydispensinginstructionstab';
import { medsupplydispensinginstructions } from '../view/medsupplydispensinginstructions';

export class medTechvalProdOptVM
  extends ClonableViewModelBase
  implements IViewModelBase
{
  public oitems: PrescriptionItemVM;
  public BasicDetails: BasicDetailsVM = null;
  private _isFormularyOptions: Visibility = Visibility.Collapsed;
  private _isCatalogueOptions: Visibility = Visibility.Collapsed;
  private _bIsAllProdCheckedRelated: boolean = false;
  private _MsgBoxTitle: string;
  private sAllProdCheckedValue: string;
  public IsMciChildSelected: boolean = false;
  private _IsQuantityPerDoseMandatory: boolean = false;
  private _quantity: string;
  private _totalQuantity: string;
  private _quantityUOM: CListItem;
  private _totalquantityUOM: CListItem;
  private oChildWindow: ChildWindow;
  private _IsMandatoryTechValCASupplyInstr: boolean = false;
  public launchTechvalCAsupplyinstrmezzanineCheck: boolean = false;
  public LoadProdOptData(
    obj: PrescriptionItemVM,
    isDefaultSetItm: boolean
  ): void {
    this.oitems = obj;
    this.GetProductOptions();
    if (isDefaultSetItm) this.SetTechValidatedItem();
  }
  public SetTechValidatedItem(): void {
    if (this.oitems != null && this.oitems.FormViewerDetails != null) {
      if (this.oitems.FormViewerDetails.BasicDetails != null) {
        if (
          !String.IsNullOrEmpty(
            this.oitems.FormViewerDetails.BasicDetails.IdentifyingName
          ) &&
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingName.Contains(
            '~'
          )
        ) {
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingName =
            this.oitems.FormViewerDetails.BasicDetails.IdentifyingName.Substring(
              0,
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingName.IndexOf(
                '~'
              )
            );
        }
        if (
          this.oitems.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          this.oitems.FormViewerDetails.BasicDetails.InfusionDetails
            .FluidSelectvalue != null &&
          !String.IsNullOrEmpty(
            this.oitems.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidSelectvalue.Value
          ) &&
          this.oitems.FluidPrescribableItemListOID > 0
        ) {
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingName =
            this.oitems.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue.ToString();
        }
        this.PrescriptionItemName =
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingName;
      }
      if (
        this.oitems.FormViewerDetails.BasicDetails.ParentMCIItem != null &&
        String.Compare(
          this.oitems.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType,
          'CC_MULCMPNTITM',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        this.isShowallVisible = Visibility.Visible;
      } else {
        this.isShowallVisible = Visibility.Collapsed;
      }
      if (this.oitems.FormViewerDetails.TechvalidateCADetails != null) {
        this.IsMciChildSelected =
          this.oitems.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected;
        if (this.IsMciChildSelected) {
          this.PrescriptionItemName =
            this.oitems.FormViewerDetails.BasicDetails.mCChilditem;
          if (
            String.Equals(
              this.oitems.IsDeactivate,
              'Y',
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            this.isShowallVisible = Visibility.Collapsed;
          } else {
            this.isShowallVisible = Visibility.Visible;
          }
        } else {
          if (this.oitems.FormViewerDetails.BasicDetails != null) {
            this.PrescriptionItemName =
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingName;
          }
          if (
            !String.IsNullOrEmpty(
              this.oitems.FormViewerDetails.BasicDetails.OriginalIdentifyingName
            )
          )
            this.PrescriptionItemName =
              this.oitems.FormViewerDetails.BasicDetails.OriginalIdentifyingName;
          this.isShowallVisible = Visibility.Collapsed;
        }
        if (this.oitems.TechValidatedItems != null) {
          this.TechValidatedItems =
            new ObservableCollection<CustomTechValidatedItem>();
          let oTechValItem: CustomTechValidatedItem = null;
          this.oitems.TechValidatedItems.forEach((oTechItem) => {
            oTechValItem = new CustomTechValidatedItem();
            oTechValItem.ClinicalVerifyComments =
              oTechItem.ClinicalVerifyComments;
            oTechValItem.DrugItem = new ManagePrescSer.DrugItemBasicData();
            oTechValItem.DrugItem.IdentifyingName =
              oTechItem.DrugItem.IdentifyingName;
            oTechValItem.DrugItem.IdentifyingType =
              oTechItem.DrugItem.IdentifyingType;
            oTechValItem.DrugItem.IdentifyingOID =
              oTechItem.DrugItem.IdentifyingOID;
            oTechValItem.DrugItem.PrescribableItemListOID =
              oTechItem.DrugItem.PrescribableItemListOID;
            oTechValItem.DrugItem.MCVersionNo = oTechItem.DrugItem.MCVersionNo;
            oTechValItem.DrugItem.OperationMode =
              oTechItem.DrugItem.OperationMode;
            oTechValItem.DrugItem.PrescribableItemListOID =
              this.oitems.PrescriptionItemOID;
            oTechValItem.EPRFilterList = oTechItem.EPRFilterList;
            oTechValItem.IdentifyingDomain = oTechItem.IdentifyingDomain;
            oTechValItem.IsTechnicalvalidate = oTechItem.IsTechnicalvalidate;
            oTechValItem.LastModifiedAt = oTechItem.LastModifiedAt;
            oTechValItem.OperationMode = oTechItem.OperationMode;
            oTechValItem.PrescriptionItemTechOID =
              oTechItem.PrescriptionItemTechOID;
            oTechValItem.QuantityPerDose = oTechItem.QuantityPerDose;
            oTechValItem.QuantityPerDoseUOM = new ManagePrescSer.ObjectInfo();
            oTechValItem.QuantityPerDoseUOM.Name =
              oTechItem.QuantityPerDoseUOM.Name;
            oTechValItem.QuantityPerDoseUOM.OID =
              oTechItem.QuantityPerDoseUOM.OID;
            oTechValItem.SealImage = oTechItem.SealImage;
            oTechValItem.SealImageList = oTechItem.SealImageList;
            oTechValItem.SealRecordList = oTechItem.SealRecordList;
            oTechValItem.SealType = oTechItem.SealType;
            if (
              oTechItem.SupplyInstruction != null &&
              oTechItem.SupplyInstruction.Count > 0
            ) {
              oTechValItem.SupplyInstruction =
                new ObservableCollection<ManagePrescSer.ObjectInfo>();
              oTechItem.SupplyInstruction.forEach((objSupInfo) => {
                oTechValItem.SupplyInstruction.Add(
                  ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                    Code: objSupInfo.Code,
                    Name: objSupInfo.Name,
                  })
                );
              });
            }
            oTechValItem.TotalQuantity = oTechItem.TotalQuantity;
            oTechValItem.TotalQuantityUOM = new ManagePrescSer.ObjectInfo();
            oTechValItem.TotalQuantityUOM.Name =
              oTechItem.TotalQuantityUOM.Name;
            oTechValItem.TotalQuantityUOM.OID = oTechItem.TotalQuantityUOM.OID;
            oTechValItem.SupplyInstruction = oTechItem.SupplyInstruction;
            oTechValItem.SupplyInstructionText =
              oTechItem.SupplyInstructionText;
            oTechValItem.SupComments = oTechItem.SupComments;
            oTechValItem.selectedSupplyInstruction =
              oTechItem.selectedSupplyInstruction;
            oTechValItem.ProdSupplyInsWithComments =
              oTechItem.ProdSupplyInsWithComments;
            oTechValItem.IsDoseCombinationsDefined =
              oTechItem.IsDoseCombinationsDefined;
            this.TechValidatedItems.Add(oTechValItem);
          });
        } else if (
          this.oitems.FormViewerDetails.TechValidateDetails
            .TechValidatedItems != null &&
          this.oitems.FormViewerDetails.TechValidateDetails.TechValidatedItems
            .Count > 0
        ) {
          this.TechValidatedItems =
            new ObservableCollection<CustomTechValidatedItem>();
          let oTechValItem: CustomTechValidatedItem = null;
          this.oitems.FormViewerDetails.TechValidateDetails.TechValidatedItems.forEach(
            (oTechItem) => {
              oTechValItem = new CustomTechValidatedItem();
              oTechValItem.ClinicalVerifyComments =
                oTechItem.ClinicalVerifyComments;
              oTechValItem.DrugItem = new ManagePrescSer.DrugItemBasicData();
              if (
                this.PrescriptionItemName.Contains(
                  oTechItem.DrugItem.IdentifyingName
                ) ||
                oTechItem.DrugItem.IdentifyingName.Contains(
                  this.prescriptionItemName
                ) ||
                oTechItem.PrescriptionMultiComponentOID > 0
              ) {
                oTechValItem.DrugItem.IdentifyingName =
                  oTechItem.DrugItem.IdentifyingName;
                oTechValItem.DrugItem.IdentifyingType =
                  oTechItem.DrugItem.IdentifyingType;
                oTechValItem.DrugItem.IdentifyingOID =
                  oTechItem.DrugItem.IdentifyingOID;
                oTechValItem.DrugItem.PrescribableItemListOID =
                  oTechItem.DrugItem.PrescribableItemListOID;
                oTechValItem.DrugItem.MCVersionNo =
                  oTechItem.DrugItem.MCVersionNo;
                oTechValItem.DrugItem.OperationMode =
                  oTechItem.DrugItem.OperationMode;
                oTechValItem.DrugItem.PrescribableItemListOID =
                  this.oitems.PrescriptionItemOID;
                oTechValItem.EPRFilterList = oTechItem.EPRFilterList;
                oTechValItem.IdentifyingDomain = oTechItem.IdentifyingDomain;
                oTechValItem.IsTechnicalvalidate =
                  oTechItem.IsTechnicalvalidate;
                oTechValItem.LastModifiedAt = oTechItem.LastModifiedAt;
                oTechValItem.OperationMode = oTechItem.OperationMode;
                oTechValItem.PrescriptionItemTechOID =
                  oTechItem.PrescriptionItemTechOID;
                oTechValItem.QuantityPerDose = oTechItem.QuantityPerDose;
                oTechValItem.PrevQuantityPerDose =
                  oTechItem.PrevQuantityPerDose;
                oTechValItem.QuantityPerDoseUOM =
                  new ManagePrescSer.ObjectInfo();
                oTechValItem.QuantityPerDoseUOM.Name =
                  oTechItem.QuantityPerDoseUOM.Name;
                oTechValItem.QuantityPerDoseUOM.OID =
                  oTechItem.QuantityPerDoseUOM.OID;
                if (oTechItem.PrevQuantityPerDoseUOM != null) {
                  oTechValItem.PrevQuantityPerDoseUOM =
                    new ManagePrescSer.ObjectInfo();
                  oTechValItem.PrevQuantityPerDoseUOM.Name =
                    oTechItem.PrevQuantityPerDoseUOM.Name;
                  oTechValItem.PrevQuantityPerDoseUOM.OID =
                    oTechItem.PrevQuantityPerDoseUOM.OID;
                }
                oTechValItem.SealImage = oTechItem.SealImage;
                oTechValItem.SealImageList = oTechItem.SealImageList;
                oTechValItem.SealRecordList = oTechItem.SealRecordList;
                oTechValItem.SealType = oTechItem.SealType;
                if (
                  oTechItem.SupplyInstruction != null &&
                  oTechItem.SupplyInstruction.Count > 0
                ) {
                  oTechValItem.SupplyInstruction =
                    new ObservableCollection<ManagePrescSer.ObjectInfo>();
                  oTechItem.SupplyInstruction.forEach((objSupInfo) => {
                    oTechValItem.SupplyInstruction.Add(
                      ObjectHelper.CreateObject(
                        new ManagePrescSer.ObjectInfo(),
                        {
                          Code: objSupInfo.Code,
                          Name: objSupInfo.Name,
                        }
                      )
                    );
                  });
                }
                oTechValItem.TotalQuantity = oTechItem.TotalQuantity;
                oTechValItem.PrevTotalQuantity = oTechItem.PrevTotalQuantity;
                oTechValItem.TotalQuantityUOM = new ManagePrescSer.ObjectInfo();
                oTechValItem.TotalQuantityUOM.Name =
                  oTechItem.TotalQuantityUOM.Name;
                oTechValItem.TotalQuantityUOM.OID =
                  oTechItem.TotalQuantityUOM.OID;
                if (oTechItem.PrevTotalQuantityUOM != null) {
                  oTechValItem.PrevTotalQuantityUOM =
                    new ManagePrescSer.ObjectInfo();
                  oTechValItem.PrevTotalQuantityUOM.Name =
                    oTechItem.PrevTotalQuantityUOM.Name;
                  oTechValItem.PrevTotalQuantityUOM.OID =
                    oTechItem.PrevTotalQuantityUOM.OID;
                }
                oTechValItem.DoseComTotalPerQuantityUom =
                  oTechItem.TotalQuantity +
                  ' ' +
                  oTechItem.TotalQuantityUOM.Name;
                oTechValItem.SupplyInstruction = oTechItem.SupplyInstruction;
                oTechValItem.SupplyInstructionText =
                  oTechItem.SupplyInstructionText;
                oTechValItem.SupComments = oTechItem.SupComments;
                oTechValItem.PrevSupComments = oTechItem.PrevSupComments;
                oTechValItem.selectedSupplyInstruction =
                  oTechItem.selectedSupplyInstruction;
                oTechValItem.ProdSupplyInsWithComments =
                  oTechItem.ProdSupplyInsWithComments;
                oTechValItem.PrevProdSupplyInsWithComments =
                  oTechItem.PrevProdSupplyInsWithComments;
                oTechValItem.IsDoseCombinationsDefined =
                  oTechItem.IsDoseCombinationsDefined;
                oTechValItem.QuantityPerDose = oTechItem.QuantityPerDose;
                if (
                  oTechItem.QuantityPerDoseUOM != null &&
                  !String.IsNullOrEmpty(oTechItem.QuantityPerDoseUOM.Name)
                ) {
                  oTechValItem.DoseComQuantityPerDoseUom =
                    oTechItem.QuantityPerDose +
                    ' ' +
                    oTechItem.QuantityPerDoseUOM.Name;
                }
                this.TechValidatedItems.Add(oTechValItem);
              }
            }
          );
        }
      } else if (
        (this.oitems.FormViewerDetails.BasicDetails != null &&
          String.Equals(
            this.oitems.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.NONCATALOGUEITEM,
            StringComparison.InvariantCultureIgnoreCase
          )) ||
        String.Equals(
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.Precatalog,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Compare(
          this.oitems.FormViewerDetails.BasicDetails.itemSubType,
          'CC_MULCMPNTITM',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        this.PrescriptionItemName =
          this.oitems.FormViewerDetails.BasicDetails.IdentifyingName;
      }
    }
  }
  public get IsAllProdCheckedRelated(): boolean {
    return this._bIsAllProdCheckedRelated;
  }
  public set IsAllProdCheckedRelated(value: boolean) {
    this._bIsAllProdCheckedRelated = value;
    if (value) {
      this.sAllProdCheckedValue = '1';
      if (
        this.oitems != null &&
        this.oitems.FormViewerDetails != null &&
        this.oitems.FormViewerDetails.BasicDetails != null
      ) {
        if (
          String.Compare(
            this.oitems.LorenzoID,
            'PI-001',
            StringComparison.CurrentCultureIgnoreCase
          ) != 0 ||
          String.Compare(
            this.oitems.LorenzoID,
            'PI-001',
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        )
          this.GetProductOptions();
        else this.oProductOption = null;
      } else this.GetProductOptions();
    } else {
      this.sAllProdCheckedValue = '0';
      if (
        this.oitems != null &&
        this.oitems.FormViewerDetails != null &&
        this.oitems.FormViewerDetails.BasicDetails != null
      ) {
        if (
          String.Compare(
            this.oitems.LorenzoID,
            'PI-001',
            StringComparison.CurrentCultureIgnoreCase
          ) != 0 ||
          String.Compare(
            this.oitems.LorenzoID,
            'PI-001',
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        )
          this.GetProductOptions();
        else this.oProductOption = null;
      } else this.GetProductOptions();
    }
  }
  public get IsFormularyOptions(): Visibility {
    return this._isFormularyOptions;
  }
  public set IsFormularyOptions(value: Visibility) {
    if (this._isFormularyOptions != value) {
      this._isFormularyOptions = value;
      //super.NotifyPropertyChanged("IsFormularyOptions");
    }
  }
  public get IsCatalogueOptions(): Visibility {
    return this._isCatalogueOptions;
  }
  public set IsCatalogueOptions(value: Visibility) {
    if (this._isCatalogueOptions != value) {
      this._isCatalogueOptions = value;
      //super.NotifyPropertyChanged("IsCatalogueOptions");
    }
  }
  public CatalogueFormularySel(isCatBool: boolean): void {
    if (this.oitems != null) {
      if (isCatBool) {
        this.oitems.IsNonformulary = '0';
        if (this.IsMciChildSelected && this.IsAllProdCheckedRelated)
          this.IsAllProdCheckedRelated = true;
        if (this != null) {
          this.IsCatalogueOptions = Visibility.Collapsed;
          this.IsFormularyOptions = Visibility.Visible;
        }
      } else {
        this.oitems.IsNonformulary = '1';
        if (this.IsMciChildSelected && this.IsAllProdCheckedRelated)
          this.IsAllProdCheckedRelated = true;
        if (this != null) {
          this.IsCatalogueOptions = Visibility.Visible;
          this.IsFormularyOptions = Visibility.Collapsed;
        }
      }
      if (
        !String.Equals(
          this.oitems.LorenzoID,
          'PI-001',
          StringComparison.CurrentCultureIgnoreCase
        ) ||
        (String.Equals(
          this.oitems.LorenzoID,
          'PI-001',
          StringComparison.CurrentCultureIgnoreCase
        ) &&
          this.IsMciChildSelected)
      ) {
        this.LoadProdOptData(this.oitems, false);
      }
    }
  }
  private _isenableQtyPerDose: boolean = true;
  public get IsenableQtyDose(): boolean {
    return this._isenableQtyPerDose;
  }
  public set IsenableQtyDose(value: boolean) {
    if (value != this._isenableQtyPerDose) {
      this._isenableQtyPerDose = value;
      //super.NotifyPropertyChanged("IsenableQtyPerDose");
    }
  }
  private _IsenableTotQtyDose: boolean = true;
  public get IsenableTotQtyDose(): boolean {
    return this._IsenableTotQtyDose;
  }
  public set IsenableTotQtyDose(value: boolean) {
    if (value != this._IsenableTotQtyDose) {
      this._IsenableTotQtyDose = value;
      //super.NotifyPropertyChanged("IsenableTotQtyDose");
    }
  }
  private _isenableAdd: boolean = false;
  public get IsenableAdd(): boolean {
    return this._isenableAdd;
  }
  public set IsenableAdd(value: boolean) {
    if (value != this._isenableAdd) {
      this._isenableAdd = value;
      //super.NotifyPropertyChanged("IsenableAdd");
    }
  }
  private _isenableUpdate: boolean = false;
  public get IsenableUpdate(): boolean {
    return this._isenableUpdate;
  }
  public set IsenableUpdate(value: boolean) {
    if (value != this._isenableUpdate) {
      this._isenableUpdate = value;
      //super.NotifyPropertyChanged("IsenableUpdate");
    }
  }
  private _isenableRemove: boolean = false;
  public get IsenableRemove(): boolean {
    return this._isenableRemove;
  }
  public set IsenableRemove(value: boolean) {
    if (value != this._isenableRemove) {
      this._isenableRemove = value;
      //super.NotifyPropertyChanged("IsenableRemove");
    }
  }
  private _IsenableForOpt: boolean = true;
  public get IsenableForOpt(): boolean {
    return this._IsenableForOpt;
  }
  public set IsenableForOpt(value: boolean) {
    if (value != this._IsenableForOpt) {
      this._IsenableForOpt = value;
      //super.NotifyPropertyChanged("IsenableForOpt");
    }
  }
  private _IsenableCatOpt: boolean = true;
  public get IsenableCatOpt(): boolean {
    return this._IsenableCatOpt;
  }
  public set IsenableCatOpt(value: boolean) {
    if (value != this._IsenableCatOpt) {
      this._IsenableCatOpt = value;
      //super.NotifyPropertyChanged("IsenableCatOpt");
    }
  }
  private prescriptionItemName: string;
  public get PrescriptionItemName(): string {
    return this.prescriptionItemName;
  }
  public set PrescriptionItemName(value: string) {
    if (Helper.ReferenceEquals(this.prescriptionItemName, value) != true) {
      this.prescriptionItemName = value;
      //super.NotifyPropertyChanged("PrescriptionItemName");
    }
  }
  public _bShowallVisible: Visibility = Visibility.Collapsed;
  public get isShowallVisible(): Visibility {
    return this._bShowallVisible;
  }
  public set isShowallVisible(value: Visibility) {
    if (this._bShowallVisible != value) {
      this._bShowallVisible = value;
      //super.NotifyPropertyChanged("isShowallVisible");
    }
  }
  private _SelectedProdOpt: IPPManagePrescSer.DrugItemBasicInfo;
  public set SelectedProdOpt(value: IPPManagePrescSer.DrugItemBasicInfo) {
    if (Helper.ReferenceEquals(this._SelectedProdOpt, value) != true) {
      this._SelectedProdOpt = value;
      //NotifyPropertyChanged("SelectedProdOpt");
    }
  }
  public get SelectedProdOpt(): IPPManagePrescSer.DrugItemBasicInfo {
    return this._SelectedProdOpt;
  }
  private _oProductOption: ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo> = new ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo>();
  public get oProductOption(): ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo> {
    return this._oProductOption;
  }
  public set oProductOption(
    value: ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo>
  ) {
    if (value) {
      this._oProductOption.CopyFrom(value);
      //NotifyPropertyChanged("oProductOption");
    }
     else{
      this._oProductOption.Clear();
    }
  }
  private _propTechValItem: ObservableCollection<CustomTechValidatedItem> = new ObservableCollection<CustomTechValidatedItem>();
  public get TechValidatedItems(): ObservableCollection<CustomTechValidatedItem> {
    return this._propTechValItem;
  }
  public set TechValidatedItems(
    value: ObservableCollection<CustomTechValidatedItem>
  ) {
    if (this._propTechValItem != value) {
      this._propTechValItem.CopyFrom(value);
      // this._propTechValItem=value;
      //NotifyPropertyChanged("TechValidatedItems");
    }
  }
  private TechnicalvalidateupdateField: boolean = false;
  public get Technicalvalidateupdate(): boolean {
    return this.TechnicalvalidateupdateField;
  }
  public set Technicalvalidateupdate(value: boolean) {
    if (this.TechnicalvalidateupdateField.Equals(value) != true) {
      this.TechnicalvalidateupdateField = value;
      //NotifyPropertyChanged("Technicalvalidateupdate");
    }
  }
  private supplyInstrText: string;
  public get SupplyInsText(): string {
    return this.supplyInstrText;
  }
  public set SupplyInsText(value: string) {
    this.supplyInstrText = value;
    //super.NotifyPropertyChanged("SupplyInsText");
  }
  private supplyInstrVal: string;
  public get SupplyInsVal(): string {
    return this.supplyInstrVal;
  }
  public set SupplyInsVal(value: string) {
    this.supplyInstrVal = value;
    //super.NotifyPropertyChanged("SupplyInsVal");
  }
  public _Supplycomments: string;
  public get Supplycomments(): string {
    return this._Supplycomments;
  }
  public set Supplycomments(value: string) {
    if (this._Supplycomments != value) {
      this._Supplycomments = value;
      if (
        !String.IsNullOrEmpty(this.SupplyInsText) &&
        !String.Equals(
          this.SupplyInsText,
          Resource.TechValProdOpt.SelectSupInstrution,
          StringComparison.CurrentCultureIgnoreCase
        ) &&
        !String.IsNullOrEmpty(value)
      ) {
        this.SupplyInsTextWithComments =
          this.SupplyInsText + Environment.NewLine + 'Comments:' + value;
      } else if (
        !String.IsNullOrEmpty(this.SupplyInsText) &&
        !String.Equals(
          this.SupplyInsText,
          Resource.TechValProdOpt.SelectSupInstrution,
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        this.SupplyInsTextWithComments = this.SupplyInsText;
      } else if (!String.IsNullOrEmpty(value)) {
        this.SupplyInsTextWithComments = 'Comments:' + value;
      } else {
        this.SupplyInsTextWithComments =
          Resource.TechValProdOpt.SelectSupInstrution;
      }
      //NotifyPropertyChanged("Supplycomments");
    }
  }
  private _SupplyInsTextWithComments: string;
  public get SupplyInsTextWithComments(): string {
    return this._SupplyInsTextWithComments;
  }
  public set SupplyInsTextWithComments(value: string) {
    this._SupplyInsTextWithComments = value;
    //super.NotifyPropertyChanged("SupplyInsTextWithComments");
  }
  private _QuantityUOMLst: ObservableCollection<CListItem>;
  public get QuantityUOMList(): ObservableCollection<CListItem> {
    return this._QuantityUOMLst;
  }
  public set QuantityUOMList(value: ObservableCollection<CListItem>) {
    if (this._QuantityUOMLst != value) {
      this._QuantityUOMLst = value;
      //NotifyPropertyChanged("QuantityUOMList");
    }
  }
  private _TotalQuantityUOMList: ObservableCollection<CListItem>;
  public get TotalQuantityUOMList(): ObservableCollection<CListItem> {
    return this._TotalQuantityUOMList;
  }
  public set TotalQuantityUOMList(value: ObservableCollection<CListItem>) {
    if (this._TotalQuantityUOMList != value) {
      this._TotalQuantityUOMList = value;
      //NotifyPropertyChanged("TotalQuantityUOMList");
    }
  }
  public PrescribeSelection(
    IsAddeditem: boolean,
    bRemoveSelection: boolean
  ): void {
    this.Quantity = String.Empty;
    this.TotalQuantity = String.Empty;
    this.QuantityUOM = null;
    this.TotalQuantityUOM = null;
    this.TotalQuantityUOMList = null;
    this.QuantityUOMList = null;
    this.SetDefaultsupplyText();
    if (IsAddeditem) {
      this.IsenableQtyDose = true;
      if (
        ProfileData.AdditionalPrescConfig != null &&
        ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
        PatientContext.PrescriptionType != PrescriptionTypes.Clerking &&
        PatientContext.ClerkFormViewDefaultBehavior !=
          ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
        this.oitems != null &&
        this.oitems.FormViewerDetails != null &&
        this.oitems.FormViewerDetails.BasicDetails != null &&
        this.oitems.FormViewerDetails.BasicDetails.DrugProperties != null &&
        this.oitems.FormViewerDetails.BasicDetails.DrugProperties.Where((x) =>
          String.Equals(
            x.DrugPropertyCode,
            CConstants.DrugPropertyCNTRLDDRUG,
            StringComparison.InvariantCultureIgnoreCase
          )
        ).Count() > 0 &&
        String.Equals(
          ContextInfo.MenuCode,
          'MN_MED_VALIDATE_S_P2',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.IsenableTotQtyDose = false;
      } else {
        this.IsenableTotQtyDose = true;
      }
      this.IsenableAdd = true;
      this.IsenableUpdate = false;
      this.IsenableRemove = false;
    } else if (!bRemoveSelection) {
      this.IsenableQtyDose = false;
      this.IsenableTotQtyDose = false;
      this.EnableDisableButtonControls(false);
    }
  }
  public ClearInputControls(isPresRowCnt: boolean): void {
    this.Quantity = String.Empty;
    this.TotalQuantity = String.Empty;
    this.QuantityUOM = null;
    this.TotalQuantityUOM = null;
    this.SetDefaultsupplyText();
    if (!isPresRowCnt) {
      this.IsenableQtyDose = false;
      this.IsenableTotQtyDose = false;
      this.EnableDisableButtonControls(false);
    }
    this.TotalQuantityUOMList = null;
    this.QuantityUOMList = null;
  }
  public SetDefaultsupplyText(): void {
    let BasicDetails: BasicDetailsVM = null;
    if (
      this.oitems != null &&
      this.oitems.FormViewerDetails != null &&
      this.oitems.FormViewerDetails.BasicDetails != null
    ) {
      BasicDetails = this.oitems.FormViewerDetails.BasicDetails;
      let oSupplyInstTxt: string = String.Empty;
      let oSupplyInstVal: string = String.Empty;
      if (
        BasicDetails.SelectedsupplyInstruction != null &&
        BasicDetails.SelectedsupplyInstruction.Count > 0
      ) {
        BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
          BasicDetails.SelectedsupplyInstruction,
          (o1) => {
            oSupplyInstTxt = o1;
          },
          (o2) => {
            oSupplyInstVal = o2;
          }
        );
      }
      if (!String.IsNullOrEmpty(oSupplyInstVal)) {
        this.SupplyInsVal = oSupplyInstVal;
        if (!String.IsNullOrEmpty(oSupplyInstTxt)) {
          this.SupplyInsText = oSupplyInstTxt;
        }
        if (
          !String.IsNullOrEmpty(this.SupplyInsVal.ToString()) &&
          !String.IsNullOrEmpty(this.SupplyInsText.ToString())
        ) {
          BasicDetails.sDefaultTechValSuppInstTxt =
            this.SupplyInsText.ToString() + '^' + this.SupplyInsVal.ToString();
        }
      } else {
        this.SupplyInsVal = String.Empty;
        this.SupplyInsText = String.Empty;
      }
      this.Supplycomments = String.Empty;
      if (this.oitems.FormViewerDetails.TechValidateDetails != null) {
        this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments = null;
      }
      if (!String.IsNullOrEmpty(BasicDetails.Supplycomments)) {
        this.Supplycomments = String.Empty;
        this.Supplycomments = BasicDetails.Supplycomments;
      } else if (!String.IsNullOrEmpty(oSupplyInstVal)) {
        this.SupplyInsTextWithComments = oSupplyInstTxt;
      } else {
        this.SupplyInsVal = String.Empty;
        this.SupplyInsText = Resource.TechValProdOpt.SelectSupInstrution;
        this.Supplycomments = String.Empty;
        this.SupplyInsTextWithComments =
          Resource.TechValProdOpt.SelectSupInstrution;
      }
      let lblSupTooltip: iLabel = new iLabel();
      lblSupTooltip.Text = this.Supplycomments;
      lblSupTooltip.IsWordwrap = true;
      lblSupTooltip.Width = 250;
    }
  }
  public PopulateUOMs(objDrug: IPPManagePrescSer.DrugItemBasicInfo): void {
    this.QuantityUOMList = new ObservableCollection<CListItem>();
    this.TotalQuantityUOMList = new ObservableCollection<CListItem>();
    if (this != null) {
      if (objDrug != null && !String.IsNullOrEmpty(objDrug.TechQtyUomName)) {
        let sTechUOM: string[] = objDrug.TechQtyUomName.Split('$');
        for (let i: number = 0; i < sTechUOM.length; i++) {
          if (!String.IsNullOrEmpty(sTechUOM[i])) {
            let sUOM: string[] = sTechUOM[i].Split('*');
            if (sUOM.length < 2) continue;
            let QtyUOMLst: CListItem = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: sUOM[1],
                Value: sUOM[0],
              }
            );
            this.QuantityUOMList.Add(QtyUOMLst);
            let TotQtyUOM: CListItem = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: sUOM[1],
                Value: sUOM[0],
              }
            );
            this.TotalQuantityUOMList.Add(TotQtyUOM);
          }
        }
      }
    }
  }
  public SelectedUOMValues(oTech: CustomTechValidatedItem): void {
    if (!String.IsNullOrEmpty(oTech.QuantityPerDose))
      this.Quantity = oTech.QuantityPerDose;
    if (!String.IsNullOrEmpty(oTech.TotalQuantity))
      this.TotalQuantity = oTech.TotalQuantity;
    if (oTech.QuantityPerDoseUOM != null && oTech.QuantityPerDoseUOM && oTech.QuantityPerDoseUOM.OID) {
      if (oTech.QuantityPerDoseUOM.OID.ToString() != '0') {
        this.QuantityUOM = new CListItem();
        if (this.QuantityUOMList != null) {
          let oQtyUOM = this.QuantityUOMList.Where(
            (oitem) => oitem.Value == oTech.QuantityPerDoseUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oQtyUOM != null && oQtyUOM.Count() > 0) {
            this.QuantityUOM = oQtyUOM.FirstOrDefault();
          } else {
            this.QuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oTech.QuantityPerDoseUOM.Name,
              Value: oTech.QuantityPerDoseUOM.OID.ToString(),
            });
            this.QuantityUOMList = new ObservableCollection<CListItem>();
            this.QuantityUOMList.Add(this.QuantityUOM);

            let oQtyUOM1 = this.QuantityUOMList.Where(
              (oitem) => oitem.Value == oTech.QuantityPerDoseUOM.OID.ToString()
            ).Select((oitem) => oitem);

            if (oQtyUOM1 != null && oQtyUOM1.Count() > 0) {
              this.QuantityUOM = oQtyUOM1.FirstOrDefault();
            }
          }
        } else {
          this.QuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oTech.QuantityPerDoseUOM.Name,
            Value: oTech.QuantityPerDoseUOM.OID.ToString(),
          });
          this.QuantityUOMList = new ObservableCollection<CListItem>();
          this.QuantityUOMList.Add(this.QuantityUOM);

          let oQtyUOM1 = this.QuantityUOMList.Where(
            (oitem) => oitem.Value == oTech.QuantityPerDoseUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oQtyUOM1 != null && oQtyUOM1.Count() > 0) {
            this.QuantityUOM = oQtyUOM1.FirstOrDefault();
          }
        }
      }
    }
    if (oTech.TotalQuantityUOM != null && oTech.TotalQuantityUOM && oTech.TotalQuantityUOM.OID) {
      if (oTech.TotalQuantityUOM.OID.ToString() != '0') {
        this.TotalQuantityUOM = new CListItem();
        if (this.TotalQuantityUOMList != null) {
          let oTotQtyUOM = this.TotalQuantityUOMList.Where(
            (oitem) => oitem.Value == oTech.TotalQuantityUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oTotQtyUOM != null && oTotQtyUOM.Count() > 0) {
            this.TotalQuantityUOM = oTotQtyUOM.FirstOrDefault();
          } else {
            this.TotalQuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oTech.TotalQuantityUOM.Name,
              Value: oTech.TotalQuantityUOM.OID.ToString(),
            });
            this.TotalQuantityUOMList = new ObservableCollection<CListItem>();
            this.TotalQuantityUOMList.Add(this.TotalQuantityUOM);

            let oTotQtyUOM1 = this.TotalQuantityUOMList.Where(
              (oitem) => oitem.Value == oTech.TotalQuantityUOM.OID.ToString()
            ).Select((oitem) => oitem);

            if (oTotQtyUOM1 != null && oTotQtyUOM1.Count() > 0) {
              this.TotalQuantityUOM = oTotQtyUOM1.FirstOrDefault();
            }
          }
        } else {
          this.TotalQuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oTech.TotalQuantityUOM.Name,
            Value: oTech.TotalQuantityUOM.OID.ToString(),
          });
          this.TotalQuantityUOMList = new ObservableCollection<CListItem>();
          this.TotalQuantityUOMList.Add(this.TotalQuantityUOM);

          let oTotQtyUOM1 = this.TotalQuantityUOMList.Where(
            (oitem) => oitem.Value == oTech.TotalQuantityUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oTotQtyUOM1 != null && oTotQtyUOM1.Count() > 0) {
            this.TotalQuantityUOM = oTotQtyUOM1.FirstOrDefault();
          }
        }
      }
    }
    let sText: string;
    let sValue: string;
    this.GetStringValue(
      oTech.SupplyInstruction,
      ValueDomain.SupplyInstruction,
      (o1) => {
        sText = o1;
      },
      (o2) => {
        sValue = o2;
      }
    );
    if (!String.IsNullOrEmpty(sText)) {
      this.SupplyInsText = sText;
      this.SupplyInsVal = sValue;
    } else {
      this.SupplyInsText = Resource.TechValProdOpt.SelectSupInstrution;
      this.SupplyInsVal = sValue;
    }
    if (!String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)) {
      this.SupplyInsTextWithComments = oTech.ProdSupplyInsWithComments;
    } else {
      this.SupplyInsTextWithComments =
        Resource.TechValProdOpt.SelectSupInstrution;
    }
    if (!String.IsNullOrEmpty(oTech.SupComments)) {
      this.Supplycomments = oTech.SupComments;
    }
    this.IsenableQtyDose = true;
    if (
      ProfileData.AdditionalPrescConfig != null &&
      ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
      PatientContext.PrescriptionType != PrescriptionTypes.Clerking &&
      PatientContext.ClerkFormViewDefaultBehavior !=
        ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
      this.oitems != null &&
      this.oitems.FormViewerDetails != null &&
      this.oitems.FormViewerDetails.BasicDetails != null &&
      this.oitems.FormViewerDetails.BasicDetails.DrugProperties != null &&
      this.oitems.FormViewerDetails.BasicDetails.DrugProperties.Where((x) =>
        String.Equals(
          x.DrugPropertyCode,
          CConstants.DrugPropertyCNTRLDDRUG,
          StringComparison.InvariantCultureIgnoreCase
        )
      ).Count() > 0 &&
      String.Equals(
        ContextInfo.MenuCode,
        'MN_MED_VALIDATE_S_P2',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      this.IsenableTotQtyDose = false;
    } else {
      this.IsenableTotQtyDose = true;
    }
    this.IsenableAdd = false;
    this.IsenableUpdate = true;
    this.IsenableRemove = true;
  }
  public EnableDisableButtonControls(IsEnabledFlag: boolean): void {
    this.IsenableAdd = IsEnabledFlag;
    this.IsenableUpdate = IsEnabledFlag;
    this.IsenableRemove = IsEnabledFlag;
  }
  public TechValidate(TechVal: string): void {
    TechVal = String.Empty;
    if (this != null) {
      if (!String.IsNullOrEmpty(this.Quantity)) {
        if (
          this.QuantityUOM == null ||
          (this.QuantityUOM != null &&
            String.IsNullOrEmpty(this.QuantityUOM.DisplayText) &&
            String.IsNullOrEmpty(this.QuantityUOM.Value))
        ) {
          TechVal = 'QtyUom';
        }
      } else if (
        this.QuantityUOM != null &&
        !String.IsNullOrEmpty(this.QuantityUOM.DisplayText) &&
        !String.IsNullOrEmpty(this.QuantityUOM.Value)
      ) {
        TechVal = 'QtyVal';
      }
      if (!String.IsNullOrEmpty(this.TotalQuantity)) {
        if (
          this.TotalQuantityUOM == null ||
          (this.TotalQuantityUOM != null &&
            String.IsNullOrEmpty(this.TotalQuantityUOM.DisplayText) &&
            String.IsNullOrEmpty(this.TotalQuantityUOM.Value))
        ) {
          TechVal = 'TotQtyUom';
        }
      } else if (
        this.TotalQuantityUOM != null &&
        !String.IsNullOrEmpty(this.TotalQuantityUOM.DisplayText) &&
        !String.IsNullOrEmpty(this.TotalQuantityUOM.Value)
      ) {
        TechVal = 'QtyVal';
      }
    }
  }
  public get IsQuantityPerDoseMandatory(): boolean {
    return this._IsQuantityPerDoseMandatory;
  }
  public set IsQuantityPerDoseMandatory(value: boolean) {
    if (this._IsQuantityPerDoseMandatory != value) {
      this._IsQuantityPerDoseMandatory = value;
      //NotifyPropertyChanged("IsQuantityPerDoseMandatory");
    }
  }
  public get IsMandatoryTechValCASupplyInstr(): boolean {
    return this._IsMandatoryTechValCASupplyInstr;
  }
  public set IsMandatoryTechValCASupplyInstr(value: boolean) {
    if (value != this._IsMandatoryTechValCASupplyInstr) {
      this._IsMandatoryTechValCASupplyInstr = value;
    }
    //super.NotifyPropertyChanged("IsMandatoryTechValCASupplyInstr");
  }
  getprevioustechvalcaquantity: string = String.Empty;
  public get Quantity(): string {
    return this._quantity;
  }
  public set Quantity(value: string) {
    if (!Helper.ReferenceEquals(this._quantity, value)) {
      this.getprevioustechvalcaquantity = this._quantity;
      this._quantity = value;
      if (
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Outpatient,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Leave,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        if (
          !String.IsNullOrEmpty(this._quantity) &&
          Convert.ToDouble(this._quantity) != 0 &&
          !String.IsNullOrEmpty(this.TotalQuantity) &&
          Convert.ToDouble(this.TotalQuantity) == 0
        ) {
          this.TotalQuantity = '';
          this.IsMandatoryTechValCASupplyInstr = false;
        } else if (
          (!String.IsNullOrEmpty(this._quantity) &&
            Convert.ToDouble(this._quantity) == 0) ||
          (!String.IsNullOrEmpty(this.TotalQuantity) &&
            Convert.ToDouble(this.TotalQuantity) == 0)
        ) {
          if (this.IsenableTotQtyDose) this.TotalQuantity = '0';
          this.IsMandatoryTechValCASupplyInstr = true;
        } else {
          this.IsMandatoryTechValCASupplyInstr = false;
        }
        if (
          !String.IsNullOrEmpty(this.getprevioustechvalcaquantity) &&
          Convert.ToDouble(this.getprevioustechvalcaquantity) == 0 &&
          !String.IsNullOrEmpty(this._quantity) &&
          Convert.ToDouble(this._quantity) != 0 &&
          !String.IsNullOrEmpty(this.getprevioustechvalcatotquantity) &&
          Convert.ToDouble(this.getprevioustechvalcatotquantity) == 0 &&
          this.SupplyInsText != Resource.TechValProdOpt.SelectSupInstrution
        ) {
          this.launchTechvalCAsupplyinstrmezzanineCheck = true;
          let objTech: iMessageBox = new iMessageBox();
          objTech.Title = Resource.MedicationForm.MsgBoxTitleName;
          objTech.MessageButton = MessageBoxButton.YesNo;
          objTech.IconType = MessageBoxType.Question;
          objTech.MessageBoxClose = (s, e) => {
            this.objmsgtech_Close(s, e);
          };
          objTech.Message = Resource.MedicationForm.SupplyinstrModify_Message;
          objTech.Show();
        }
      }
      //NotifyPropertyChanged("Quantity");
    }
  }
  objmsgtech_Close(sender: Object, e: MessageEventArgs): void {
    this.launchTechvalCAsupplyinstrmezzanineCheck = false;
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.ShowMultiSelectListWindow(
        ValueDomain.SupplyInstruction,
        this.SupplyInsVal,
        this.SupplyInsText
      );
    }
    if (e.MessageBoxResult == MessageBoxResult.No) {
      this.launchTechvalCAsupplyinstrmezzanineCheck = false;
    }
  }
  public ShowMultiSelectListWindow(
    strValueDomain: string,
    SelectedConceptCodes: string,
    SelectedDisplayTextDetails: string
  ): void {
    let sTitle: string = String.Empty;
    if (!String.IsNullOrEmpty(strValueDomain)) {
      if (this.oitems != null) {
        if (this.oitems.FormViewerDetails.TechValidateDetails == null) {
          this.oitems.FormViewerDetails.TechValidateDetails =
            new TechValidateVM();
          this.oitems.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
            true;
        } else {
        }
        if (
          this.oitems.FormViewerDetails != null &&
          this.oitems.FormViewerDetails.BasicDetails != null
        ) {
          this.oitems.FormViewerDetails.BasicDetails.DisplayFlag = true;
        }
        this.oitems.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions =
          true;
        //Not Required for LHS. To be Re-Visited.
        let oSupInst: medsupplydispensinginstructionstab = new medsupplydispensinginstructionstab();
        oSupInst.PrescriptionItemVM = this.oitems;
        this.oitems.canLuanchProdOpt = true;
        AppActivity.OpenWindow(Resource.TechValidate.Supply_Title, oSupInst, (s,e) => {this.supplydispensinginstruction_Close(s);}, Resource.TechValidate.SupplyDisp_Update_Text, false, 750, 880, false, WindowButtonType.OkCancel, null);
      }
    }
  }
  supplydispensinginstruction_Close(args: AppDialogEventargs): void {
    this.oChildWindow = args.AppChildWindow;
    if (args.Result == AppDialogResult.Cancel) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: Resource.TechValidate.Titles,
        Message: disconcan1.Cancel_Error_Message,
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question,
      });
      iMsgBox.MessageBoxClose = (s, e) => {
        this.iMsgBox_MessageBoxClose_App(s, e);
      };
      iMsgBox.Show();
    } else if (args.Result == AppDialogResult.Ok) {
            let oContent = ObjectHelper.CreateType<medsupplydispensinginstructionstab>(args.Content.Component, medsupplydispensinginstructionstab);
            let oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM = null;
            if (oContent != null && oContent.tab1 != null && oContent.tab1.Items.Count > 0) {
                if (String.Compare(oContent.tab1.SelectedKey, Resource.TechValidate.SupDet) == 0) {
                    oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>(oContent.tab1.SelectedContent, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                }
                else {
                    oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>((ObjectHelper.CreateType<iTabItem>(oContent.tab1.Items[0], iTabItem)).Content, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                }
                if (oSupplyDispensingInstructionsVM != null && this.oitems != null) {
                    oSupplyDispensingInstructionsVM.SupplyHistoryList = null;
                    if (this.oitems != null && this.oitems.FormViewerDetails != null && this.oitems.FormViewerDetails.TechValidateDetails != null) {
                        this.oitems = this.SetSupplyDispensingInstructions(this.oitems, oSupplyDispensingInstructionsVM);
                        this.oitems.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
                    }
                    else {
                        this.oitems = this.SetSupplyDispensingInstructions(this.oitems, oSupplyDispensingInstructionsVM);
                        this.oitems.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
                    }
                    this.oChildWindow.DialogResult = true;
                }
            }
      this.launchTechvalCAsupplyinstrmezzanineCheck = false;
    }
  }
  SetSupplyDispensingInstructions(
    oSelectedItem: PrescriptionItemVM,
    oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM
  ): PrescriptionItemVM {
    if (oSupplyDispensingInstructionsVM != null && oSelectedItem != null) {
      let oSupplyInstrItems: ObservableCollection<CListItem> =
        oSupplyDispensingInstructionsVM.SupplyInstructionsList;
      let updateobject: CustomTechValidatedItem = new CustomTechValidatedItem();
      if (this.TechValidatedItems == null) {
        this.TechValidatedItems =
          new ObservableCollection<CustomTechValidatedItem>();
      }
      if (oSupplyInstrItems != null && oSupplyInstrItems.Count > 0) {
        oSelectedItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction =
          new ObservableCollection<CListItem>(
            oSupplyInstrItems
              .Where((c) => c.IsSelected)
              .Select((s) => s)
              .Distinct()
          );
        if (
          oSelectedItem.FormViewerDetails.TechValidateDetails
            .ProductSelectedsupplyInstruction != null &&
          oSelectedItem.FormViewerDetails.TechValidateDetails
            .ProductSelectedsupplyInstruction.Count > 0
        ) {
          let oSupplyInstTxt: string = String.Empty;
          let oSupplyInstVal: string = String.Empty;
          if (
            this.oitems != null &&
            this.oitems.FormViewerDetails != null &&
            this.oitems.FormViewerDetails.BasicDetails != null
          ) {
            this.oitems.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
              oSelectedItem.FormViewerDetails.TechValidateDetails
                .ProductSelectedsupplyInstruction,
              (o1) => {
                oSupplyInstTxt = o1;
              },
              (o2) => {
                oSupplyInstVal = o2;
              }
            );
            this.SupplyInsText = oSupplyInstTxt;
            this.SupplyInsVal = oSupplyInstVal;
            this.SupplyInsTextWithComments=oSupplyInstTxt;
            if (this.oitems.FormViewerDetails.TechValidateDetails != null) {
              this.oitems.FormViewerDetails.TechValidateDetails.supplyinstrtext =
                oSupplyInstTxt;
              this.oitems.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
                oSupplyInstVal;
            } else {
              this.oitems.FormViewerDetails.TechValidateDetails =
                new TechValidateVM();
              this.oitems.FormViewerDetails.TechValidateDetails.supplyinstrtext =
                oSupplyInstTxt;
              this.oitems.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
                oSupplyInstVal;
            }
          }
        } else {
          this.SupplyInsText = Resource.TechValProdOpt.SelectSupInstrution;
          this.SupplyInsVal = String.Empty;
        }
      } else {
        this.oitems.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
          String.Empty;
      }
      if (!String.IsNullOrEmpty(oSupplyDispensingInstructionsVM.Supplycomments)) {
        this.Supplycomments = String.Empty;
        this.Supplycomments = oSupplyDispensingInstructionsVM.Supplycomments;
        if (
          String.IsNullOrEmpty(
            oSupplyDispensingInstructionsVM.Supplycomments
          ) &&
          !String.IsNullOrEmpty(this.SupplyInsText)
        ) {
          this.SupplyInsTextWithComments = this.SupplyInsText;
        }
        if (
          this.oitems != null &&
          this.oitems.FormViewerDetails != null &&
          this.oitems.FormViewerDetails.TechValidateDetails != null
        ) {
          this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments =
            oSupplyDispensingInstructionsVM.Supplycomments;
        } else {
          this.oitems.FormViewerDetails.TechValidateDetails =
            new TechValidateVM();
          this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments =
            oSupplyDispensingInstructionsVM.Supplycomments;
        }
      } else this.SupplyInsText = Resource.TechValidate.SupplyDisp_Add_Text;
    }
    return oSelectedItem;
  }
  iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
    this.launchTechvalCAsupplyinstrmezzanineCheck = false;
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      let selectedsupply: ObservableCollection<CListItem> =
        new ObservableCollection<CListItem>();
      if (
        this.oitems != null &&
        this.oitems.FormViewerDetails != null &&
        this.oitems.FormViewerDetails.BasicDetails != null &&
        this.oitems.FormViewerDetails.TechValidateDetails != null
      ) {
        if (
          this.oitems.FormViewerDetails.TechValidateDetails
            .FetchfrombasicDetails == false &&
          this.oitems.FormViewerDetails.TechValidateDetails
            .IslaunchedFromProductOptions != false &&
          this.oitems.FormViewerDetails.BasicDetails.CustomTechValidatedItem !=
            null &&
          this.oitems.FormViewerDetails.BasicDetails.CustomTechValidatedItem
            .DrugItem != null
        ) {
          if (
            !String.IsNullOrEmpty(this.SupplyInsTextWithComments) &&
            !String.Equals(
              this.SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            if (
              this.oitems.FormViewerDetails.TechValidateDetails
                .IslaunchedFromProductOptions &&
              this.oitems.FormViewerDetails.TechValidateDetails
                .ProductSelectedsupplyInstruction != null &&
              this.oitems.FormViewerDetails.TechValidateDetails
                .ProductSelectedsupplyInstruction.Count > 0
            ) {
              selectedsupply =
                this.oitems.FormViewerDetails.TechValidateDetails
                  .ProductSelectedsupplyInstruction;
            } else if (
              this.oitems.FormViewerDetails.BasicDetails.CustomTechValidatedItem
                .selectedSupplyInstruction != null &&
              this.oitems.FormViewerDetails.BasicDetails.CustomTechValidatedItem
                .selectedSupplyInstruction.Count > 0
            ) {
              selectedsupply =
                this.oitems.FormViewerDetails.BasicDetails
                  .CustomTechValidatedItem.selectedSupplyInstruction;
            }
          }
          let oSupplyInstTxt: string = String.Empty;
          let oSupplyInstVal: string = String.Empty;
          this.oitems.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
            selectedsupply,
            (o1) => {
              oSupplyInstTxt = o1;
            },
            (o2) => {
              oSupplyInstVal = o2;
            }
          );
          this.SupplyInsText = oSupplyInstTxt;
          this.supplyInstrVal = oSupplyInstVal;
          if (
            !String.IsNullOrEmpty(this.SupplyInsTextWithComments) &&
            !String.Equals(
              this.SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            if (
              !String.IsNullOrEmpty(
                this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments
              )
            ) {
              this.Supplycomments =
                this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments;
            } else {
              this.Supplycomments =
                this.oitems.FormViewerDetails.BasicDetails.CustomTechValidatedItem.SupComments;
            }
          }
        }
        if (
          this.oitems.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction != null &&
          this.oitems.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
            .Count > 0 &&
          this.oitems.FormViewerDetails.TechValidateDetails
            .IslaunchedFromProductOptions != false &&
          this.oitems.FormViewerDetails.TechValidateDetails
            .FetchfrombasicDetails == true
        ) {
          selectedsupply = new ObservableCollection<CListItem>();
          if (
            !String.IsNullOrEmpty(this.SupplyInsTextWithComments) &&
            !String.Equals(
              this.SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            if (
              this.oitems.FormViewerDetails.TechValidateDetails
                .IslaunchedFromProductOptions &&
              this.oitems.FormViewerDetails.TechValidateDetails
                .ProductSelectedsupplyInstruction != null &&
              this.oitems.FormViewerDetails.TechValidateDetails
                .ProductSelectedsupplyInstruction.Count > 0
            ) {
              selectedsupply =
                this.oitems.FormViewerDetails.TechValidateDetails
                  .ProductSelectedsupplyInstruction;
            } else if (
              this.oitems.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction != null &&
              this.oitems.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction.Count > 0
            ) {
              selectedsupply =
                this.oitems.FormViewerDetails.BasicDetails
                  .SelectedsupplyInstruction;
            }
          }
          let oSupplyInstTxt: string = String.Empty;
          let oSupplyInstVal: string = String.Empty;
          this.oitems.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
            selectedsupply,
            (o1) => {
              oSupplyInstTxt = o1;
            },
            (o2) => {
              oSupplyInstVal = o2;
            }
          );
          this.SupplyInsText = oSupplyInstTxt;
          this.supplyInstrVal = oSupplyInstVal;
          if (
            !String.IsNullOrEmpty(this.SupplyInsTextWithComments) &&
            !String.Equals(
              this.SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            if (
              !String.IsNullOrEmpty(
                this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments
              )
            ) {
              this.Supplycomments =
                this.oitems.FormViewerDetails.TechValidateDetails.SupplyComments;
            } else {
              this.Supplycomments =
                this.oitems.FormViewerDetails.BasicDetails.Supplycomments;
            }
          }
        }
      }
      this.oChildWindow.DialogResult = true;
    }
    Busyindicator.SetStatusIdle('AddSupplyInstructionClicked');
  }
  getprevioustechvalcatotquantity: string = String.Empty;
  public get TotalQuantity(): string {
    return this._totalQuantity;
  }
  public set TotalQuantity(value: string) {
    if (!Helper.ReferenceEquals(this._totalQuantity, value)) {
      this.getprevioustechvalcatotquantity = this._totalQuantity;
      this._totalQuantity = value;
      if (
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Outpatient,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Leave,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        if (
          !String.IsNullOrEmpty(this._totalQuantity) &&
          Convert.ToDouble(this._totalQuantity) != 0 &&
          !String.IsNullOrEmpty(this.Quantity) &&
          Convert.ToDouble(this.Quantity) == 0
        ) {
          this.Quantity = '';
          this.IsMandatoryTechValCASupplyInstr = false;
        } else if (
          (!String.IsNullOrEmpty(this._totalQuantity) &&
            Convert.ToDouble(this._totalQuantity) == 0) ||
          (!String.IsNullOrEmpty(this.Quantity) &&
            Convert.ToDouble(this.Quantity) == 0)
        ) {
          this.Quantity = '0';
          this.IsMandatoryTechValCASupplyInstr = true;
        } else {
          this.IsMandatoryTechValCASupplyInstr = false;
        }
        if (
          !String.IsNullOrEmpty(this.getprevioustechvalcaquantity) &&
          Convert.ToDouble(this.getprevioustechvalcaquantity) == 0 &&
          !String.IsNullOrEmpty(this._totalQuantity) &&
          Convert.ToDouble(this._totalQuantity) != 0 &&
          !String.IsNullOrEmpty(this.getprevioustechvalcatotquantity) &&
          Convert.ToDouble(this.getprevioustechvalcatotquantity) == 0 &&
          this.SupplyInsText != Resource.TechValProdOpt.SelectSupInstrution
        ) {
          this.launchTechvalCAsupplyinstrmezzanineCheck = true;
          let objTech: iMessageBox = new iMessageBox();
          objTech.Title = Resource.MedicationForm.MsgBoxTitleName;
          objTech.MessageButton = MessageBoxButton.YesNo;
          objTech.IconType = MessageBoxType.Question;
          objTech.MessageBoxClose = (s, e) => {
            this.objmsgtech_Close(s, e);
          };
          objTech.Message = Resource.MedicationForm.SupplyinstrModify_Message;
          objTech.Show();
        }
      }
      //NotifyPropertyChanged("TotalQuantity");
    }
  }
  private _TechQntyPerDosVisible: Visibility = Visibility.Collapsed;
  public get TechQntyPerDosVisible(): Visibility {
    return this._TechQntyPerDosVisible;
  }
  public set TechQntyPerDosVisible(value: Visibility) {
    if (value != this._TechQntyPerDosVisible) {
      this._TechQntyPerDosVisible = value;
      //NotifyPropertyChanged("TechQntyPerDosVisible");
    }
  }
  public get QuantityUOM(): CListItem {
    return this._quantityUOM;
  }
  public set QuantityUOM(value: CListItem) {
    if (!Helper.ReferenceEquals(this._quantityUOM, value)) {
      this._quantityUOM = value;
      //NotifyPropertyChanged("QuantityUOM");
    }
  }
  public get TotalQuantityUOM(): CListItem {
    return this._totalquantityUOM;
  }
  public set TotalQuantityUOM(value: CListItem) {
    if (!Helper.ReferenceEquals(this._totalquantityUOM, value)) {
      this._totalquantityUOM = value;
      //NotifyPropertyChanged("TotalQuantityUOM");
    }
  }
  public SetSelectedSupplyValues(
    oSelectedValues: List,
    sValueDomainCode: string
  ): void {
    let strBuildText: StringBuilder = new StringBuilder();
    let strBuildValue: StringBuilder = new StringBuilder();
    if (oSelectedValues != null && oSelectedValues.Count > 0) {
      let nLen: number = oSelectedValues.Count;
      for (let i: number = 0; i < nLen; i++) {
        let oListItems: CListItem = ObjectHelper.CreateType<CListItem>(
          oSelectedValues[i],
          CListItem
        );
        strBuildText.Append(oListItems.DisplayText);
        strBuildValue.Append(oListItems.Value);
        if (i < nLen - 1) {
          strBuildText.Append(';');
          strBuildValue.Append(';');
        }
      }
    }
    if (
      String.Compare(
        sValueDomainCode,
        ValueDomain.SupplyInstruction,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      if (!String.IsNullOrEmpty(strBuildText.ToString())) {
        this.SupplyInsText = strBuildText.ToString();
      } else {
        this.SupplyInsText = Resource.TechValProdOpt.SelectSupInstrution;
      }
      this.SupplyInsVal = strBuildValue.ToString();
    }
  }
  public PopulateSpecificUOMs(objDrug: ManagePrescSer.TechValidatedItem): void {
    if (objDrug != null) {
      if (
        objDrug.QuantityPerDoseUOM != null &&
        !String.IsNullOrEmpty(objDrug.QuantityPerDoseUOM.Name)
      ) {
        this.QuantityUOM = new CListItem();
        if (this.QuantityUOMList != null) {
          let oQtyUOM = this.QuantityUOMList.Where(
            (oitem) => oitem.Value == objDrug.QuantityPerDoseUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oQtyUOM != null && oQtyUOM.Count() > 0) {
            this.QuantityUOM = oQtyUOM.FirstOrDefault();
          } else {
            this.QuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objDrug.QuantityPerDoseUOM.Name,
              Value: objDrug.QuantityPerDoseUOM.OID.ToString(),
            });
            this.QuantityUOMList = new ObservableCollection<CListItem>();
            this.QuantityUOMList.Add(this.QuantityUOM);
          }
        } else {
          this.QuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: objDrug.QuantityPerDoseUOM.Name,
            Value: objDrug.QuantityPerDoseUOM.OID.ToString(),
          });
          this.QuantityUOMList = new ObservableCollection<CListItem>();
          this.QuantityUOMList.Add(this.QuantityUOM);
        }
      }
      if (
        objDrug.TotalQuantityUOM != null &&
        !String.IsNullOrEmpty(objDrug.TotalQuantityUOM.Name)
      ) {
        this.TotalQuantityUOM = new CListItem();
        if (this.TotalQuantityUOMList != null) {
          let oTotQtyUOM = this.TotalQuantityUOMList.Where(
            (oitem) => oitem.Value == objDrug.TotalQuantityUOM.OID.ToString()
          ).Select((oitem) => oitem);

          if (oTotQtyUOM != null && oTotQtyUOM.Count() > 0) {
            this.TotalQuantityUOM = oTotQtyUOM.FirstOrDefault();
          } else {
            this.TotalQuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: objDrug.TotalQuantityUOM.Name,
              Value: objDrug.TotalQuantityUOM.OID.ToString(),
            });
            this.TotalQuantityUOMList = new ObservableCollection<CListItem>();
            this.TotalQuantityUOMList.Add(this.TotalQuantityUOM);
          }
        } else {
          this.TotalQuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: objDrug.TotalQuantityUOM.Name,
            Value: objDrug.TotalQuantityUOM.OID.ToString(),
          });
          this.TotalQuantityUOMList = new ObservableCollection<CListItem>();
          this.TotalQuantityUOMList.Add(this.TotalQuantityUOM);
        }
      }
    }
  }
  public SetTechCADetails(
    oNewItem: CustomTechValidatedItem,
    Action: string
  ): void {
    if (this != null) {
      if (!String.IsNullOrEmpty(this.Quantity))
        oNewItem.DoseComQuantityPerDoseUom = oNewItem.QuantityPerDose =
          this.Quantity.ToString();
      else oNewItem.DoseComQuantityPerDoseUom = oNewItem.QuantityPerDose;
      if (oNewItem.QuantityPerDoseUOM == null)
        oNewItem.QuantityPerDoseUOM = new ManagePrescSer.ObjectInfo();
      if (this.QuantityUOM != null) {
        if (!String.IsNullOrEmpty(this.QuantityUOM.Value))
          oNewItem.QuantityPerDoseUOM.OID = Convert.ToInt64(
            this.QuantityUOM.Value
          );
        if (!String.IsNullOrEmpty(this.QuantityUOM.DisplayText)) {
          oNewItem.QuantityPerDoseUOM.Name = this.QuantityUOM.DisplayText;
        }
      }
      if (
        oNewItem.QuantityPerDoseUOM != null &&
        !String.IsNullOrEmpty(oNewItem.QuantityPerDoseUOM.Name)
      ) {
        oNewItem.DoseComQuantityPerDoseUom =
          oNewItem.DoseComQuantityPerDoseUom +
          ' ' +
          oNewItem.QuantityPerDoseUOM.Name;
      }
      if (!String.IsNullOrEmpty(this.TotalQuantity))
        oNewItem.DoseComTotalPerQuantityUom = oNewItem.TotalQuantity =
          this.TotalQuantity.ToString();
      else oNewItem.DoseComTotalPerQuantityUom = oNewItem.TotalQuantity;
      if (oNewItem.TotalQuantityUOM == null)
        oNewItem.TotalQuantityUOM = new ManagePrescSer.ObjectInfo();
      if (this.TotalQuantityUOM != null) {
        if (!String.IsNullOrEmpty(this.TotalQuantityUOM.Value))
          oNewItem.TotalQuantityUOM.OID = Convert.ToInt64(
            this.TotalQuantityUOM.Value
          );
        if (!String.IsNullOrEmpty(this.TotalQuantityUOM.DisplayText)) {
          oNewItem.TotalQuantityUOM.Name = this.TotalQuantityUOM.DisplayText;
        }
      }
      if (
        oNewItem.TotalQuantityUOM != null &&
        !String.IsNullOrEmpty(oNewItem.TotalQuantityUOM.Name)
      ) {
        oNewItem.DoseComTotalPerQuantityUom =
          oNewItem.DoseComTotalPerQuantityUom +
          ' ' +
          oNewItem.TotalQuantityUOM.Name;
      }
      if (
        !String.Equals(
          Action,
          'LOAD',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (
          !String.IsNullOrEmpty(this.SupplyInsText) &&
          String.Compare(
            this.SupplyInsText,
            Resource.TechValProdOpt.SelectSupInstrution,
            StringComparison.OrdinalIgnoreCase
          ) != 0
        ) {
          oNewItem.SupplyInstructionText = this.SupplyInsText;
        } else {
          oNewItem.SupplyInstructionText = String.Empty;
        }
        if (
          !String.IsNullOrEmpty(this.SupplyInsTextWithComments) &&
          String.Compare(
            this.SupplyInsTextWithComments,
            Resource.TechValProdOpt.SelectSupInstrution,
            StringComparison.OrdinalIgnoreCase
          ) != 0
        ) {
          oNewItem.ProdSupplyInsWithComments = this.SupplyInsTextWithComments;
          oNewItem.SupComments = this.Supplycomments;
        } else {
          oNewItem.ProdSupplyInsWithComments = String.Empty;
          oNewItem.SupComments = String.Empty;
        }
        oNewItem.SupplyInstruction =
          new ObservableCollection<ManagePrescSer.ObjectInfo>();
        oNewItem.selectedSupplyInstruction =
          new ObservableCollection<CListItem>();
        if (!String.IsNullOrEmpty(this.SupplyInsVal)) {
          let SupInstCode: string = this.SupplyInsVal;
          let SupInstText: string = this.SupplyInsText;
          if (this.SupplyInsVal.IndexOf('~') > 0) {
            SupInstCode = this.SupplyInsVal.Split(
              '~~',
              StringSplitOptions.RemoveEmptyEntries
            ).FirstOrDefault();
          }
          let arrSupInstCode: string[] = SupInstCode.Split(';');
          let arrSupInstText: string[] = SupInstText.Split(';');
          if (arrSupInstCode instanceof Array && arrSupInstCode.length > 0) {
            for (let i: number = 0; i < arrSupInstCode.length; i++) {
              oNewItem.SupplyInstruction.Add(
                ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                  Code: arrSupInstCode[i],
                  Name: arrSupInstText[i],
                })
              );
              oNewItem.selectedSupplyInstruction.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: arrSupInstText[i],
                  Value: arrSupInstCode[i],
                })
              );
            }
          }
        }
      }
    }
  }
  private GetProductOptions(): void {
    Busyindicator.SetStatusBusy('TechValidate_Productoptions');
    let BasicDetails: BasicDetailsVM = null;
    if (
      this.oitems != null &&
      this.oitems.FormViewerDetails != null &&
      this.oitems.FormViewerDetails.BasicDetails != null
    ) {
      BasicDetails = this.oitems.FormViewerDetails.BasicDetails;
    }
    let IsFluidDrug: boolean =
      BasicDetails != null &&
      BasicDetails.InfusionDetails != null &&
      BasicDetails.InfusionDetails.FluidPrescribableItemListOID > 0;
    if (
      BasicDetails != null &&
      BasicDetails.IdentifyingOID > 0 &&
      (!String.IsNullOrEmpty(BasicDetails.IdentifyingType) || IsFluidDrug)
    ) {
      let objReqProcess: IPPManagePrescSer.CReqMsgGetRelatedOptions =
        new IPPManagePrescSer.CReqMsgGetRelatedOptions();
      objReqProcess.oDrugItemInputDataBC =
        new IPPManagePrescSer.IPPDrugItemInputData();
      let lnRouteOID: number = 0;
      let lnDosageFormOID: number = 0;
      if (this.oitems != null) {
        objReqProcess.oDrugItemInputDataBC.IdentifyingOID =
          BasicDetails.IdentifyingOID;
        objReqProcess.oDrugItemInputDataBC.IdentifyingType =
          BasicDetails.IdentifyingType;
        if (BasicDetails.Route != null)
          Number.TryParse(BasicDetails.Route.Value, (o) => (lnRouteOID = o));
        if (BasicDetails.DosageForm != null)
          Number.TryParse(
            BasicDetails.DosageForm.Value,
            (o) => (lnDosageFormOID = o)
          );
      }
      if (
        String.Equals(
          this.sAllProdCheckedValue,
          '1',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        lnRouteOID = 0;
        lnDosageFormOID = 0;
        objReqProcess.oDrugItemInputDataBC.RouteOIDs = String.Empty;
      } else {
        if (this.oitems != null) {
          objReqProcess.oDrugItemInputDataBC.RouteOIDs =
            BasicDetails.Route != null
              ? BasicDetails.Route.Value
              : String.Empty;
        }
      }
      objReqProcess.oDrugItemInputDataBC.RouteOID = lnRouteOID;
      objReqProcess.oDrugItemInputDataBC.FormOID = lnDosageFormOID;
      objReqProcess.oDrugItemInputDataBC.IsTechValidateCA = '1';
      if (this.oitems != null) {
        objReqProcess.oDrugItemInputDataBC.IsFormulary =
          this.oitems.IsNonformulary == '1' ? true : false;
      }
      objReqProcess.oDrugItemInputDataBC.MatchIdentifyingTypes =
        new IPPManagePrescSer.ArrayOfString();
      objReqProcess.oDrugItemInputDataBC.MatchIdentifyingTypes.Add(
        'VIRTUALPRODUCT'
      );
      if (!String.IsNullOrEmpty(BasicDetails.MCVersion)) {
        objReqProcess.oDrugItemInputDataBC.MCVersionNo = BasicDetails.MCVersion;
      } else {
        objReqProcess.oDrugItemInputDataBC.MCVersionNo = AppSessionInfo.AMCV;
      }
      if (
        BasicDetails.oPrescitemVM != null &&
        BasicDetails.oPrescitemVM.PrescriptionItemOID > 0
      ) {
        objReqProcess.oDrugItemInputDataBC.PrescriptionItemId =
          BasicDetails.oPrescitemVM.PrescriptionItemOID.ToString();
      }
      objReqProcess.oDrugItemInputDataBC.PatientOID = PatientContext.PatientOID;
      if (
        BasicDetails.oPrescitemVM != null &&
        BasicDetails.oPrescitemVM.PresTechValidatedItemsChild != null &&
        BasicDetails.oPrescitemVM.PresTechValidatedItemsChild.Count > 0
      ) {
        let sb: StringBuilder = new StringBuilder();
        BasicDetails.oPrescitemVM.PresTechValidatedItemsChild.forEach(
          (childItem) => {
            if (
              childItem.FormViewerDetails != null &&
              childItem.FormViewerDetails.BasicDetails != null
            ) {
              sb.Append(
                childItem.FormViewerDetails.BasicDetails.IdentifyingOID.ToString()
              );
              sb.Append('-');
              sb.Append(
                childItem.FormViewerDetails.BasicDetails.IdentifyingType
              );
              sb.Append(',');
            }
          }
        );
        if (sb != null && sb.ToString().EndsWith(',')) {
          objReqProcess.oDrugItemInputDataBC.ComponentOidandType = sb
            .ToString()
            .Remove(sb.Length - 1);
        }
      }
      objReqProcess.oDrugItemInputDataBC.ServiceOID = MedChartData.ServiceOID;
      objReqProcess.oDrugItemInputDataBC.LocationOID = MedChartData.LocationOID;
      objReqProcess.oDrugItemInputDataBC.EncounterOID =
        PatientContext.EncounterOid;
      objReqProcess.oContextInformation = Common.FillContext();
      let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      objService.GetRelatedOptionsCompleted = (s, e) => {
        this.objService_GetProductOptionsCompleted(s, e);
      };
      objService.GetRelatedOptionsAsync(objReqProcess);
    }else{
      Busyindicator.SetStatusIdle('TechValidate_Productoptions');
      Busyindicator.SetStatusIdle('FormViewer');
    }
  }
  objService_GetProductOptionsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetRelatedOptionsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000064;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:medTechvalProdOptVM, Method:objService_GetProductOptionsCompleted()';
    if (e.Error == null) {
      try {
        let objResProcess: IPPManagePrescSer.CResMsgGetRelatedOptions =
          e.Result;
        this.oProductOption = null;
        if (objResProcess != null && objResProcess.oRelatedDrugs != null) {
          let BasicDetails: BasicDetailsVM = null;
          if (
            this.oitems != null &&
            this.oitems.FormViewerDetails != null &&
            this.oitems.FormViewerDetails.BasicDetails != null
          )
            BasicDetails = this.oitems.FormViewerDetails.BasicDetails;
          let oDrugItemInfo: ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo> =
            new ObservableCollection<IPPManagePrescSer.DrugItemBasicInfo>();
          let lIdentifyingOid: number = 0;
          let sIdentifyingType: string;
          let sIdentifyingName: string;
          let sMciItem: string = String.Empty;
          let cMcicount: number = 0;
          if (!this.IsMciChildSelected) {
            lIdentifyingOid =
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingOID;
            sIdentifyingType =
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingType;
            if (
              !String.IsNullOrEmpty(
                this.oitems.FormViewerDetails.BasicDetails
                  .MCIchildIdentifyingName
              )
            )
              sIdentifyingName =
                this.oitems.FormViewerDetails.BasicDetails
                  .MCIchildIdentifyingName;
            else if (
              this.oitems.FormViewerDetails.BasicDetails != null &&
              this.oitems.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
              this.oitems.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidSelectvalue != null &&
              this.oitems.FluidPrescribableItemListOID > 0
            ) {
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingName =
                this.oitems.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue.ToString();
            }
            sIdentifyingName =
              this.oitems.FormViewerDetails.BasicDetails.IdentifyingName;
          } else {
            lIdentifyingOid = BasicDetails.IdentifyingOID;
            sIdentifyingType = BasicDetails.IdentifyingType;
            sIdentifyingName = this.PrescriptionItemName;
            sMciItem = BasicDetails.mCIItemDisplay;
            if (
              !String.IsNullOrEmpty(BasicDetails.itemSubType) &&
              String.Compare(
                BasicDetails.itemSubType,
                'CC_MULCMPNTITM',
                StringComparison.InvariantCultureIgnoreCase
              ) == 0 &&
              !String.IsNullOrEmpty(sMciItem)
            ) {
              cMcicount = sMciItem.Split('^').length - 1;
              if (cMcicount < 5) {
                sIdentifyingName = sMciItem.Replace('^', '\n');
              }
            }
          }
          if (
            !String.IsNullOrEmpty(sIdentifyingType) &&
            (String.Compare(
              sIdentifyingType,
              'CATALOGUEITEM',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 ||
              sIdentifyingType.Equals(
                CConstants.ACTUALMOIETY,
                StringComparison.InvariantCultureIgnoreCase
              )) &&
            cMcicount == 0
          ) {
            objResProcess.oRelatedDrugs.forEach((oInfo) => {
              oInfo.PrescribableItemListOID = lIdentifyingOid;
              if (
                this.oitems != null &&
                this.oitems.FormViewerDetails != null &&
                this.oitems.FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  this.oitems.FormViewerDetails.BasicDetails.itemSubType
                ) &&
                String.Equals(
                  this.oitems.FormViewerDetails.BasicDetails.itemSubType,
                  CConstants.SUBTYPE,
                  StringComparison.OrdinalIgnoreCase
                )
              ) {
                oInfo.IdentifyingName =
                  this.oitems.FormViewerDetails.BasicDetails.IdentifyingName;
              }
            });
            this.oProductOption = objResProcess.oRelatedDrugs;
          } else {
            objResProcess.oRelatedDrugs.forEach((oInfo) => {
              if (
                this.oitems != null &&
                !String.IsNullOrEmpty(BasicDetails.itemSubType) &&
                String.Equals(
                  BasicDetails.itemSubType,
                  'CC_MULCMPNTITM',
                  StringComparison.CurrentCultureIgnoreCase
                )
              ) {
                if (
                  (!this.IsMciChildSelected &&
                    this.oitems.IsNonformulary == '1' &&
                    String.Equals(
                      objResProcess.oRelatedDrugs[0].IsFormulary,
                      '1',
                      StringComparison.CurrentCultureIgnoreCase
                    )) ||
                  (this.oitems.IsNonformulary == '0' &&
                    String.Equals(
                      objResProcess.oRelatedDrugs[0].IsFormulary,
                      '0',
                      StringComparison.CurrentCultureIgnoreCase
                    )) ||
                  cMcicount > 0
                ) {
                  oDrugItemInfo.Add(
                    ObjectHelper.CreateObject(
                      new IPPManagePrescSer.DrugItemBasicInfo(),
                      {
                        IdentifyingOID: lIdentifyingOid,
                        IdentifyingType: sIdentifyingType,
                        IdentifyingName: sIdentifyingName,
                        TechQtyUomName: oInfo.TechQtyUomName,
                      }
                    )
                  );
                } else if (
                  this.oitems.IsNonformulary == '0' &&
                  String.Equals(
                    objResProcess.oRelatedDrugs[0].IsFormulary,
                    '0',
                    StringComparison.CurrentCultureIgnoreCase
                  )
                ) {
                  oDrugItemInfo.Add(
                    ObjectHelper.CreateObject(
                      new IPPManagePrescSer.DrugItemBasicInfo(),
                      {
                        IdentifyingOID: lIdentifyingOid,
                        IdentifyingType: sIdentifyingType,
                        IdentifyingName: sIdentifyingName,
                        TechQtyUomName: oInfo.TechQtyUomName,
                      }
                    )
                  );
                }
              } else {
                oDrugItemInfo.Add(
                  ObjectHelper.CreateObject(
                    new IPPManagePrescSer.DrugItemBasicInfo(),
                    {
                      IdentifyingOID: lIdentifyingOid,
                      IdentifyingType: sIdentifyingType,
                      IdentifyingName: sIdentifyingName,
                      TechQtyUomName: oInfo.TechQtyUomName,
                      IsWardStock: oInfo.IsWardStock,
                    }
                  )
                );
              }
              if (this.oitems != null) {
                if (
                  this.oitems.IsNonformulary == '1' &&
                  String.Equals(
                    objResProcess.oRelatedDrugs[0].IsFormulary,
                    '0',
                    StringComparison.CurrentCultureIgnoreCase
                  )
                )
                  this.oitems.TechValformularycheck = false;
                else if (
                  !String.IsNullOrEmpty(BasicDetails.itemSubType) &&
                  String.Equals(
                    BasicDetails.itemSubType,
                    'CC_MULCMPNTITM',
                    StringComparison.CurrentCultureIgnoreCase
                  )
                )
                  this.oitems.TechValformularycheck = false;
              }
            });
            if (
              this.oitems != null &&
              !String.Equals(
                this.oitems.LorenzoID,
                'PI-001',
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              this.oProductOption = oDrugItemInfo;
            }
          }
        } else if (
          this.oProductOption == null ||
          (this.oProductOption != null && this.oProductOption.Count == 0)
        ) {
          this.IsenableAdd = false;
        }
      } catch (ex: any) {
        let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    Busyindicator.SetStatusIdle('TechValidate_Productoptions');
    Busyindicator.SetStatusIdle('FormViewer');
  }
  public GetStringValue(
    ObjectInfoCollection: ObservableCollection<ManagePrescSer.ObjectInfo>,
    sValueDomainCode: string,
    out1: (DisplayText: string) => void,
    out2: (Value: string) => void
  ): void {
    let DisplayText: string;
    let Value: string;
    let strBuildText: StringBuilder = new StringBuilder();
    let strBuildValue: StringBuilder = new StringBuilder();
    if (ObjectInfoCollection != null && ObjectInfoCollection.Count > 0) {
      let nLen: number = ObjectInfoCollection.Count;
      let resultValue: string = String.Empty;
      for (let i: number = 0; i < nLen; i++) {
        let oListItems: ManagePrescSer.ObjectInfo =
          ObjectHelper.CreateType<ManagePrescSer.ObjectInfo>(
            ObjectInfoCollection[i],
            ManagePrescSer.ObjectInfo
          );
        if (
          String.Compare(sValueDomainCode, ValueDomain.SupplyInstruction) == 0
        )
          resultValue = Common.GetText(
            oListItems.Code,
            FormviewerComboValues.SupplyInstructions
          );
        strBuildText.Append(resultValue);
        strBuildValue.Append(oListItems.Code);
        if (i < nLen - 1) {
          strBuildText.Append(';');
          strBuildValue.Append(';');
        }
      }
    }
    DisplayText = strBuildText.ToString();
    Value = strBuildValue.ToString();
    out1(DisplayText);
    out2(Value);
  }
  private DisposeVMEvents(): void {
    this.oProductOption = null;
  }
  public DoCleanUP(): void {
    this.DisposeVMEvents();
  }
  public DeleteItmDoseCombinations(
    deletedItems: List<ManagePrescSer.TechValidatedItem>
  ): void {
    if (this.oitems != null && deletedItems.Count > 0) {
      let currentItem: CustomTechValidatedItem = null;
      deletedItems.forEach((DelItem) => {
        currentItem = this.TechValidatedItems.Where(
          (s) =>
            s.DrugItem.IdentifyingOID == DelItem.DrugItem.IdentifyingOID &&
            s.DrugItem.IdentifyingType == DelItem.DrugItem.IdentifyingType
        ).FirstOrDefault();
        if (currentItem != null) {
          this.TechValidatedItems.Remove(currentItem);
        }
      });
    }
  }
}
