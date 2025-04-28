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
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
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
import { ObjectHelper } from 'epma-platform/helper';
import { Component, OnInit } from '@angular/core';
import { GPcStatus } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

export class GPConnectItemVM extends ViewModelBase {
  Content?: any;
  private _GPConnectID?: string;
  public get GPConnectID(): string {
    return this._GPConnectID;
  }
  public set GPConnectID(value: string) {
    if (this._GPConnectID != value) {
      this._GPConnectID = value;
      //NotifyPropertyChanged("GPConnectID");
    }
  }
  private _MedicationItemDetail?: string;
  public get MedicationItemDetail(): string {
    return this._MedicationItemDetail;
  }
  public set MedicationItemDetail(value: string) {
    if (this._MedicationItemDetail != value) {
      this._MedicationItemDetail = value;
      //NotifyPropertyChanged("MedicationItemDetail");
    }
  }
  private _ItemTypeDisplay?: string;
  public get ItemTypeDisplay(): string {
    return this._ItemTypeDisplay;
  }
  public set ItemTypeDisplay(value: string) {
    if (this._ItemTypeDisplay != value) {
      this._ItemTypeDisplay = value;
      //NotifyPropertyChanged("ItemTypeDisplay");
    }
  }
  private _ItemTypeCode?: string;
  public get ItemTypeCode(): string {
    return this._ItemTypeCode;
  }
  public set ItemTypeCode(value: string) {
    if (this._ItemTypeCode != value) {
      this._ItemTypeCode = value;
      //NotifyPropertyChanged("ItemTypeCode");
    }
  }
  private _GroupName?: string;
  public get GroupName(): string {
    return this._GroupName;
  }
  public set GroupName(value: string) {
    if (this._GroupName != value) {
      this._GroupName = value;
      //NotifyPropertyChanged("GroupName");
    }
  }
  public IsGroupheader: boolean = false;
  private _LastIssued?: DateTime = DateTime.MinValue;
  public get LastIssued(): DateTime {
    return this._LastIssued;
  }
  public set LastIssued(value: DateTime) {
    if (this._LastIssued != value) {
      this._LastIssued = value;
      //NotifyPropertyChanged("LastIssued");
      //NotifyPropertyChanged("LastIssuedText");
    }
  }
  public get LastIssuedText(): string {
    if (this._LastIssued == DateTime.MinValue) return String.Empty;
    else return this._LastIssued.ToString('dd-MMM-yyyy');
  }
  private _IsClerked?: boolean =  false;
  public get IsClerked(): boolean {
    return this._IsClerked;
  }
  public set IsClerked(value: boolean) {
    if (this._IsClerked != value) {
      this._IsClerked = value;
      //NotifyPropertyChanged("IsClerked");
      //NotifyPropertyChanged("ReorderToolTip");
    }
  }
  private _Dosage?: GPConnectAdminDosage[];
  public get Dosage(): GPConnectAdminDosage[] {
    return this._Dosage;
  }
  public set Dosage(value: GPConnectAdminDosage[]) {
    if (this._Dosage != value) {
      this._Dosage = value;
      //NotifyPropertyChanged("Dosage");
    }
  }
  private _IsConverted?: boolean = false;
  public get IsConverted(): boolean {
    return this._IsConverted;
  }
  public set IsConverted(value: boolean) {
    this._IsConverted = value;
    //NotifyPropertyChanged("IsConverted");
  }
  private _medicationCode?: string;
  public get MedicationCode(): string {
    return this._medicationCode;
  }
  public set MedicationCode(value: string) {
    if (this._medicationCode != value) {
      this._medicationCode = value;
      //NotifyPropertyChanged("MedicationCode");
    }
  }
  public get ReorderToolTip(): string {
    return this._IsClerked ? 'Copied item' : 'Select to copy across';
  }
  private _GPCProductFormOID?: number = 0;
  public get GPCProductFormOID(): number {
    return this._GPCProductFormOID;
  }
  public set GPCProductFormOID(value: number) {
    this._GPCProductFormOID = value;
  }
  private _identifierSystem?: string;
  public get IdentifierSystem(): string {
    return this._identifierSystem;
  }
  public set IdentifierSystem(value: string) {
    if (this._statusDisplay != value) {
      this._identifierSystem = value;
      //NotifyPropertyChanged("IdentifierSystem");
    }
  }
  private _allIdentifiers?: GpConnectIdentifier[];
  public get AllIdentifiers(): GpConnectIdentifier[] {
    return this._allIdentifiers;
  }
  public set AllIdentifiers(value: GpConnectIdentifier[]) {
    if (this._allIdentifiers != value) {
      this._allIdentifiers = value;
      //NotifyPropertyChanged("AllIdentifiers");
    }
  }
  private _statusDisplay?: string;
  public get StatusDisplay(): string {
    return this._statusDisplay;
  }
  public set StatusDisplay(value: string) {
    if (this._statusDisplay != value) {
      this._statusDisplay = value;
      //NotifyPropertyChanged("StatusDisplay");
    }
  }
  private _quantity?: string;
  public get Quantity(): string {
    return this._quantity;
  }
  public set Quantity(value: string) {
    if (this._quantity != value) {
      this._quantity = value;
      //NotifyPropertyChanged("Quantity");
    }
  }
  public get CanHideStatus(): boolean {
    return (
      !String.IsNullOrEmpty(this.ItemTypeCode) &&
      this.ItemTypeCode.StartsWith(
        'acute',
        StringComparison.OrdinalIgnoreCase
      ) &&
      !String.IsNullOrEmpty(this.StatusDisplay) &&
      this.StatusDisplay.Equals(
        GPcStatus.Completed,
        StringComparison.OrdinalIgnoreCase
      )
    );
  }
  public ToCopy?(): GPConnectItemVM {
    return ObjectHelper.CreateObject(new GPConnectItemVM(), {
      GPConnectID: this.GPConnectID,
      IsClerked: this.IsClerked,
      MedicationItemDetail: this.MedicationItemDetail,
      LastIssued: this.LastIssued,
      ItemTypeCode: this.ItemTypeCode,
      ItemTypeDisplay: this.ItemTypeDisplay,
      MedicationCode: this.MedicationCode,
      StatusDisplay: this.StatusDisplay,
      Quantity: this.Quantity,
      Dosage:
        this.Dosage == null
          ? null
          : this.Dosage.map((x) =>
              ObjectHelper.CreateObject(new GPConnectAdminDosage(), {
                Text:
                  x == null || String.IsNullOrEmpty(x.Text)
                    ? String.Empty
                    : x.Text,
                Instruction:
                  x == null || String.IsNullOrEmpty(x.Instruction)
                    ? String.Empty
                    : x.Instruction,
              })
            ),
      AllIdentifiers:
        this.AllIdentifiers == null
          ? null
          : this.AllIdentifiers.map((x) =>
              ObjectHelper.CreateObject(new GpConnectIdentifier(), {
                IdentifierSystem:
                  x == null || String.IsNullOrEmpty(x.IdentifierSystem)
                    ? String.Empty
                    : x.IdentifierSystem,
                IdentifierValue:
                  x == null || String.IsNullOrEmpty(x.IdentifierValue)
                    ? String.Empty
                    : x.IdentifierValue,
              })
            ),
    });
  }
}
export class GPConnectAdminDosage {
  public Text: string;
  public Instruction: string;
}
export class GpConnectIdentifier {
  public IdentifierSystem: string;
  public IdentifierValue: string;
}
