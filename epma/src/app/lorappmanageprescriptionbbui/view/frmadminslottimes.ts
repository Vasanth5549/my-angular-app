import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from "@angular/core";
import { GridComponent } from "@progress/kendo-angular-grid";
import { EventArgs, Grid, iCheckBox, iLabel, iRadioButton, UserControl } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { ObservableCollection, Visibility } from "epma-platform/models";
import { iMessageBox, MessageBoxButton } from "epma-platform/services";
import { PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/Control";
import { GridExtension } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { CResMsgGetAdministrationTimes } from "src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS";
import { CConstants, PrescriptionTypes } from "../utilities/constants";
import { AdminScheduleTime, AdminScheduleTimeVM } from "../viewmodel/adminscheduletimevm";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import {StringComparison} from 'epma-platform/models'
import { Resource } from "../resource";

@Component({
    selector: 'frmAdminSlotTimes',
    templateUrl: './frmadminslottimes.html',
    styleUrls: ['./frmadminslottimes.css'],
  })

export class frmAdminSlotTimes extends UserControl implements AfterViewInit, OnDestroy {
        public oPrescriptionItemVM: PrescriptionItemVM;
        public FreqTypeChangedEvent: Function;
        private SlotModeChangedEvent: Function;
        private DaysofWeeksChangedEvent: Function;

        private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
 if(c){ this.LayoutRoot = c; }
};
private lblSlotTime: iLabel;
@ViewChild("lblSlotTimeTempRef", {read:iLabel, static: false }) set _lblSlotTime(c: iLabel){
 if(c){ this.lblSlotTime = c; }
};
private optFixedTime: iRadioButton;
@ViewChild("optFixedTimeTempRef", {read:iRadioButton, static: false }) set _optFixedTime(c: iRadioButton){
 if(c){ this.optFixedTime = c; }
};
private optDrugRoundTime: iRadioButton;
@ViewChild("optDrugRoundTimeTempRef", {read:iRadioButton, static: false }) set _optDrugRoundTime(c: iRadioButton){
 if(c){ this.optDrugRoundTime = c; }
};
private lblAdministrationTimes: iLabel;
@ViewChild("lblAdministrationTimesTempRef", {read:iLabel, static: false }) set _lblAdministrationTimes(c: iLabel){
 if(c){ this.lblAdministrationTimes = c; }
};
grdAdminTimes : GridExtension = new GridExtension();
  @ViewChild('grdAdminTimesTempRef', { read: GridComponent, static: false }) set _grdAdminTimes(
    c: GridComponent
  ) {
    if (c) {
      this.grdAdminTimes.grid = c;
      this.grdAdminTimes.columns = c.columns;      
    }
  }

private lblDaysOfWeek: iLabel;
@ViewChild("lblDaysOfWeekTempRef", {read:iLabel, static: false }) set _lblDaysOfWeek(c: iLabel){
 if(c){ this.lblDaysOfWeek = c; }
};
private chkSunday: iCheckBox;
@ViewChild("chkSundayTempRef", {read:iCheckBox, static: false }) set _chkSunday(c: iCheckBox){
 if(c){ this.chkSunday = c; }
};
private chkMonday: iCheckBox;
@ViewChild("chkMondayTempRef", {read:iCheckBox, static: false }) set _chkMonday(c: iCheckBox){
 if(c){ this.chkMonday = c; }
};
private chkTuesday: iCheckBox;
@ViewChild("chkTuesdayTempRef", {read:iCheckBox, static: false }) set _chkTuesday(c: iCheckBox){
 if(c){ this.chkTuesday = c; }
};
private chkWednesday: iCheckBox;
@ViewChild("chkWednesdayTempRef", {read:iCheckBox, static: false }) set _chkWednesday(c: iCheckBox){
 if(c){ this.chkWednesday = c; }
};
private chkThursday: iCheckBox;
@ViewChild("chkThursdayTempRef", {read:iCheckBox, static: false }) set _chkThursday(c: iCheckBox){
 if(c){ this.chkThursday = c; }
};
private chkFriday: iCheckBox;
@ViewChild("chkFridayTempRef", {read:iCheckBox, static: false }) set _chkFriday(c: iCheckBox){
 if(c){ this.chkFriday = c; }
};
private chkSaturday: iCheckBox;
@ViewChild("chkSaturdayTempRef", {read:iCheckBox, static: false }) set _chkSaturday(c: iCheckBox){
 if(c){ this.chkSaturday = c; }
};
private _contentLoaded: Boolean;
@ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
 if(c){ this._contentLoaded = c; }
};

public resKey = Resource.MedicationForm;
public Styles = ControlStyles;

