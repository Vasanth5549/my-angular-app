// import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
  import { Component, OnInit } from '@angular/core';
import { Level, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, List, ObservableCollection, CListItem, AppDialogEventargs, AppDialogResult, DelegateArgs,
     DialogComponentArgs, WindowButtonType, Visibility } from 'epma-platform/models';
import 'epma-platform/stringextension';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { MedDRCVM } from './meddrcvm';
import { ConflictIcons } from '../model/common';

    export class PresItemDRCVM extends ClonableViewModelBase implements IViewModelBase {
        public listDRCAmendedFields: List<string> = new List<string>();
        private _MedDRCVM: ObservableCollection<MedDRCVM>;
        private _MedDRCReasonList: ObservableCollection<CListItem>;
        private _DRCAcknowledge: boolean = false;
        private _MedDRCReason: CListItem;
        public DRCTrafficIcon: ConflictIcons;
        public get MedDRCVM(): ObservableCollection<MedDRCVM> {
            return this._MedDRCVM;
        }
        public set MedDRCVM(value: ObservableCollection<MedDRCVM>) {
            if (this._MedDRCVM != value) {
                this._MedDRCVM = value;
               //NotifyPropertyChanged("MedDRCVM");
            }
        }
        public get MedDRCReasonList(): ObservableCollection<CListItem> {
            return this._MedDRCReasonList;
        }
        public set MedDRCReasonList(value: ObservableCollection<CListItem>) {
            if (this._MedDRCReasonList != value) {
                this._MedDRCReasonList = value;
               //NotifyPropertyChanged("MedDRCReasonList");
            }
        }
        public get MedDRCReason(): CListItem {
            return this._MedDRCReason;
        }
        public set MedDRCReason(value: CListItem) {
            if (this._MedDRCReason != value) {
                this._MedDRCReason = value;
                if (value != null && !String.IsNullOrEmpty(value.Value)) {
                    this.DRCAcknowledge = true;
                }
                if (value != null && !String.IsNullOrEmpty(value.Value) && String.Equals(value.Value, "CC_DRCINAPPWAR", StringComparison.InvariantCultureIgnoreCase)) {
                    this.DRCCommentsVisibility = Visibility.Visible;
                }
                else {
                    this.DRCComments = String.Empty;
                    this.DRCCommentsVisibility = Visibility.Collapsed;
                }
               //NotifyPropertyChanged("MedDRCReason");
            }
        }
        private _DRCCommentsVisibility: Visibility = Visibility.Collapsed;
        public get DRCCommentsVisibility(): Visibility {
            return this._DRCCommentsVisibility;
        }
        public set DRCCommentsVisibility(value: Visibility) {
            this._DRCCommentsVisibility = value;
           //NotifyPropertyChanged("DRCCommentsVisibility");
        }
        private _IsDRCReasonMandatory: boolean  = false;
        public get IsDRCReasonMandatory(): boolean {
            return this._IsDRCReasonMandatory;
        }
        public set IsDRCReasonMandatory(value: boolean) {
            this._IsDRCReasonMandatory = value;
           //NotifyPropertyChanged("IsDRCReasonMandatory");
        }
        private _IsDRCAcklgdeMandatory: boolean  = false;
        public get IsDRCAcklgdeMandatory(): boolean {
            return this._IsDRCAcklgdeMandatory;
        }
        public set IsDRCAcklgdeMandatory(value: boolean) {
            this._IsDRCAcklgdeMandatory = value;
           //NotifyPropertyChanged("IsDRCAcklgdeMandatory");
        }
        private _IsDRCReasonAcknowldgeEnable: boolean = true;
        public get IsDRCReasonAcknowldgeEnable(): boolean {
            return this._IsDRCReasonAcknowldgeEnable;
        }
        public set IsDRCReasonAcknowldgeEnable(value: boolean) {
            this._IsDRCReasonAcknowldgeEnable = value;
           //NotifyPropertyChanged("IsDRCReasonAcknowldgeEnable");
        }
        private _IsDRCCommentsMandatory: boolean  = false;
        public get IsDRCCommentsMandatory(): boolean {
            return this._IsDRCCommentsMandatory;
        }
        public set IsDRCCommentsMandatory(value: boolean) {
            this._IsDRCCommentsMandatory = value;
           //NotifyPropertyChanged("IsDRCCommentsMandatory");
        }
        private _BehaviourType: string;
        public get BehaviourType(): string {
            return this._BehaviourType;
        }
        public set BehaviourType(value: string) {
            if (this._BehaviourType != value) {
                this._BehaviourType = value;
               //NotifyPropertyChanged("BehaviourType");
            }
        }
        private _DRCComments: string;
        public get DRCComments(): string {
            return this._DRCComments;
        }
        public set DRCComments(value: string) {
            if (this._DRCComments != value) {
                this._DRCComments = value;
               //NotifyPropertyChanged("DRCComments");
            }
        }
        private _IsOpenDRCTab: boolean  = false;
        public get IsOpenDRCTab(): boolean {
            return this._IsOpenDRCTab;
        }
        public set IsOpenDRCTab(value: boolean) {
            if (this._IsOpenDRCTab != value) {
                this._IsOpenDRCTab = value;
               //NotifyPropertyChanged("IsOpenDRCTab");
            }
        }
        private _IsAmendDRCRegenarated: boolean  = false;
        public get IsAmendDRCRegenarated(): boolean {
            return this._IsAmendDRCRegenarated;
        }
        public set IsAmendDRCRegenarated(value: boolean) {
            this._IsAmendDRCRegenarated = value;
           //NotifyPropertyChanged("IsAmendDRCRegenarated");
        }
        private _IsAmendDRCDataLoaded: boolean  = false;
        public get IsAmendDRCDataLoaded(): boolean {
            return this._IsAmendDRCDataLoaded;
        }
        public set IsAmendDRCDataLoaded(value: boolean) {
            this._IsAmendDRCDataLoaded = value;
        }
        public get DRCAcknowledge(): boolean {
            return this._DRCAcknowledge;
        }
        public set DRCAcknowledge(value: boolean) {
            this._DRCAcknowledge = value;
           //NotifyPropertyChanged("DRCAcknowledge");
        }
        public DoCleanUP(): void {

        }
    }