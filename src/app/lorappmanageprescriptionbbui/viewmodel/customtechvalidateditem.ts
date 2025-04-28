import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, CListItem ,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs,WindowButtonType} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper } from 'epma-platform/helper';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'

    export class CustomTechValidatedItem extends ManagePrescSer.TechValidatedItem {
        private SupplyInstructionTextField: string;
        private DispensingInstructionTextField: string;
        public selectedSupplyInstruction: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public ProdSupplyInsWithComments: string;
        public prevsuppcomments: string;
        public prevselectedSupplyInstruction: ObservableCollection<CListItem>;
        public prevQuantity: string;
        public prevQuantityUOM: string;
        public prevTotQuantity: string;
        public prevTotQuantityUOM: string;
        public get SupplyInstructionText(): string {
            return this.SupplyInstructionTextField;
        }
        public set SupplyInstructionText(value: string) {
            if (!(Helper.ReferenceEquals(this.SupplyInstructionTextField, value))) {
                this.SupplyInstructionTextField = value;
             //   this.RaisePropertyChanged("SupplyInstructionText");
            }
        }
        public get DispensingInstructionText(): string {
            return this.DispensingInstructionTextField;
        }
        public set DispensingInstructionText(value: string) {
            if (!(Helper.ReferenceEquals(this.DispensingInstructionTextField, value))) {
                this.DispensingInstructionTextField = value;
               // this.RaisePropertyChanged("DispensingInstructionText");
            }
        }
        private _bMultiCompChilds: boolean = false;
        public get bMultiCompChilds(): boolean {
            return this._bMultiCompChilds;
        }
        public set bMultiCompChilds(value: boolean) {
            if (!(this._bMultiCompChilds.Equals(value))) {
                this._bMultiCompChilds = value;
              //  this.RaisePropertyChanged("bMultiCompChilds");
            }
        }
        private _MCIdentifyingOID: number = 0;
        public get MCIdentifyingOID(): number {
            return this._MCIdentifyingOID;
        }
        public set MCIdentifyingOID(value: number) {
            if (!(this._MCIdentifyingOID.Equals(value))) {
                this._MCIdentifyingOID = value;
              //  this.RaisePropertyChanged("MCIdentifyingOID");
            }
        }
        private _doseComQuantityPerDoseUom: string;
        public get DoseComQuantityPerDoseUom(): string {
            return this._doseComQuantityPerDoseUom;
        }
        public set DoseComQuantityPerDoseUom(value: string) {
            if (!(Helper.ReferenceEquals(this._doseComQuantityPerDoseUom, value))) {
                this._doseComQuantityPerDoseUom = value;
              //  this.RaisePropertyChanged("DoseComQuantityPerDoseUom");
            }
        }
        private _doseComTotalPerQuantityUom: string;
        public get DoseComTotalPerQuantityUom(): string {
            return this._doseComTotalPerQuantityUom;
        }
        public set DoseComTotalPerQuantityUom(value: string) {
            if (!(Helper.ReferenceEquals(this._doseComTotalPerQuantityUom, value))) {
                this._doseComTotalPerQuantityUom = value;
              //  this.RaisePropertyChanged("DoseComTotalPerQuantityUom");
            }
        }
        private SupCommentsField: string;
        public get SupComments(): string {
            return this.SupCommentsField;
        }
        public set SupComments(value: string) {
            if ((Helper.ReferenceEquals(this.SupCommentsField, value) != true)) {
                this.SupCommentsField = value;
              //  this.RaisePropertyChanged("SupComments");
            }
        }
        private _prevTotalQuantity: string;
        public get PrevTotalQuantity(): string {
            return this._prevTotalQuantity;
        }
        public set PrevTotalQuantity(value: string) {
            if ((Helper.ReferenceEquals(this._prevTotalQuantity, value) != true)) {
                this._prevTotalQuantity = value;
              //  this.RaisePropertyChanged("PrevTotalQuantity");
            }
        }
        private PrevTotalQuantityUOMField: ManagePrescSer.ObjectInfo;
        public get PrevTotalQuantityUOM(): ManagePrescSer.ObjectInfo {
            return this.PrevTotalQuantityUOMField;
        }
        public set PrevTotalQuantityUOM(value: ManagePrescSer.ObjectInfo) {
            if ((Helper.ReferenceEquals(this.PrevTotalQuantityUOMField, value) != true)) {
                this.PrevTotalQuantityUOMField = value;
               // this.RaisePropertyChanged("PrevTotalQuantityUOM");
            }
        }
        private _prevQuantityPerDose: string;
        public get PrevQuantityPerDose(): string {
            return this._prevQuantityPerDose;
        }
        public set PrevQuantityPerDose(value: string) {
            if ((Helper.ReferenceEquals(this._prevQuantityPerDose, value) != true)) {
                this._prevQuantityPerDose = value;
               // this.RaisePropertyChanged("PrevQuantityPerDose");
            }
        }
        private PrevQuantityPerDoseUOMField: ManagePrescSer.ObjectInfo;
        public get PrevQuantityPerDoseUOM(): ManagePrescSer.ObjectInfo {
            return this.PrevQuantityPerDoseUOMField;
        }
        public set PrevQuantityPerDoseUOM(value: ManagePrescSer.ObjectInfo) {
            if ((Helper.ReferenceEquals(this.PrevQuantityPerDoseUOMField, value) != true)) {
                this.PrevQuantityPerDoseUOMField = value;
               // this.RaisePropertyChanged("PrevQuantityPerDoseUOM");
            }
        }
        public PrevProdSupplyInsWithComments: string;
        public PrevSupComments: string;
    }
    export class ProdOptBackup {
        public Quantity: string[];
        public QuantityUOMOID: number[];
        public QuantityUOMName: string[];
        public TotalQuantity: string[];
        public TotalQuantityUOMOID: number[];
        public TotalQuantityUOMName: string[];
        public Supplycomments: string[];
        public FluidPrescribableItemListOID: number[];
        public PrescriptionItemTechOID: number[];
        public IdentifyingName: string[];
        public IdentifyingOID: number[];
        public IdentifyingType: string[];
        public PrescribableItemListOID: number[];
        public ProdSupplyInsWithComments: string[];
        public bMultiCompChilds: boolean[];
        public SelectedSupplyinstruction: ObservableCollection<CListItem>[];
        public Supplyinstruction: ObservableCollection<CListItem>[];
        public OperationMode: string[];
        public SupplyInstructionText: string[];
    }