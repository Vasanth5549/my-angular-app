import { ObservableCollection } from 'epma-platform/models';
import 'epma-platform/stringextension';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

    export class MedDRCVM extends ClonableViewModelBase implements IViewModelBase {
        private _DRCOrder: number = 0;
        public get DRCOrder(): number {
            return this._DRCOrder;
        }
        public set DRCOrder(value: number) {
            if (this._DRCOrder != value) {
                this._DRCOrder = value;
               //NotifyPropertyChanged("DRCOrder");
            }
        }
        private _DRCMessage: string;
        public get DRCMessage(): string {
            return this._DRCMessage;
        }
        public set DRCMessage(value: string) {
            if (this._DRCMessage != value) {
                this._DRCMessage = value;
               //NotifyPropertyChanged("DRCMessage");
            }
        }
        private _DRCDefDoseType: string;
        public get DRCDefDoseType(): string {
            return this._DRCDefDoseType;
        }
        public set DRCDefDoseType(value: string) {
            if (this._DRCDefDoseType != value) {
                this._DRCDefDoseType = value;
               //NotifyPropertyChanged("DRCDefDoseType");
            }
        }
        private _DRCDefDoseTypeCode: string;
        public get DRCDefDoseTypeCode(): string {
            return this._DRCDefDoseTypeCode;
        }
        public set DRCDefDoseTypeCode(value: string) {
            if (this._DRCDefDoseTypeCode != value) {
                this._DRCDefDoseTypeCode = value;
               //NotifyPropertyChanged("DRCDefDoseTypeCode");
            }
        }
        private _PatientWeight: string;
        public get PatientWeight(): string {
            return this._PatientWeight;
        }
        public set PatientWeight(value: string) {
            if (this._PatientWeight != value) {
                this._PatientWeight = value;
               //NotifyPropertyChanged("PatientWeight");
            }
        }
        private _PatientBSA: string;
        public get PatientBSA(): string {
            return this._PatientBSA;
        }
        public set PatientBSA(value: string) {
            if (this._PatientBSA != value) {
                this._PatientBSA = value;
               //NotifyPropertyChanged("PatientBSA");
            }
        }
        private _DRCOutCome: boolean = false;
        public get DRCOutCome(): boolean {
            return this._DRCOutCome;
        }
        public set DRCOutCome(value: boolean) {
            if (this._DRCOutCome != value) {
                this._DRCOutCome = value;
               //NotifyPropertyChanged("DRCOutCome");
            }
        }
        private _IsDRCChecked: boolean = false;
        public get IsDRCChecked(): boolean {
            return this._IsDRCChecked;
        }
        public set IsDRCChecked(value: boolean) {
            if (this._IsDRCChecked != value) {
                this._IsDRCChecked = value;
               //NotifyPropertyChanged("IsDRCChecked");
            }
        }
        private _DRCConflictDetail: ObservableCollection<DRCConflictDetail>;
        public get DRCConflictDetail(): ObservableCollection<DRCConflictDetail> {
            return this._DRCConflictDetail;
        }
        public set DRCConflictDetail(value: ObservableCollection<DRCConflictDetail>) {
            if (this._DRCConflictDetail != value) {
                this._DRCConflictDetail = value;
               //NotifyPropertyChanged("DRCConflictDetail");
            }
        }
  public DoCleanUP(): void {}

        }
export class DRCConflictDetail
  extends ClonableViewModelBase
  implements IViewModelBase
{
        private _ERRORCode: string;
        public get ERRORCode(): string {
            return this._ERRORCode;
        }
        public set ERRORCode(value: string) {
            if (value != this._ERRORCode) {
                this._ERRORCode = value;
               //NotifyPropertyChanged("ERRORCode");
            }
        }
        private _ERRORText: string;
        public get ERRORText(): string {
            return this._ERRORText;
        }
        public set ERRORText(value: string) {
            if (value != this._ERRORText) {
                this._ERRORText = value;
               //NotifyPropertyChanged("ERRORText");
            }
        }
        private _PresItemDRCConflictOID: number = 0;
        public get PresItemDRCConflictOID(): number {
            return this._PresItemDRCConflictOID;
        }
        public set PresItemDRCConflictOID(value: number) {
            if (value != this._PresItemDRCConflictOID) {
                this._PresItemDRCConflictOID = value;
               //NotifyPropertyChanged("PresItemDRCConflictOID");
            }
        }
        private _ErrorMessage: string;
        public get ErrorMessage(): string {
            return this._ErrorMessage;
        }
        public set ErrorMessage(value: string) {
            if (value != this._ErrorMessage) {
                this._ErrorMessage = value;
               //NotifyPropertyChanged("ErrorMessage");
            }
        }
        private _DRCOtherErrorType: string;
        public get DRCOtherErrorType(): string {
            return this._DRCOtherErrorType;
        }
        public set DRCOtherErrorType(value: string) {
            if (value != this._DRCOtherErrorType) {
                this._DRCOtherErrorType = value;
               //NotifyPropertyChanged("DRCOtherErrorType");
            }
        }
        private _BehaviourType: string;
        public get BehaviourType(): string {
            return this._BehaviourType;
        }
        public set BehaviourType(value: string) {
            if (value != this._BehaviourType) {
                this._BehaviourType = value;
               //NotifyPropertyChanged("BehaviourType");
            }
        }
  public DoCleanUP(): void {}

        }