override _DataContext: PrescriptionItemVM;
override get DataContext() {
  return this._DataContext;
}
@Input() override set DataContext(value: PrescriptionItemVM) {
    if(value){
    	this._DataContext = value;
        this.grdAdminTimes.SetBinding('data',value.FormViewerDetails.BasicDetails.AdminTimes?.AdministrationScheduleTimes);
    }
    //console.log("FrqAdmminTimes",value.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes,(new Date()).getTime().toString());
  }

  
        constructor(private ref:ChangeDetectorRef) {
            super();            
            this.FreqTypeChangedEvent = (s,e) => { this.BasicDetails_FrequrncyTypeChanged(s) };
            this.SlotModeChangedEvent = (s,e) => { 
                //this.AdminTimes_SlotModeChanged()
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes_SlotModeChanged()
                if(this.DataContext['frmAdminSlotTimesloaded'] == undefined){
                    this.DataContext['frmAdminSlotTimesloaded'] = true;
                }    
                if(this.DataContext['frmAdminSlotTimesloaded'] == true && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds){
                    this.AdminTimes_SlotModeChanged();   
                }
            };
            this.DaysofWeeksChangedEvent = (s,e) => { this.AdminTimes_DaysofWeekChanged()};
        }
    ngOnDestroy(): void {
       // this.frmAdminSlotTimes_Unloaded(null,null);
    }
    ngAfterViewInit(): void {
         this.grdAdminTimes.GenerateColumns();
        this.frmAdminSlotTimes_Loaded(null,null);
        if(this.DataContext){
            this.DataContext.FormViewerDetails.BasicDetails.AdminTimes?.ChangeDetection.subscribe(value =>{
                this.ref.markForCheck();
            })
        }
    }
        sDupliTimeDet: string = String.Empty;
        iTimeScheduled_LostFocus_Func = (s,e) => {this.iTimeScheduled_LostFocus(s,e);};

        iTimeScheduled_LostFocus(sender: Object, e: RoutedEventArgs): void {
            setTimeout(() => {
                if(e['sourceCapabilities'] != null)
                if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (!this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired || (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsAdminTimeReqORNonForPRN && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes.Count > 0))) {
                    if (String.IsNullOrEmpty(this.sDupliTimeDet)) {
                        if (!this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired) {
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
                        }
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails.oFrequency != null && String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails.oFrequency.Type, CConstants.PeriodFrequency, StringComparison.CurrentCultureIgnoreCase)) {
                            this.sDupliTimeDet = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.duplicatecheck(false);
                        }
                        if (!String.IsNullOrEmpty(this.sDupliTimeDet)) {
                            this.sDupliTimeDet = this.sDupliTimeDet.ToString().Substring(0, this.sDupliTimeDet.length - 1);
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsMsgShownAlready = true;
                            let objMsg: iMessageBox = new iMessageBox();
                            objMsg.MessageButton = MessageBoxButton.OK;
                            objMsg.Message = "Time" + " " + this.sDupliTimeDet + " " + "has already been selected as an administration time. Duplicate administration times cannot be added";
                            objMsg.Closed  = (s,e) => { this.objMsg_Closed(s,e); } ;
                            objMsg.Show();
                            if (this.grdAdminTimes != null) {
                                let bindedCollection: ObservableCollection<AdminScheduleTime> = ObjectHelper.CreateType<ObservableCollection<AdminScheduleTime>>(this.grdAdminTimes.ItemsSource, ObservableCollection<AdminScheduleTime> );
                                this.grdAdminTimes.SelectedItem = bindedCollection[this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.LastDuplicateIndex];
                                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.LastDuplicateIndex = -1;
                            }
                        }
                        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.formViewerDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewAfterVisible == Visibility.Visible && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value) && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value.Equals("CC_DOSES")) {
                            this.oPrescriptionItemVM.GetReviewAfterDatetime();
                        }
                        if (DateTime.NotEquals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value) && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value.Equals("CC_DOSES")) {
                            let dtStopDTTM: DateTime= DateTime.MinValue;
                            let dtStartDTTM: DateTime= this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                            dtStopDTTM = this.oPrescriptionItemVM.GetEnddatetimeforDoseDuration(dtStartDTTM);
                            dtStopDTTM = DateTime.Equals(dtStopDTTM, DateTime.MinValue) ? dtStopDTTM : dtStopDTTM.AddMinutes(1);
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopDate = dtStopDTTM;
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopPrescriptionTime = dtStopDTTM;
                        }
                    }
                }
            }, 300);
        }

        onInnerTabKey(event: any,i:number)
        {
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (!this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired || (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsAdminTimeReqORNonForPRN && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes.Count > 0))) {
                if (String.IsNullOrEmpty(this.sDupliTimeDet)) {
                    if (!this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired) {
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
                    }
                    if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails.oFrequency != null && String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails.oFrequency.Type, CConstants.PeriodFrequency, StringComparison.CurrentCultureIgnoreCase)) {
                        this.sDupliTimeDet = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.duplicatecheck(false);
                    }
                    if (!String.IsNullOrEmpty(this.sDupliTimeDet)) {
                        this.sDupliTimeDet = this.sDupliTimeDet.ToString().Substring(0, this.sDupliTimeDet.length - 1);
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsMsgShownAlready = true;
                        let objMsg: iMessageBox = new iMessageBox();
                        objMsg.MessageButton = MessageBoxButton.OK;
                        objMsg.Message = "Time" + " " + this.sDupliTimeDet + " " + "has already been selected as an administration time. Duplicate administration times cannot be added";
                        objMsg.Closed  = (s,e) => { this.objMsg_Closed(s,e); } ;
                        objMsg.Show();
                        if (this.grdAdminTimes != null) {
                            let bindedCollection: ObservableCollection<AdminScheduleTime> = ObjectHelper.CreateType<ObservableCollection<AdminScheduleTime>>(this.grdAdminTimes.ItemsSource, ObservableCollection<AdminScheduleTime> );
                            this.grdAdminTimes.SelectedItem = bindedCollection[this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.LastDuplicateIndex];
                            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.LastDuplicateIndex = -1;
                        }
                    }
                    else
                    {
                        this.grdAdminTimes.Items[i].cell0=false 
                        if(i<this.grdAdminTimes.Items.Count){
                        i=i+1;
                        this.grdAdminTimes.Items[i].cell0=true;
                        }
                    }
                    if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.formViewerDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewAfterVisible == Visibility.Visible && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value) && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value.Equals("CC_DOSES")) {
                        this.oPrescriptionItemVM.GetReviewAfterDatetime();
                    }
                    if (DateTime.NotEquals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AsRequired && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value) && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value.Equals("CC_DOSES")) {
                        let dtStopDTTM: DateTime= DateTime.MinValue;
                        let dtStartDTTM: DateTime= this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                        dtStopDTTM = this.oPrescriptionItemVM.GetEnddatetimeforDoseDuration(dtStartDTTM);
                        dtStopDTTM = DateTime.Equals(dtStopDTTM, DateTime.MinValue) ? dtStopDTTM : dtStopDTTM.AddMinutes(1);
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopDate = dtStopDTTM;
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopPrescriptionTime = dtStopDTTM;
                    }
                }

                
            }
            
        }


        objMsg_Closed(sender: Object, e: EventArgs): void {
            this.sDupliTimeDet = String.Empty;
            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsMsgShownAlready = false;
        }
        public frmAdminSlotTimes_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.LoadfrmAdminSlotTimesEvent();
        }

        public LoadfrmAdminSlotTimesEvent(): void {
            this.oPrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsFixedTime) {
                this.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = true;
            }
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null) {
                if (this.FreqTypeChangedEvent == null)
                    this.FreqTypeChangedEvent = (s,e) => {this.BasicDetails_FrequrncyTypeChanged(s);};
                if (this.SlotModeChangedEvent == null)
                    this.SlotModeChangedEvent = (s,e) => {
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes_SlotModeChanged()
                        if(this.DataContext['frmAdminSlotTimesloaded'] == undefined){
                            this.DataContext['frmAdminSlotTimesloaded'] = true;
                        }    
                        else if(this.DataContext['frmAdminSlotTimesloaded'] == true){
                            this.AdminTimes_SlotModeChanged();   
                        }                    
                    };
                if (this.DaysofWeeksChangedEvent == null)
                    this.DaysofWeeksChangedEvent = (s,e) => {this.AdminTimes_DaysofWeekChanged();};
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FrequrncyTypeChanged = (s,e) => {this.FreqTypeChangedEvent(s);};
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.SlotModeChanged = (s,e) => {this.SlotModeChangedEvent();};
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.DaysofWeekChanged = (s,e) => {this.DaysofWeeksChangedEvent();};
                let _freqDetails: CResMsgGetAdministrationTimes = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FreqDetails;
                this.BasicDetails_FrequrncyTypeChanged(_freqDetails != null && _freqDetails.oFrequency != null ? _freqDetails.oFrequency.Type : String.Empty);
            }
        }
        AdminTimes_SlotModeChanged(): void {
            //  this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes_SlotModeChanged();
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null) {
                if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsFixedTime) {
                    this.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = false;
                }
                else if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.IsDrugroundTime) {
                    this.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = true;
                }
            }
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
                if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("AdminTimes")) {
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("AdminTimes");
                    if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.bIsAmend && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsFirstDoseClearForAmend && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DoChangesForAmend();
                    }
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.formViewerDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewAfterVisible == Visibility.Visible && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value) && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value.Equals("CC_DOSES")) {
                    this.oPrescriptionItemVM.GetReviewAfterDatetime();
                }
                if (DateTime.NotEquals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value) && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value.Equals("CC_DOSES")) {
                    let dtStopDTTM: DateTime= DateTime.MinValue;
                    let dtStartDTTM: DateTime= this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                    dtStopDTTM = this.oPrescriptionItemVM.GetEnddatetimeforDoseDuration(dtStartDTTM);
                    dtStopDTTM = DateTime.Equals(dtStopDTTM, DateTime.MinValue) ? dtStopDTTM : dtStopDTTM.AddMinutes(1);
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopDate = dtStopDTTM;
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopPrescriptionTime = dtStopDTTM;
                }
            }
        }
        AdminTimes_DaysofWeekChanged(): void {
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
                this.oPrescriptionItemVM.formViewerDetails.BasicDetails.SetAdditionalOptionMessage();
                if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds != null && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("DaysOfWeek")) {
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("DaysOfWeek");
                    if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.bIsAmend && !this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsFirstDoseClearForAmend && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DoChangesForAmend();
                    }
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.formViewerDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewAfterVisible == Visibility.Visible && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value) && this.oPrescriptionItemVM.formViewerDetails.BasicDetails.ReviewafterUOM.Value.Equals("CC_DOSES")) {
                    this.oPrescriptionItemVM.GetReviewAfterDatetime();
                }
                if (DateTime.NotEquals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value) && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM.Value.Equals("CC_DOSES")) {
                    let dtStopDTTM: DateTime= DateTime.MinValue;
                    let dtStartDTTM: DateTime= this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                    dtStopDTTM = this.oPrescriptionItemVM.GetEnddatetimeforDoseDuration(dtStartDTTM);
                    dtStopDTTM = DateTime.Equals(dtStopDTTM, DateTime.MinValue) ? dtStopDTTM : dtStopDTTM.AddMinutes(1);
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopDate = dtStopDTTM;
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.StopPrescriptionTime = dtStopDTTM;
                }
            }
        }
        CheckedChange(e){

            console.log("Radiobuttonissue",e,e.value,this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.IsDrugroundTime,e,new Date().getTime());
            if( this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.userclicked){
                this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.IsDrugroundTime = e;
                this.AdminTimes_SlotModeChanged();
            }
            
            // setTimeout(() => {
                // }, 1000);
                //             
        }

        stacPanelClic(){
            console.log("Radiobuttonissue.stacPanelClic",this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.userclicked,new Date().getTime());
            this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.userclicked = true;
            // this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.IsDrugroundTime = true;  
        }
        
        frmAdminSlotTimes_Unloaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
            this.DisposeFormObjects();
        }
        BasicDetails_FrequrncyTypeChanged(FrequrncyType: string): void {
            if (String.Compare(FrequrncyType, "CC_PERIOD") == 0) {
                this.grdAdminTimes.Columns["DrugroundDTTM"].IsVisible = this.grdAdminTimes.Columns["ScheduledDTTM"].IsVisible = true;
                this.grdAdminTimes.Columns["ScheduledDate"].IsVisible = this.grdAdminTimes.Columns["ScheduledTime"].IsVisible = false;
            }
            else {
                this.grdAdminTimes.Columns["ScheduledDate"].IsVisible = this.grdAdminTimes.Columns["ScheduledTime"].IsVisible = true;
                this.grdAdminTimes.Columns["DrugroundDTTM"].IsVisible = this.grdAdminTimes.Columns["ScheduledDTTM"].IsVisible = false;
            }
        }
        private DisposeFormObjects(): void {
            this.FreqTypeChangedEvent = null;
            this.SlotModeChangedEvent = null;
            this.DaysofWeeksChangedEvent = null;
        }
        private DisposeFormEvents(): void {
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null) {
                // this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FrequrncyTypeChanged -= BasicDetails_FrequrncyTypeChanged;
                // this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.SlotModeChanged -= AdminTimes_SlotModeChanged;
                // this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.DaysofWeekChanged -= AdminTimes_DaysofWeekChanged;
            }
        }
        private iTimeScheduled_Unloaded(sender: Object, e: RoutedEventArgs): void {
            // (ObjectHelper.CreateType<iTimeBox>((sender), iTimeBox)).LostFocus -= iTimeScheduled_LostFocus;
            // (ObjectHelper.CreateType<iTimeBox>((sender), iTimeBox)).Unloaded -= iTimeScheduled_Unloaded;
        }
    }
