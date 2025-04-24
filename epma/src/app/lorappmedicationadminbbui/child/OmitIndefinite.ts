import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { StackPanel, UserControl, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { CListItem, ContentControl, Double, List, ObservableCollection, RTEEventargs, ValueDomain, iAppDialogWindow } from 'epma-platform/models';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { BagDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/BagDetailsVM';
import { RoutedEventArgs, RoutedPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { medbagdetails } from 'src/app/lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { OmitSlotsVM } from '../viewmodel/MedsAdminVM';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';
import { ProcessRTE } from 'epma-platform/services';
import { from } from 'rxjs';
import { TextChangedEventArgs } from 'src/app/lorappmanageprescriptionbbui/view/frmformviewforadminconinfusions';
import { ValueSet, InfusionTypesCode, DoseTypeCode, CConstants } from '../utilities/CConstants';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { Resource } from '../resource';
//import { MedsAdminOmitSlots } from '../resource/medsadminomitslots.designer';
@Component({
  selector: 'OmitIndefinite',
  templateUrl: './OmitIndefinite.html'
})
export class OmitIndefinite extends UserControl implements OnInit {

    public stpOmitFrom: StackPanel;
    @ViewChild("stpOmitFromTempRef", {read:StackPanel, static: false }) set _stpOmitFrom(c: StackPanel){
        if(c){ this.stpOmitFrom  = c; }
    };
    public lblReviewOmitFrom: iLabel;
    @ViewChild("lblReviewOmitFromTempRef", {read:iLabel, static: false }) set _lblReviewOmitFrom(c: iLabel){
        if(c){ this.lblReviewOmitFrom  = c; }
    };
    public dpOmitFrom: iDateTimePicker;
    @ViewChild("dpOmitFromTempRef", {read:iDateTimePicker, static: false }) set _dpOmitFrom(c: iDateTimePicker){
        if(c){ this.dpOmitFrom  = c; }
    };
    public iOFReviewTime: iTimeBox;
    @ViewChild("iOFReviewTimeTempRef", {read:iTimeBox, static: false }) set _iOFReviewTime(c: iTimeBox){
        if(c){ this.iOFReviewTime  = c; }
    };
    public lblReviewAfter: iLabel;
    @ViewChild("lblReviewAfterTempRef", {read:iLabel, static: false }) set _lblReviewAfter(c: iLabel){
        if(c){ this.lblReviewAfter  = c; }
    };
    public lblReviewDate: iLabel;
    @ViewChild("lblReviewDateTempRef", {read:iLabel, static: false }) set _lblReviewDate(c: iLabel){
        if(c){ this.lblReviewDate  = c; }
    };
    public udReviewAfter: iUpDownBox;
    @ViewChild("udReviewAfterTempRef", {read:iUpDownBox, static: false }) set _udReviewAfter(c: iUpDownBox){
        if(c){ this.udReviewAfter  = c; }
    };
    public lblReviewAfterUOM: iLabel;
    @ViewChild("lblReviewAfterUOMTempRef", {read:iLabel, static: false }) set _lblReviewAfterUOM(c: iLabel){
        if(c){ this.lblReviewAfterUOM  = c; }
    };
    public cboReviewAfter: iComboBox;
    @ViewChild("cboReviewAfterTempRef", {read:iComboBox, static: false }) set _cboReviewAfter(c: iComboBox){
        if(c){ this.cboReviewAfter  = c; }
    };
    public lblReviewDatelabel: iLabel;
    @ViewChild("lblReviewDatelabelTempRef", {read:iLabel, static: false }) set _lblReviewDatelabel(c: iLabel){
        if(c){ this.lblReviewDatelabel  = c; }
    };
    public lblReviewComments: iLabel;
    @ViewChild("lblReviewCommentsTempRef", {read:iLabel, static: false }) set _lblReviewComments(c: iLabel){
        if(c){ this.lblReviewComments  = c; }
    };
    public txtReviewComments: iTextBox;
    @ViewChild("txtReviewCommentsTempRef", {read:iTextBox, static: false }) set _txtReviewComments(c: iTextBox){
        if(c){ this.txtReviewComments  = c; }
    };
     public  _contentLoaded :boolean;
     whiteBorder: string|object= ControlStyles.whiteBorder;
     InnerBG: string|object= ControlStyles.InnerBG;
     LzoPageBG: any= ControlStyles.LzoPageBG;
     public objOmitSlots = Resource.MedsAdminOmitSlots;
     public iOmitSlotsVM:  OmitSlotsVM;
     public IndexOfUOM: number;
     CurrentDTTM: DateTime = CommonBB.GetServerDateTime();
     public Styles = ControlStyles;
     
    override _DataContext: OmitSlotsVM = new OmitSlotsVM();
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: OmitSlotsVM) {
        this._DataContext = value;
    }
    
    constructor(oOmitSlotsVM?:OmitSlotsVM,private cdr?: ChangeDetectorRef) {
        super();
    
        this.iOmitSlotsVM = new OmitSlotsVM();
        this.iOmitSlotsVM=  this.DataContext ;
    }
    ngOnInit() {
        this.iOmitSlotsVM=  this.DataContext ;
        this.GetDomainCombo("MEDDRSN"); 
    }
      
   
    ngAfterViewInit(): void {
        this.SetDefalutValues();
      this.iOFReviewTime.ValueChanged = (s,e)=>{ this.iOFReviewTime_OnChanged(s,e);}
      this.cdr?.detectChanges();
    }

    private ChildWindowOmitIndefinite_Loaded(sender: Object, e: RoutedEventArgs): void {
    }

    public SetDefalutValues(): void {
        if (this.iOmitSlotsVM.OmittedSlots.OSlotData.Count > 0 && !this.iOmitSlotsVM.MedicationSelected) {
           //var LeastDate = from date in this. iOmitSlotsVM.OmittedSlots.OSlotData orderby date.ScheduleDTTM select date;
           let dateList = [] ;
           this.iOmitSlotsVM.OmittedSlots.OSlotData.forEach(date => {

            dateList.push(date)
             });
             var LeastDate= dateList.OrderBy(date => date.ScheduleDTTM);
          this.iOmitSlotsVM.OmitFromDate = LeastDate.FirstOrDefault().ScheduleDTTM;
            this.iOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.iOmitSlotsVM.OmitFromDate.Hour, this.iOmitSlotsVM.OmitFromDate.Minute,this.iOmitSlotsVM.FromDate == undefined?0:this.iOmitSlotsVM.FromDate?.Second , DateTimeKind.Local);
        }
        else if (this.iOmitSlotsVM.MedicationSelected) {
            if (DateTime.GreaterThan(this.iOmitSlotsVM.PrescriptionItemStartDate, this.CurrentDTTM)) {
                this.iOmitSlotsVM.OmitFromDate = this.iOmitSlotsVM.PrescriptionItemStartDate;
                this.iOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.iOmitSlotsVM.OmitFromDate.Hour, this.iOmitSlotsVM.OmitFromDate.Minute, this.iOmitSlotsVM.FromDate == undefined?0:this.iOmitSlotsVM.FromDate?.Second, DateTimeKind.Local);
            }
            else {
                this.iOmitSlotsVM.OmitFromDate = this.CurrentDTTM;
                this.iOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.iOmitSlotsVM.OmitFromDate.Hour, this.iOmitSlotsVM.OmitFromDate.Minute, this.iOmitSlotsVM.FromDate == undefined?0:this.iOmitSlotsVM.FromDate?.Second, DateTimeKind.Local);
             
            }
        }
      //  this.iOmitSlotsVM.ReviewAfterValue = Double.MinValue;
    //    this.cboReviewAfter.SelectedIndex = 1;
      
    }   

    private txtReviewComments_TextChanged(sender: Object, e: TextChangedEventArgs): void {

    }
    public GetDomainCombo(Domain: string): void {
        switch (Domain) {
            case ValueDomain.MeddurationUOM:
              ProcessRTE.GetAllReferenceCodesByDomain(
                ValueDomain.MeddurationUOM,
                ValueSet.MedReviewAfter,
                (s, e) => {
                  this.OnRTEResultReviewAfter(s);
                }
              );
                break;
        }
    }
    private iOFReviewTime_OnChanged(sender: Object, e: RoutedPropertyChangedEventArgs<DateTime>): void {
        if (this.iOmitSlotsVM.OmittedFromDateTime != e.NewValue) {
            this.iOmitSlotsVM.OmittedFromDateTime = e.NewValue.Value;
        }
    }

    

    OnRTEResultReviewAfter(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
      //   if (String.Equals(args.Request, ValueDomain.MeddurationUOM + "," + ValueSet.MedReviewAfter, StringComparison.CurrentCultureIgnoreCase)) {
            if (args.Result instanceof Dictionary) {
                var objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                var IsComboDosesRequired: boolean = !((this.iOmitSlotsVM.IsInfusion && !String.Equals(this.iOmitSlotsVM.InfusionTypeCode, InfusionTypesCode.INTERMITTENT)) 
                || (this.iOmitSlotsVM.IsInfusion && String.Equals(this.iOmitSlotsVM.InfusionTypeCode, InfusionTypesCode.INTERMITTENT) && String.Equals(this.iOmitSlotsVM.DoseType, DoseTypeCode.STEPPEDVARIABLE)) 
                || String.Equals(this.iOmitSlotsVM.FreqPerodCode, CConstants.OnceOnlyPerodCode) || String.Equals(this.iOmitSlotsVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) || this.iOmitSlotsVM.IsPRN);
               
               // objResult.forEach(function (objDomainDetail) {
                    objResult.forEach(objDomainDetail => {
                    if (String.Equals(objDomainDetail.Key, ValueDomain.MeddurationUOM)) {
                        this.iOmitSlotsVM.IReviewAfterUOM = new ObservableCollection<CListItem>();
                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem) => {
                            if ((oCListItem != null && !String.IsNullOrEmpty(oCListItem.Value) && ( oCListItem.Value === "CC_DOSES"))) {
                                if (IsComboDosesRequired) {
                                    this.iOmitSlotsVM.IReviewAfterUOM.Add(oCListItem);
                                }
                            }
                            else {
                                this.iOmitSlotsVM.IReviewAfterUOM.Add(oCListItem);
                            }
                        });
                        if(this.iOmitSlotsVM.ReviewAfterUOMValue == null)
                        this.iOmitSlotsVM.ReviewAfterUOMValue =  this.iOmitSlotsVM.IReviewAfterUOM[1];
                    }
                });
             }
        //}
    }
}