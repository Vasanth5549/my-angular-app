import { AfterViewInit, Component, OnDestroy, ViewChild,EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Binding, BindingMode, BitmapImage, Border, Control, Cursors, FrameworkElement, Grid, HorizontalAlignment, iButton, iCheckBox, iComboBox, iLabel, iMultiSelectDropdown, iRadioButton, iTextBox, iUpDownBox, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, StackPanel, TextAlignment, TextBlock, TextWrapping, Thickness, ToolTipService, Uri, UriKind, UserControl, VerticalAlignment } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { CListItem, ContentControl, Int64, List, SelectionChangedEventArgs, Visibility } from "epma-platform/models";
import { BusyIndicator, MessageBoxResult, MessageEventArgs } from "epma-platform/services";
import { ClerkFormViewDeftBehaviour, ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { CConstants as MedCommonCConstants } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { DependencyPropertyChangedEventArgs, RoutedEventArgs, ScrollBarVisibility, SelectAllTextEvents, TextDecorations } from "src/app/shared/epma-platform/controls/Control";
import { DatePickerType, iDateTimePicker } from "src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component";
import { iHyperlinkButton } from "src/app/shared/epma-platform/controls/epma-iHyperlinkButton/epma-iHyperlinkButton.component";
import { iTimeBox, TimeFormat } from "src/app/shared/epma-platform/controls/epma-timebox/epma-timebox.component";
import { ActivityTypes } from "../model/common";
import { Resource } from "../resource";
import  * as Common  from "../utilities/common";
import { CConstants, DoseTypeCode, MedImage, MedImages, PrescriptionTypes, ValueDomain } from "../utilities/constants";
import { ProfileData } from "../utilities/profiledata";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { frmAdminSlotTimes } from "./frmadminslottimes";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import {StringComparison} from 'epma-platform/models'
import { medipresolvestepped } from "./medipresolvestepped";
import { frmWeekdays } from "./frmweekdays";
import { ColumnDefinition, RowDefinition } from "src/app/shared/epma-platform/controls/epma-grid/epma-grid.component";
import { MedicationForm } from "../resource/medicationform.designer";
import { Infusion } from "../resource/infusion.designer";
import { GridLength, GridUnitType } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { Orientation } from "src/app/shared/epma-platform/controls-model/Orientation";
import { DateTimeFormat } from "src/app/shared/epma-platform/controls/epma-label/epma-label.component";
import { LzoWizardVmbaseService } from "src/app/shared/epma-platform/services/lzo-wizard-vmbase.service";
import { CListItemsDisplayPipe, NumberToImageUrlPipe, WrapToolTipPipe } from "src/app/product/shared/pipes/medicationconverters.pipe";
import { medresolvetitrated } from "./medresolvetitrated";
import { CommonService } from "src/app/product/shared/common.service";
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
var that;
@Component({
    selector: 'frmBasicFormViewer',
    templateUrl: './frmBasicFormViewer.html',
    styleUrls: ['./frmBasicFormViewer.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })

export class frmBasicFormViewer extends UserControl implements AfterViewInit, OnDestroy{
        objfrm: PrescriptionItemVM;
        iMultiRoute: iMultiSelectDropdown;
        chckIsMultiRoute: iCheckBox;
        public VisibleControls: string[];
        public MandatoryControls: boolean[];
        public bIsLoaded: boolean = false;
        bCtrlsIsLoaded: boolean = false;
        sLowerDoseDefaultValue: string = String.Empty;
        sUpperDoseDefaultValue: string = String.Empty;
        nTabIdx: number = 0;
        private IsBasic: boolean;
        private bIsMultiRoute: boolean;
        public IsStartDateMan: boolean;
        public IsStatTypeMand: boolean;
        public IsFrequencyMandatory: boolean = false;
        public IsDynamicControl : boolean = true;
        oMultiSelectDropDown: iMultiSelectDropdown;
        private bindingObjectsOnPush = [];

        public svwFormViewer: ScrollViewer;
    Ref: this;
        @ViewChild("svwFormViewerTempRef", {read:ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer){
            if(c){ this.svwFormViewer  = c; }
        };
        public MainLayout: Grid;
        @ViewChild("MainLayoutTempRef", {read:Grid, static: false }) set _MainLayout(c: Grid){
            if(c){ this.MainLayout  = c; }
        };
        public BasicDetails: Grid;
        @ViewChild("BasicDetailsTempRef", {read:Grid, static: false }) set _BasicDetails(c: Grid){
            if(c){ this.BasicDetails  = c; }
        };
        public lbtnSequencelinkforN: iHyperlinkButton;
        @ViewChild("lbtnSequencelinkforNTempRef", {read:iHyperlinkButton, static: false }) set _lbtnSequencelinkforN(c: iHyperlinkButton){
            if(c){ this.lbtnSequencelinkforN  = c; }
        };
        public RecordAdminLayoutRoot: Grid;
        @ViewChild("RecordAdminLayoutRootTempRef", {read:Grid, static: false }) set _RecordAdminLayoutRoot(c: Grid){
            if(c){ this.RecordAdminLayoutRoot  = c; }
        };
        public brdAdminDetails: Border;
        @ViewChild("brdAdminDetailsTempRef", {read:Border, static: false }) set _brdAdminDetails(c: Border){
            if(c){ this.brdAdminDetails  = c; }
        };
        public lblAdminDetails: TextBlock;
        @ViewChild("lblAdminDetailsTempRef", {read:TextBlock, static: false }) set _lblAdminDetails(c: TextBlock){
            if(c){ this.lblAdminDetails  = c; }
        };
        public adminslotuc: frmAdminSlotTimes;
        @ViewChild("adminslotucTempRef", {read:frmAdminSlotTimes, static: false }) set _adminslotuc(c: frmAdminSlotTimes){
            if(c){ this.adminslotuc  = c; }
        };
        public brdAdminDetails1: Border;
        @ViewChild("brdAdminDetails1TempRef", {read:Border, static: false }) set _brdAdminDetails1(c: Border){
            if(c){ this.brdAdminDetails1  = c; }
        };
        public Weekdays: frmWeekdays;
        @ViewChild("WeekdaysTempRef", {read:frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays){
            if(c){ this.Weekdays  = c; }
        };
        public brdAdditionalOptions: Border;
        @ViewChild("brdAdditionalOptionsTempRef", {read:Border, static: false }) set _brdAdditionalOptions(c: Border){
            if(c){ this.brdAdditionalOptions  = c; }
        };
        public lblRecordAdminBorder: TextBlock;
        @ViewChild("lblRecordAdminBorderTempRef", {read:TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock){
            if(c){ this.lblRecordAdminBorder  = c; }
        };
        public lblForAdminMessage1: iLabel;
        @ViewChild("lblForAdminMessage1TempRef", {read:iLabel, static: false }) set _lblForAdminMessage1(c: iLabel){
            if(c){ this.lblForAdminMessage1  = c; }
        };
        public chkForAdminOption1: iCheckBox;
        @ViewChild("chkForAdminOption1TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox){
            if(c){ this.chkForAdminOption1  = c; }
        };
        public lblForAdminMessage2: iLabel;
        @ViewChild("lblForAdminMessage2TempRef", {read:iLabel, static: false }) set _lblForAdminMessage2(c: iLabel){
            if(c){ this.lblForAdminMessage2  = c; }
        };
        public chkForAdminOption2: iCheckBox;
        @ViewChild("chkForAdminOption2TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption2(c: iCheckBox){
            if(c){ this.chkForAdminOption2  = c; }
        };
        public brdSTA: Border;
        @ViewChild("brdSTATempRef", {read:Border, static: false }) set _brdSTA(c: Border){
            if(c){ this.brdSTA  = c; }
        };
        public lblBorder: iLabel;
        @ViewChild("lblBorderTempRef", {read:iLabel, static: false }) set _lblBorder(c: iLabel){
            if(c){ this.lblBorder  = c; }
        };
        public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();
        /*@ViewChild("ContentCtrlMedResolveSteppedTempRef", {read:ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl){
            if(c){ this.ContentCtrlMedResolveStepped  = c; }
        };*/

        public MedIPResolveStepped: medipresolvestepped;
        @ViewChild("MedIPResolveSteppedTempRef", {read:medipresolvestepped, static: false }) set _MedIPResolveStepped(c: medipresolvestepped){
            if(c)
            { 
                console.log("Medipresolve.ViewChild ",(new Date()).getTime().toString(), c.cboFrequency == undefined);
                this.MedIPResolveStepped  = c; 
                this.MedIPResolveStepped.ParentRef = this;
                if(this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc)
                    this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc(c);
            }
        };

        public Medresolvetitrated: medresolvetitrated;
        @ViewChild("MedresolvetitratedTempRef", {read:medresolvetitrated, static: false }) set _Medresolvetitrated(c: medresolvetitrated){
            if(c)
            { 
                this.Medresolvetitrated  = c; 
                this.Medresolvetitrated.ParentRef = this;
                this.Medresolvetitrated.omedFormViewer = this.ParentRef;  
                if(this.ContentCtrlMedResolveStepped.Content.MedResolveTitratedLoadedFunc)
                    this.ContentCtrlMedResolveStepped.Content.MedResolveTitratedLoadedFunc(c);
            }
        };

        public resKey = Resource.MedicationForm;
        public resKey1 = Resource.Infusion;
        public Styles = ControlStyles;
        public FormLoadAFterviewinit : boolean = false;
        FormviewerLoadedEventsubscription = null;

        constructor(private changeDetectorRef?:ChangeDetectorRef)
        {
            super();
            this.Ref = this;
        }

        public maxScrollContentHeight;
        ngAfterViewInit(): void {
            //iBusyIndicator.Start("FormLoading");
            BusyIndicator.SetStatusBusy("FormLoading");
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if(this.maxScrollContentHeight){
                this.maxScrollContentHeight = this.maxScrollContentHeight - 60;
            }
            //Temporary fix to disable all controls for completed and discontinued prescription items
            if(this.DataContext.IsFormViewerDisable && this.IsEnabled)
            {
                this.IsEnabled = false;
            }

            this.BindControls();
            
            if(this.FormLoadAFterviewinit){
                this.UserControl_Loaded(this, null);
            }
            else{
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);       
            this.FormviewerLoadedEventsubscription = this.objfrm.FormviewerLoadedEvent.subscribe( data => {
            this.UserControl_Loaded(this, null);
            this.FormLoadAFterviewinit = true
            this.FormviewerLoadedEventsubscription.unsubscribe();
            }
            );
        }
        this.objfrm.FormViewerDetails.BasicDetails.DynamicControlIsLoaded = true;
        this.objfrm.FormViewerDetails.BasicDetails.DynamicControlEndInstallLoaded.subscribe(data => {
            this.invokeDetectChanges();
        });
        this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            let cboPRNInstruction = ObjectHelper.CreateType<iComboBox>(this.FindName("cboPRNInstruction"), iComboBox);
            if (cboPRNInstruction != null) {
                cboPRNInstruction.ClearValue(true);
            }
        });
        setTimeout(()=>{
            this.onpushChange();
            this.changeDetectorRef.detectChanges();
            BusyIndicator.SetStatusIdle("FormLoading");
        },300)
    }
    invokeDetectChanges(){
        setTimeout(()=>{
            this.changeDetectorRef.detectChanges();
        },300)
    }

    constructorImpl5(sVisibleCtrls: string[], sMandatoryCtrls: boolean[], bIsBasic: boolean, bIsMRoute: boolean, bDoseType: boolean) {
        this.IsBasic = bIsBasic;
        this.bIsMultiRoute = bIsMRoute;
        let lstVisibleCtrls: List<string> = new List<string>();
        let lstMandatoryCtrls: List<boolean> = new List<boolean>();
        if (bDoseType && sVisibleCtrls != null && !String.IsNullOrEmpty(PatientContext.PrescriptionType) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase)) {
            for (let i: number = 0; i < sVisibleCtrls.length; i++) {
                lstMandatoryCtrls.Add(sMandatoryCtrls[i]);
                if (String.Equals(sVisibleCtrls[i], CConstants.CONST_DOSE, StringComparison.CurrentCultureIgnoreCase)) {
                    lstVisibleCtrls.Add(sVisibleCtrls[i]);
                    lstVisibleCtrls.Add(CConstants.REVIEWTITRATED);
                    lstMandatoryCtrls.Add(false);
                }
                else {
                    lstVisibleCtrls.Add(sVisibleCtrls[i]);
                }
            }
        }
        if (lstVisibleCtrls != null && lstVisibleCtrls.Count > 0) {
            this.VisibleControls = lstVisibleCtrls.ToArray();
        }
        else {
            this.VisibleControls = sVisibleCtrls;
        }
        if (lstMandatoryCtrls != null && lstMandatoryCtrls.Count > 0) {
            this.MandatoryControls = lstMandatoryCtrls.ToArray();
        }
        else {
            this.MandatoryControls = sMandatoryCtrls;
        }
        //this.BindControls();
    }
    public afterDynamicControlInit = new EventEmitter();
    constructorImpl1(bIsBasic: boolean) {
        this.IsBasic = bIsBasic;

            //Temporary fix to disable all controls for completed and discontinued prescription items
            if(this.IsBasic == false && this.DataContext.IsFormViewerDisable && this.IsEnabled)
            {
                this.IsEnabled = false;
            }
        }
        OnDynamicControlInit = (dynamicControl) => {
            console.log("frmBasicFormViewer.OnDynamicControlInit",dynamicControl);
            this.DynamicControls = dynamicControl;
            that = this;
            this.afterDynamicControlInit.emit(this.DynamicControls);
        }
        public BindControls(): void {
            if (!this.bCtrlsIsLoaded && this.VisibleControls != null && this.VisibleControls.length > 0) {
                let nCtrlsCnt: number = this.VisibleControls.length;
                let nGridRowCnt: number = nCtrlsCnt / 2;
                if (nCtrlsCnt % 2 != 0)
                    nGridRowCnt++;
                for (let i: number = 0; i < nGridRowCnt; i++)
                    this.BasicDetails.RowDefinitions.Add(ObjectHelper.CreateObject(new RowDefinition(), { MinHeight: 28, Height:28 }));
                let nRow: number = 1;
                let nLblColumn: number = 1;
                let nCtrlColumn: number = 2;
                let lMandatoryControlsLength: number = 0;
                if (this.MandatoryControls != null)
                    lMandatoryControlsLength = this.MandatoryControls.length;
                for (let i: number = 0; i < this.VisibleControls.length; i++) {
                    let bIsMandatory: boolean = false;
                    let sCtrl: string = String.Empty;
                    sCtrl = this.VisibleControls[i];
                    if (this.IsBasic && lMandatoryControlsLength >= (i + 1)) {
                        bIsMandatory = this.MandatoryControls[i];
                    }
                    let lbl: Control = null;
                    let ctrl: Control = null;
                    this.nTabIdx++;
                    
                    this.GetControlsToBind(sCtrl, 
                        (o1) => {
                            lbl = o1;
                          },
                        (o2) => {
                            ctrl = o2;
                        },
                        bIsMandatory);

                    if (lbl != null) {
                        this.BasicDetails.Children.Add(lbl);
                        Grid.SetRow(lbl, nRow);
                        Grid.SetColumn(lbl, nLblColumn);
                    }
                    if (ctrl != null) {
                        this.BasicDetails.Children.Add(ctrl);
                        Grid.SetRow(ctrl, nRow);
                        Grid.SetColumn(ctrl, nCtrlColumn);
                    }
                    if (nRow < nGridRowCnt) {
                        nRow++;
                    }
                    else {
                        nRow = 1;
                        nLblColumn = 4;
                        nCtrlColumn = 5;
                    }
                }
                this.bCtrlsIsLoaded = true;
            }
        }
        private GetControlsToBind(sCtrl: string, 
            out1: (lbl: Control) => void,
            out2: (ctrl: Control) => void,
            mCtrl: boolean): void {
                let lbl: Control;
                let ctrl: Control;

        let cboTemp: iComboBox;
        let cboTempRoute: iComboBox;
        let txtTemp: iTextBox;
        let lblTemp: iLabel;
        let lblTempRoute: iLabel;
        let lblTemp2: iLabel;
        let grdTemp: Grid;
        let dtpTemp: iDateTimePicker;
        let itbTemp: iTimeBox;
        let chkTempI: iCheckBox;
        let irbTemp: iRadioButton;
        let irbTemp1: iRadioButton;
        let iUpdTemp: iUpDownBox;
        let lblTemp3: iLabel;
        let ibtn: iButton;
        let lblTempMR: iLabel;
        let grdTempforMultiroute: Grid;
        let borders: Border;
        try {
            switch (sCtrl) {
                case "ROUTE":
                    lblTemp = this.GetiLabel("lblRoute", "Route", mCtrl);
                    cboTemp = this.GetiComboBox("cboRoute", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Routes"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Route"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsRouteComboVisible"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsRouteVisible"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableRoute"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableRoute"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.ROUTE_Tooltip);
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "RouteLayoutRoot",
                        Margin: new Thickness(0, 2, 2, 5)
                    });
                    grdTemp.RowDefinitions.Add(new RowDefinition());
                    grdTemp.SetBinding(Grid.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsRouteComboVisible"), { Mode: BindingMode.TwoWayExtended }));
                    grdTemp.Children.Add(cboTemp);
                    lbl = lblTemp;
                    ctrl = grdTemp;
                    if (this.bIsMultiRoute && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0) {
                        lblTempRoute = this.GetiLabel("lblRoute", "Route", mCtrl);
                        cboTempRoute = this.GetiComboBox("cboRoute", true);
                        cboTempRoute.Width = 215;
                        cboTempRoute.Margin = new Thickness(5, 2, 2, 5);
                        cboTempRoute.TabIndex = this.nTabIdx;
                        this.chckIsMultiRoute = this.GetiCheckBox("chckIsMultiRoute");
                        this.chckIsMultiRoute.TabIndex = this.nTabIdx;
                        lblTempMR = this.GetiLabel("lblforMultiRoute", Infusion.chkMultiRoute_Text, mCtrl);
                        lblTempMR.Mandatory = false;
                        lblTempMR.HorizontalAlignment = HorizontalAlignment.Right;
                        this.iMultiRoute = this.GetMultiSelectDropDown("iMultiRoute", true);
                        this.iMultiRoute.TabIndex = this.nTabIdx;
                        this.iMultiRoute.Width = 205;
                        this.chckIsMultiRoute.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteChecked"), { Mode: BindingMode.TwoWayExtended }));
                        this.chckIsMultiRoute.SetBinding(iCheckBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteVisible"), { Mode: BindingMode.TwoWayExtended }));
                        this.chckIsMultiRoute.SetBinding(iCheckBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMultiRouteChkBox"), { Mode: BindingMode.TwoWayExtended }));
                        lblTempMR.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMultiRouteChkBox"), { Mode: BindingMode.TwoWayExtended }));
                        lblTempRoute.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMultiRouteChkBox"), { Mode: BindingMode.TwoWayExtended }));
                        lblTempMR.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteVisible"), { Mode: BindingMode.TwoWayExtended }));
                        cboTempRoute.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Routes"), { Mode: BindingMode.TwoWayExtended }));
                        cboTempRoute.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Route"), { Mode: BindingMode.TwoWayExtended }));
                        cboTempRoute.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteComboVisible"), { Mode: BindingMode.TwoWayExtended }));
                        cboTempRoute.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableRoute"), { Mode: BindingMode.TwoWayExtended }));
                        lblTempRoute.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteVisible"), { Mode: BindingMode.TwoWayExtended }));
                        this.iMultiRoute.SetBinding(iMultiSelectDropdown.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Routes"), { Mode: BindingMode.TwoWayExtended }));
                        this.iMultiRoute.SetBinding(iMultiSelectDropdown.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMultiRoute"), { Mode: BindingMode.TwoWayExtended }));
                        this.iMultiRoute.SetBinding(iMultiSelectDropdown.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteDropDownVisible"), { Mode: BindingMode.TwoWayExtended }));
                        this.iMultiRoute.SetBinding(iMultiSelectDropdown.SelectionItemProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.MultiRoute2"), { Mode: BindingMode.TwoWayExtended }));
                        ToolTipService.SetToolTip(this.iMultiRoute, MedicationForm.MedicationForm_MultiROUTE_Tooltip);
                        ToolTipService.SetToolTip(cboTempRoute, MedicationForm.ROUTE_Tooltip);
                        ToolTipService.SetToolTip(this.chckIsMultiRoute, Infusion.chkMultiRoute_Text);
                        ToolTipService.SetToolTip(lblTempMR, Infusion.chkMultiRoute_Text);
                        grdTempforMultiroute = ObjectHelper.CreateObject(new Grid(), {
                            Name: "RouteLayoutRoot",
                            Margin: new Thickness(0, 2, 2, 2)
                        });
                        grdTempforMultiroute.RowDefinitions.Add(new RowDefinition());
                        grdTempforMultiroute.SetBinding(Grid.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMultiRouteVisible"), { Mode: BindingMode.TwoWayExtended }));
                        grdTempforMultiroute.RowDefinitions.Add(new RowDefinition());
                        grdTempforMultiroute.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                        grdTempforMultiroute.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: 27 }));
                        grdTempforMultiroute.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: 'Auto' }));
                        grdTempforMultiroute.Children.Add(cboTempRoute);
                        grdTempforMultiroute.Children.Add(this.iMultiRoute);
                        grdTempforMultiroute.Children.Add(this.chckIsMultiRoute);
                        grdTempforMultiroute.Children.Add(lblTempMR);
                        Grid.SetColumn(cboTemp, 1);
                        //grdTempforMultiroute.SetColumnSpan(cboTemp, 2);//Grid.SetColumnSpan(cboTemp, 1);
                        Grid.SetColumn(this.iMultiRoute, 1);
                        Grid.SetColumn(this.chckIsMultiRoute, 2);
                        Grid.SetColumn(lblTempMR, 3);
                        lbl = lblTempRoute;
                        ctrl = grdTempforMultiroute;
                    }
                    break;
                case "CC_PROBLEM":
                    lblTemp = this.GetiLabel("lblProblem", "Problem/indication", mCtrl);
                    txtTemp = this.GetiTextBox("txtProblem");
                    txtTemp.TabIndex = this.nTabIdx;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.CC_PROBLEM_Tooltip);
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ProblemIndication"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.TagProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PatientProblemCode"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableProblemIndication"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableProblemIndication"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.Height = 63;
                    txtTemp.TextWrapping = TextWrapping.Wrap;
                    txtTemp.AcceptsReturn = true;
                    txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                    lblTemp.Margin = new Thickness(0, 25, 5, 25);
                    lbl = lblTemp;
                    ctrl = txtTemp;
                    break;
                case "CC_SITE":
                    lblTemp = this.GetiLabel("lblSite", "Site", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsSiteEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsSiteMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SiteVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboSite", true);
                    cboTemp.AllowInputText = true;
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Sites"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Site"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SiteFreeText"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsSiteEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SiteVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.CC_SITE_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    break;
                case "LINEE":
                    lblTemp = this.GetiLabel("lblLine", "Line", mCtrl);
                    cboTemp = this.GetiComboBox("cboLine", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_FORM":
                    lblTemp = this.GetiLabel("lblForm", "Dosage form", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDosage"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsDosageFormMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DosageFormVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboDosageForm", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Forms"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DosageForm"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DosageFormVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDosage"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboDosageForm_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    break;
                case "CC_STRENGTH":
                    lblTemp = this.GetiLabel("lblStrength", "Strength", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableStrength"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsStrengthMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StrengthVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboStrength", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableStrength"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Strengths"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Strength"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StrengthVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboStrength_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    break;
                case "CC_DIRECTION":
                    lblTemp = this.GetiLabel("lblIsPRN", Resource.MedicationForm.lblIsPRN_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableAsrequired"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI = this.GetiCheckBox("chkPRN");
                    chkTempI.TabIndex = this.nTabIdx;
                    let spPRN: StackPanel = new StackPanel();
                    spPRN.Orientation = Orientation.Horizontal;
                    spPRN.Margin = new Thickness(5, 2, 5, 2);
                    spPRN.SetBinding(StackPanel.BackgroundProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PRNChkColorVisible"), { Mode: BindingMode.TwoWayExtended }));
                    // chkTempI.SetBinding(iCheckBox.BackgroundProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PRNChkColorVisible"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.AsRequired"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI.SetBinding(iCheckBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableAsrequired"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(chkTempI, MedicationForm.chkPRN_Tooltip);
                    lbl = lblTemp;
                    spPRN.Children.Add(chkTempI);
                    ctrl = spPRN;
                    break;
                case "CC_PRNINST":
                    lblTemp = this.GetiLabel("lblPRNInstruction", Resource.MedicationForm.lblPRNInstruction_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnablePRNInst"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsPRNInstructionMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboPRNInstruction", true);
                    cboTemp.AllowInputText = true;
                    cboTemp.SelectAllTextEvent = SelectAllTextEvents.None;
                    cboTemp.IsTextSearchEnabled = "True";
                    cboTemp.IsTypeAHead = "True";
                    cboTemp.ISDynamicFormPRN = true;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.PRNInstructions"), { Mode: BindingMode.OneWay }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PRNInstruction"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PRNInstructionFreeText"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnablePRNInst"), { Mode: BindingMode.OneWay }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboPRNInstruction_ToolTip);
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_FREQUENCY":
                    lblTemp = this.GetiLabel("lblFrequency", "Frequency", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableFrequency"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleFrequency"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryFrequency"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboFrequency", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Frequencys"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Frequency"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableFrequency"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleFrequency"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SelectionChanged = (s, e) => { this.OnFrequencySelectionChanged(this.adminslotuc, s, e) };
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboFrequency_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    this.IsFrequencyMandatory = mCtrl;
                    break;
                case "CC_ADMININSTR":
                    lblTemp = this.GetiLabel("lblAdmin", "Administration instructions", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableAdminInst"), { Mode: BindingMode.TwoWayExtended }));
                    lbl = lblTemp;
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient) == 0) {
                        txtTemp = this.GetiTextBox("txtAdminInstruction");
                        txtTemp.TabIndex = this.nTabIdx;
                        txtTemp.AcceptsReturn = true;
                        txtTemp.Height = 40;
                        txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableAdminInst"), { Mode: BindingMode.TwoWayExtended }));
                        txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.OtherAdminiInstruction"), { Mode: BindingMode.TwoWayExtended }));
                        ToolTipService.SetToolTip(txtTemp, MedicationForm.txtAdminInstruction_ToolTip);
                        txtTemp.TextWrapping = TextWrapping.Wrap;
                        txtTemp.MaxLength = 255;
                        txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                        txtTemp.AcceptsReturn = "True";
                        ctrl = txtTemp;
                    }
                    else {
                        cboTemp = this.GetiComboBox("cboAdmin", true);
                        cboTemp.TabIndex = this.nTabIdx;
                        cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableAdminInst"), { Mode: BindingMode.TwoWayExtended }));
                        cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.AdminInstructions"), { Mode: BindingMode.TwoWayExtended }));
                        cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsAdminInsVisible"), { Mode: BindingMode.TwoWayExtended }));
                        cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.AdminInstruction"), { Mode: BindingMode.TwoWayExtended }));
                        ToolTipService.SetToolTip(cboTemp, MedicationForm.CC_ADMININSTR_Tooltip);
                        ctrl = cboTemp;
                    }
                    break;
                case "CC_ADMININSTROTHERS":
                    lblTemp = this.GetiLabel("lblAdminInstruction", "Other instructions", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableAdminInst"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.OtherAdminiInstVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp = this.GetiTextBox("txtAdminInstruction");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.MaxLength = 255;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtAdminInstruction_ToolTip);
                    txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableAdminInst"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.OtherAdminiInstruction"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.OtherAdminiInstVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.AcceptsReturn = "True";
                    ctrl = txtTemp;
                    lbl = lblTemp;
                    break;
                case "CC_MED_GRP_STATYP":
                    lblTemp = this.GetiLabel("lblStationary", "Stationery type", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableStationeryType"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboStationary", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.IsEditable = false;
                    cboTemp.IsTypeAHead = false;
                    cboTemp.IsTextSearchEnabled = false;
                    this.IsStatTypeMand = mCtrl;
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryStatType"), { Mode: BindingMode.OnPush }),this.bindingObjectsOnPush);
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Stationarys"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StationaryType"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableStationeryType"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboStatType_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    break;
                case "CC_DOSETYPE":
                    lblTemp = this.GetiLabel("lblDoseType", "Dose type", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDoseType"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboDoseType", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.DoseType"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DoseType"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDoseType"), { Mode: BindingMode.TwoWayExtended }));
                    if (!mCtrl) {
                        cboTemp.IsEditable = false;
                        cboTemp.IsTypeAHead = false;
                        cboTemp.IsTextSearchEnabled = false;
                    }
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboDoseType_Tooltip);
                    ctrl = cboTemp;
                    lbl = lblTemp;
                    break;
                case "CC_ENDRSMNT_PROPTY":
                    lblTemp2 = this.GetiLabelUnderscore("lblEndorprop", "Endorsement properties", mCtrl);
                    lblTemp2.TabIndex = this.nTabIdx;
                    lblTemp2.Cursor = Cursors.Hand;
                    ToolTipService.SetToolTip(lblTemp2, MedicationForm.cboEndorsementproperties_Tooltip);
                    (ObjectHelper.CreateType<iLabel>(lblTemp2, iLabel)).AddHandler("MouseLeftButtonDownEvent", (s, e) => { this.lblEndorprop_MouseLeftButtonUp(s, e); }, true);
                    lblTemp = this.GetiLabel("clbEndorprop", "", false);
                    lblTemp.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.EndorsementProperties"), { Mode: BindingMode.TwoWayExtended, Converter: new CListItemsDisplayPipe(), ConverterParameter: ";E" }));
                    lblTemp.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.EndorsementProperties"), { ElementName: "clbEndorprop", Path: /*new PropertyPath(*/"Text"/*)*/ }));
                    grdTemp = ObjectHelper.CreateObject(new Grid(), { Name: sCtrl + "Layout" });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.Children.Add(lblTemp);
                    Grid.SetColumn(lblTemp, 1);
                    ctrl = grdTemp;
                    lbl = lblTemp2;
                    break;
                case "CC_TRTMNT":
                    lblTemp = this.GetiLabel("lblTreatment", "Treatment to continue", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableTreatmentCont"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboTreatment", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.TreatToContinue"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.TreatmentToContinue"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableTreatmentCont"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboTreatToCon_Tooltip);
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_SUPLYINSTR":
                    lblTemp = this.GetiLabelLink("lblSupplyInst", Resource.MedicationForm.lblSupplyInst_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableSupplyInstruction"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleSupplyInstr"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatorySupplyInstr"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.IsFocusable = false;
                    lblTemp.IsWordwrap = true;
                    let SV: ScrollViewer = new ScrollViewer();
                    SV.Height = 35;
                    SV.Width = 320;
                    SV.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                    SV.BorderThickness = new Thickness(0);
                    lblTemp2 = this.GetiLabel("lblSupplyInstText", String.Empty, false);
                    lblTemp2.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableSupplyInstruction"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleSupplyInstr"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SupplyInsTextWithComments"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SupplyInsTextWithComments"), { Mode: BindingMode.TwoWayExtended, ElementName: "lblSupplyInstText", Path: /*new PropertyPath(*/"Text"/*)*/, Converter: new WrapToolTipPipe() }));
                    lblTemp2.IsDynamicControlText = true;
                    lblTemp2.IsWordwrap = true;
                    SV.Content = lblTemp2;
                    lblTemp3 = this.GetiLabel("lblSupplyInstValue", String.Empty, false);
                    lblTemp3.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableSupplyInstruction"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp3.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.SupplyInsVal"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp3.Visibility = Visibility.Collapsed;
                    grdTemp = ObjectHelper.CreateObject(new Grid(), { Name: sCtrl + "LayoutSupply" });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.Children.Add(SV);
                    grdTemp.Children.Add(lblTemp3);
                    Grid.SetColumn(SV, 1);
                    Grid.SetColumn(lblTemp3, 1);
                    lbl = lblTemp;
                    ctrl = grdTemp;
                    break;
                case CConstants.sMedClerk:
                    lblTemp = this.GetiLabel("lblModClerkReason", MedicationForm.lblClerkRsnForMod_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify"), { Mode: BindingMode.OneWay }));
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding("DataContext.IsReasonForMedicationClerkModifyVisible"), { Mode: BindingMode.OneWay }));
                    cboTemp = this.GetiComboBox("cboModClerkReason", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify"), { Mode: BindingMode.OneWay }));
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.ClerkingReasonforModification"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.MedClerkModifyReason"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding("DataContext.IsReasonForMedicationClerkModifyVisible"), { Mode: BindingMode.OneWay }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboClerkRsnForMod_Tooltip);
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case CConstants.CONST_QUANTITY:
                    lbl = this.GetiLabel("lblQuantity", "Quantity", mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsQuantityEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    lbl.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsQuantityMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp = this.GetiTextBox("txtQuantity");
                    txtTemp.Width = 70;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtQuantity_Tooltip);
                    txtTemp.HorizontalAlignment = HorizontalAlignment.Left;
                    txtTemp.Type = "Numeric";
                    txtTemp.Nonnegative = true;
                    txtTemp.Scale = CConstants.QtyScale;
                    txtTemp.Precision = CConstants.QtyPrecision;
                    txtTemp.MaxLength = 9;
                    txtTemp.TabIndex = this.nTabIdx;
                    this.nTabIdx++;
                    txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsQuantityEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Quantity"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtQuantity_Tooltip);
                    cboTemp = this.GetiComboBox("cboQuantity", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SelectAllTextEvent = SelectAllTextEvents.None;
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.txtQuantity_Tooltip);
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Quantitys"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.QuantityUOM"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsQuantityEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboQuantity_Tooltip);
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "GridQty",
                        HorizontalAlignment: HorizontalAlignment.Stretch
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(3, GridUnitType.Star) }));
                    grdTemp.Children.Add(txtTemp);
                    grdTemp.Children.Add(cboTemp);
                    Grid.SetColumn(txtTemp, 1);
                    Grid.SetColumn(cboTemp, 2);
                    ctrl = grdTemp;
                    break;
                case CConstants.CONST_DOSE:
                    lblTemp = this.GetiLabel("lblDose", "Dose", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Doselabelvalue"), { Mode: BindingMode.OneWay }));
                    ibtn = this.GetButton("Dosecalc", String.Empty);
                    ibtn.Cursor = Cursors.Arrow;
                    ToolTipService.SetToolTip(ibtn, MedicationForm.DCCalcIconToolTip);
                    ibtn.SetBinding(iButton.ImageSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DcIconTypeId"), {
                        Mode: BindingMode.OneWay,
                        Converter: new NumberToImageUrlPipe()
                    }));
                    ibtn.DisabledImageSource = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DCDisableIcon), UriKind.RelativeOrAbsolute));
                    ibtn.SetBinding(iButton.ActiveImageSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DcIconTypeId"), {
                        Mode: BindingMode.OneWay,
                        Converter: new NumberToImageUrlPipe()
                    }));
                    ibtn.SetBinding(iButton.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsDCIconVisible"), { Mode: BindingMode.TwoWayExtended }));
                    ibtn.SetBinding(iButton.CommandProperty, new Binding("DataContext.BtnDCCalcClick"));
                    ibtn.HorizontalContentAlignment = HorizontalAlignment.Right;
                    ibtn.Width = 20;
                    ibtn.MinWidth = "20";
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "Dose",
                        HorizontalAlignment: HorizontalAlignment.Stretch,
                        Margin: new Thickness(5, 2, 0, 0)
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Auto) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    Grid.SetRow(lblTemp, 1);
                    Grid.SetRow(ibtn, 1);
                    grdTemp.Children.Add(lblTemp);
                    grdTemp.Children.Add(ibtn);
                    Grid.SetColumn(lblTemp, 1);
                    Grid.SetColumn(ibtn, 2);
                    lbl = grdTemp;
                    txtTemp = this.GetiTextBox("txtLowerDose");
                    txtTemp.Margin = new Thickness(0, 0, 3, 0);
                    txtTemp.Type = "Numeric";
                    txtTemp.Nonnegative = true;
                    txtTemp.Scale = 7;
                    txtTemp.Precision = 3;
                    txtTemp.MaxLength = 11;
                    txtTemp.MinWidth = "20";
                    txtTemp.TabIndex = this.nTabIdx;
                    this.nTabIdx++;
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Dose"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.TextAlignment = TextAlignment.Left;
                    txtTemp.SetBinding(iTextBox.displayVisibilityWidthProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.LowerDoseWidth"), { Mode: BindingMode.OneWay }))
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.CC_DOSE_Tooltip);
                    txtTemp.SelectionChanged = (s, e) => { this.txtTemp_SelectionChanged(s, e); };
                    let lblTempHifen: iLabel = new iLabel();
                    lblTempHifen = this.GetiLabel("lblHifen", "-", mCtrl);
                    lblTempHifen.Margin = new Thickness(0, 2, 0, 2);
                    lblTempHifen.MinWidth = "7";
                    lblTempHifen.Margin = new Thickness(1, 0, 1, 0);
                    lblTempHifen.SetBinding(iLabel.displayVisibilityWidthProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.HifenWidth"), { Mode: BindingMode.OneWay }))
                    let txtUpper: iTextBox = this.GetiTextBox("txtUpperDose");
                    txtUpper.Margin = new Thickness(0, 0, 3, 0);
                    txtUpper.MinWidth = "20";
                    txtUpper.Type = "Numeric";
                    txtUpper.Nonnegative = true;
                    txtUpper.Scale = 7;
                    txtUpper.Precision = 3;
                    txtUpper.MaxLength = 11;
                    txtUpper.TabIndex = this.nTabIdx;
                    this.nTabIdx++;
                    txtUpper.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.UpperDose"), { Mode: BindingMode.TwoWayExtended }));
                    txtUpper.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    txtUpper.TextAlignment = TextAlignment.Left;
                    txtUpper.SetBinding(iTextBox.displayVisibilityWidthProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.UpperDoseWidth"), { Mode: BindingMode.OneWay }))
                    ToolTipService.SetToolTip(txtUpper, MedicationForm.CC_DOSE_Tooltip);
                    txtUpper.SelectionChanged = (s, e) => { this.txtUpper_SelectionChanged(s, e); };
                    lblTemp = this.GetiLabel("lblDoseUOM", "UOM", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDoseUOM"), { Mode: BindingMode.TwoWayExtended }));
                    //lblTemp.Margin = new Thickness(-19, 5, 0, 5);
                    lblTemp.Margin = new Thickness(0, 2, 0, 2);
                    lblTemp.MinWidth = "20";
                    cboTemp = this.GetiComboBox("cboUOM", true);
                    //cboTemp.Margin = new Thickness(0, 2, 3, 2);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SelectAllTextEvent = SelectAllTextEvents.None;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Uoms"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DoseUOM"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDoseUOM"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboUOM_Tooltip);
                    cboTemp.IsDropDownStretch = true;
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "DoseLayoutRoot",
                        Margin: new Thickness(5, 2, 2, 5)
                    });
                    grdTemp.RowDefinitions.Add(new RowDefinition());
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(0) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(0) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(30) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(120) }));
                    grdTemp.Children.Add(txtTemp);
                    grdTemp.Children.Add(lblTempHifen);
                    grdTemp.Children.Add(txtUpper);
                    grdTemp.Children.Add(lblTemp);
                    grdTemp.Children.Add(cboTemp);
                    Grid.SetColumn(txtTemp, 1);
                    grdTemp.SetColumnSpan(txtTemp, 1);//Grid.SetColumnSpan(txtTemp, 1);
                    Grid.SetColumn(lblTempHifen, 2);
                    grdTemp./*Grid.*/SetColumnSpan(lblTempHifen, 1);
                    Grid.SetColumn(txtUpper, 3);
                    grdTemp./*Grid.*/SetColumnSpan(txtUpper, 1);
                    Grid.SetColumn(lblTemp, 4);
                    // grdTemp./*Grid.*/SetColumnSpan(lblTemp, 4);
                    Grid.SetColumn(cboTemp, 5);
                    grdTemp./*Grid.*/SetColumnSpan(cboTemp, 6);
                    let cboAdmin: iComboBox;
                    cboAdmin = this.GetiComboBox("cboAdmnMethod", true);
                    cboAdmin.TabIndex = this.nTabIdx;
                    cboAdmin.Margin = new Thickness(0, 0, 3, 0);
                    cboAdmin.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.AdminMethods"), { Mode: BindingMode.TwoWayExtended }));
                    cboAdmin.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.AdminMethod"), { Mode: BindingMode.TwoWayExtended }));
                    cboAdmin.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsAdminMethodVisible"), { Mode: BindingMode.TwoWayExtended }));
                    cboAdmin.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboAdmin, MedicationForm.cboAdministrtionmethod_Tooltip);
                    grdTemp.RowDefinitions.Add(new RowDefinition());
                    grdTemp.Children.Add(cboAdmin);
                    Grid.SetRow(cboAdmin, 2);
                    Grid.SetColumn(cboAdmin, 1);
                    grdTemp/*Grid*/.SetColumnSpan(cboAdmin, 5);
                    ctrl = grdTemp;
                    break;
                case CConstants.REVIEWTITRATED:
                    lblTemp = this.GetiLabelUnderscore("lblReviewcopieddoses", "Review copied doses", mCtrl);
                    lblTemp.TabIndex = this.nTabIdx;
                    lblTemp.Cursor = Cursors.Hand;
                    ToolTipService.SetToolTip(lblTemp, MedicationForm.ReviewCopiedDoses_Tooltip);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsReviewtiratedosesLinkVisibility"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.Margin = new Thickness(5, 10, 0, 0);
                    lblTemp.IsWordwrap = true;
                    ctrl = lblTemp;
                    break;
                case "CC_STARTDTTM":
                case "CC_STARTDT":
                    if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                        lbl = this.GetiLabel("lblDateCommenced", MedicationForm.lblDateCommenced_Text, mCtrl);
                        let spDates: StackPanel = new StackPanel();
                        spDates.Orientation = Orientation.Horizontal;
                        spDates.Margin = new Thickness(5, 2, 5, 2);
                        irbTemp = this.GetiRadioButton("optCompletedate", MedicationForm.optCompletedate_Text);
                        irbTemp.SetBinding(iRadioButton.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Completedate"), { Mode: BindingMode.TwoWayExtended }));
                        irbTemp.Margin = new Thickness(0, 0, 15, 0);
                        spDates.Children.Add(irbTemp);
                        irbTemp.TabIndex = this.nTabIdx;
                        this.nTabIdx++;
                        irbTemp1 = this.GetiRadioButton("optPartialdate", MedicationForm.optPartialdate_Text);
                        irbTemp1.TabIndex = this.nTabIdx;
                        irbTemp1.SetBinding(iRadioButton.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Partialdate"), { Mode: BindingMode.TwoWayExtended }));
                        spDates.Children.Add(irbTemp1);
                        ctrl = spDates;
                    }
                    else {
                        lbl = this.GetiLabel("lblStartdate", MedicationForm.lblStartDate_Text, mCtrl);
                        dtpTemp = this.GetiDateTimePicker("dtpStartDate");
                        dtpTemp.TabIndex = this.nTabIdx;
                        dtpTemp.IsConstrainEntry = true;
                        dtpTemp.SetBinding(iDateTimePicker.RangeStartDateProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RangeStartDTTM"));
                        dtpTemp.SetBinding(iDateTimePicker.RangeEndDateProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RangeEndDTTM"));
                        dtpTemp.SetBinding(iDateTimePicker.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStartdate"), { Mode: BindingMode.TwoWayExtended }));
                        dtpTemp.SetBinding(iDateTimePicker.SelectedDateTimeProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StartDTTM"), { Mode: BindingMode.TwoWayExtended }));
                        this.IsStartDateMan = mCtrl;
                        lbl.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryStartDTTM"), { Mode: BindingMode.OnPush }),this.bindingObjectsOnPush);
                        lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStartdate"), { Mode: BindingMode.TwoWayExtended }));
                        if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                            (ObjectHelper.CreateType<iLabel>(lbl, iLabel)).Text = "Start date time";
                            ToolTipService.SetToolTip(dtpTemp, MedicationForm.dtpStartDate_Tooltip);
                            itbTemp = this.GetiTimeBox("iTimeStartDateTime");
                            ToolTipService.SetToolTip(itbTemp, "Enter drug start time");
                            itbTemp.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StartPrescriptionTime"), { Mode: BindingMode.TwoWayExtended }));
                            itbTemp.SetBinding(iTimeBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableStartTime"), { Mode: BindingMode.TwoWayExtended }));
                            itbTemp.TabIndex = this.nTabIdx;
                            grdTemp = ObjectHelper.CreateObject(new Grid(), {
                                Name: "CC_STARTDTTM",
                                HorizontalAlignment: HorizontalAlignment.Stretch
                            });
                            grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(2, GridUnitType.Star) }));
                            grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Auto) }));
                            grdTemp.Children.Add(dtpTemp);
                            grdTemp.Children.Add(itbTemp);
                            Grid.SetColumn(dtpTemp, 1);
                            Grid.SetColumn(itbTemp, 2);
                            ctrl = grdTemp;
                        }
                        else {
                            ctrl = dtpTemp;
                            ToolTipService.SetToolTip(ctrl, MedicationForm.dtpStartDate_Tooltip);
                        }
                    }
                    break;
                case "CC_COMPLETEDATE":
                    lbl = this.GetiLabel("lblDate", MedicationForm.lblDate_Text, mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStartdate"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp = this.GetiDateTimePicker("dtpStartDate");
                    dtpTemp.TabIndex = this.nTabIdx;
                    dtpTemp.IsConstrainEntry = true;
                    dtpTemp.SetBinding(iDateTimePicker.RangeStartDateProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RangeStartDTTM"));
                    dtpTemp.SetBinding(iDateTimePicker.RangeEndDateProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RangeEndDTTM"));
                    //dtpTemp.SetBinding(iDateTimePicker.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStartdate"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp.SetBinding(iDateTimePicker.SelectedDateTimeProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.CompleteStartDTTM"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp.SetBinding(iDateTimePicker.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStartdate"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl = dtpTemp;
                    break;
                case "CC_PARTIALDATE":
                    lbl = this.GetiLabel("lblMonth", MedicationForm.lblMonth_Text, mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMonthYear"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboMonth", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Month"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Month"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMonthYear"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboMonth_Tooltip);
                    iUpdTemp = this.GetiUpdownBox("udYear");
                    iUpdTemp.SetBinding(iUpDownBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Year"), { Mode: BindingMode.TwoWayExtended }));
                    iUpdTemp.SetBinding(iUpDownBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableMonthYear"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(iUpdTemp, MedicationForm.udyear_Tooltip);
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "CC_PARTIALDATE",
                        HorizontalAlignment: HorizontalAlignment.Stretch
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.Children.Add(cboTemp);
                    grdTemp.Children.Add(iUpdTemp);
                    Grid.SetColumn(cboTemp, 1);
                    Grid.SetColumn(iUpdTemp, 2);
                    ctrl = grdTemp;
                    break;
                case "CC_STOPDTTM":
                    lbl = this.GetiLabel("lblStopdate", MedicationForm.lblStopDate_Text, mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStopDate"), { Mode: BindingMode.TwoWayExtended }));
                    lbl.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleStopDate"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp = this.GetiDateTimePicker("dtpStopDate");
                    dtpTemp.TabIndex = this.nTabIdx;
                    dtpTemp.SetBinding(iDateTimePicker.SelectedDateTimeProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StopDate"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp.SetBinding(iDateTimePicker.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStopDate"), { Mode: BindingMode.TwoWayExtended }));
                    dtpTemp.SetBinding(iDateTimePicker.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleStopDate"), { Mode: BindingMode.TwoWayExtended }));
                    if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                        (ObjectHelper.CreateType<iLabel>(lbl, iLabel)).Text = "Stop date time";
                        lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStopDate"), { Mode: BindingMode.TwoWayExtended }));
                        ToolTipService.SetToolTip(dtpTemp, MedicationForm.dtpStopDate_Tooltip);
                        itbTemp = this.GetiTimeBox("iTimeStopDateTime");
                        ToolTipService.SetToolTip(itbTemp, "Enter drug stop time");
                        itbTemp.TabIndex = this.nTabIdx;
                        itbTemp.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.StopPrescriptionTime"), { Mode: BindingMode.TwoWayExtended }));
                        itbTemp.SetBinding(iDateTimePicker.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableStopDate"), { Mode: BindingMode.TwoWayExtended }));
                        itbTemp.SetBinding(iDateTimePicker.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleStopDate"), { Mode: BindingMode.TwoWayExtended }));
                        grdTemp = ObjectHelper.CreateObject(new Grid(), {
                            Name: "CC_STOPDTTM",
                            HorizontalAlignment: HorizontalAlignment.Stretch
                        });
                        grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(2, GridUnitType.Star) }));
                        grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Auto) }));
                        grdTemp.Children.Add(dtpTemp);
                        grdTemp.Children.Add(itbTemp);
                        Grid.SetColumn(dtpTemp, 1);
                        Grid.SetColumn(itbTemp, 2);
                        ctrl = grdTemp;
                    }
                    else {
                        ctrl = dtpTemp;
                        ToolTipService.SetToolTip(ctrl, MedicationForm.dtpStopDate_Tooltip);
                    }
                    break;
                case "CC_ADNALCMNT":
                    lbl = this.GetiLabel("lblAddComments", "Additional comments", mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableAdditionalcomments"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp = this.GetiTextBox("txtAddComments");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.AcceptsReturn = "True";
                    txtTemp.Height = 40;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtAddComments_Tooltip);
                    txtTemp.TextWrapping = TextWrapping.Wrap;
                    txtTemp.MaxLength = 255;
                    txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                    ctrl = txtTemp;
                    ctrl.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.AdditionalComments"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableAdditionalcomments"), { Mode: BindingMode.TwoWayExtended }));
                    break;
                case "CC_BATCHNO":
                    lbl = this.GetiLabel("lblBatchNo", "Batch no.", mCtrl);
                    txtTemp = this.GetiTextBox("txtBatchNo");
                    txtTemp.TabIndex = this.nTabIdx;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtBatchnumber_Tooltip);
                    txtTemp.Type = "AlphaNumeric";
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.BatchNumber"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.MaxLength = 50;
                    ctrl = txtTemp;
                    break;
                case "CC_ADMN_METHOD":
                    lblTemp = this.GetiLabel("lblAdminMethod", "Administration method", mCtrl);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboAdminMethod", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboAdministrtionmethod_Tooltip);
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.AdminMethods"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.AdminMethod"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDose"), { Mode: BindingMode.TwoWayExtended }));
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_EXPIRYDT":
                    lblTemp = this.GetiLabel("lblExpirydate", "Expiry date", mCtrl);
                    dtpTemp = this.GetiDateTimePicker("dtpExpirydate");
                    dtpTemp.TabIndex = this.nTabIdx;
                    dtpTemp.SetBinding(iDateTimePicker.SelectedDateTimeProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ExpiryDate"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(dtpTemp, MedicationForm.dtpExpirydate_Tooltip);
                    ctrl = dtpTemp;
                    lbl = lblTemp;
                    break;
                case "CC_INSTLMNT_INSTCS":
                    lblTemp2 = this.GetiLabelUnderscore("lblInstalIns", "Instalment instructions", mCtrl);
                    lblTemp2.TabIndex = this.nTabIdx;
                    lblTemp2.Cursor = Cursors.Hand;
                    (ObjectHelper.CreateType<iLabel>(lblTemp2, iLabel)).AddHandler("MouseLeftButtonDownEvent", (s, e) => { this.lblInstalIns_MouseLeftButtonUp(s, e); }, true);
                    ToolTipService.SetToolTip(lblTemp2, MedicationForm.cboInstalmentinstruction_Tooltip);
                    lblTemp2.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableInstalInst"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp = this.GetiLabel("cboInstalIns", "", false);
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableInstalInst"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.InstalmentInstructions"), { Mode: BindingMode.TwoWayExtended, Converter: new CListItemsDisplayPipe(), ConverterParameter: ";I" }));
                    lblTemp.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(), { ElementName: "cboInstalIns", Path: /*new PropertyPath(*/"Text"/*)*/ }));
                    lblTemp.Margin = new Thickness(0, 10, 5, 10);
                    ctrl = lblTemp;
                    lbl = lblTemp2;
                    break;
                case "CC_INTVLBNINSTL":
                    lbl = this.GetiLabel("lblIntervalInst", "Interval between instalments", mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableInterBwtInstalValue"), { Mode: BindingMode.TwoWayExtended }));
                    let udnIntervalInst: iUpDownBox = this.GetUpDown("udnIntervalInst");
                    udnIntervalInst.SetBinding(iUpDownBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableInterBwtInstalValue"), { Mode: BindingMode.TwoWayExtended }));
                    udnIntervalInst.Minimum = 1;
                    ToolTipService.SetToolTip(udnIntervalInst, MedicationForm.cboIntervalbninstalments_Tooltip);
                    udnIntervalInst.TabIndex = this.nTabIdx;
                    this.nTabIdx++;
                    udnIntervalInst.SetBinding(iUpDownBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IntervalBetweenInstallment"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboIntervalInst", true);
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableInterBwtInstalUoM"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboIntervalbninstalments_Tooltip);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.HorizontalAlignment = HorizontalAlignment.Stretch;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.IntervalInstalmentsUoM"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IntervalBetweenInstallmentUOM"), { Mode: BindingMode.TwoWayExtended }));
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "IntervalInstLayout",
                        HorizontalAlignment: HorizontalAlignment.Stretch
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.Children.Add(udnIntervalInst);
                    grdTemp.Children.Add(cboTemp);
                    Grid.SetColumn(udnIntervalInst, 1);
                    Grid.SetColumn(cboTemp, 2);
                    ctrl = grdTemp;
                    break;
                case "CC_LEGALCAT":
                    lbl = this.GetiLabel("lblLegalCatag", "Legal category", mCtrl);
                    txtTemp = this.GetiTextBox("txtLegalCatag");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.MaxLength = 255;
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.LegalCategory_Tooltip);
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.LegalCategory"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl = txtTemp;
                    break;
                case "CC_NOINSTL":
                    lbl = this.GetiLabel("lblNumberofIns", "Number of instalments", mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableNoOfInstal"), { Mode: BindingMode.TwoWayExtended }));
                    let udnNumberofIns: iUpDownBox = this.GetUpDown("udnNumberofIns");
                    udnNumberofIns.TabIndex = this.nTabIdx;
                    udnNumberofIns.Minimum = 1;
                    ToolTipService.SetToolTip(udnNumberofIns, MedicationForm.udNoofinstallments_Tooltip);
                    udnNumberofIns.SetBinding(iUpDownBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableNoOfInstal"), { Mode: BindingMode.TwoWayExtended }));
                    udnNumberofIns.SetBinding(iUpDownBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.NoOfInstallments"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl = udnNumberofIns;
                    break;
                case "CC_DRUGNAME":
                    lbl = this.GetiLabel("lblDrugName", "Prescription item", mCtrl);
                    lblTemp = this.GetiLabel("txtDrugName", "", false);
                    lblTemp.IsWordwrap = true;
                    lblTemp.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IdentifyingName"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl = lblTemp;
                    break;
                case "DURON":
                    lbl = this.GetiLabel("lblDuration", "Duration", mCtrl);
                    lbl.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDuration"), { Mode: BindingMode.TwoWayExtended }));
                    let upDownBox: iUpDownBox = this.GetUpDown("udDuration");
                    ToolTipService.SetToolTip(upDownBox, MedicationForm.udDuration_Tooltip);
                    upDownBox.TabIndex = this.nTabIdx;
                    this.nTabIdx++;
                    upDownBox.SetBinding(iUpDownBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.Duration"), { Mode: BindingMode.TwoWayExtended }));
                    upDownBox.SetBinding(iUpDownBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDuration"), { Mode: BindingMode.TwoWayExtended }));
                    upDownBox.Maximum = 999;
                    cboTemp = this.GetiComboBox("cboDuration", true);
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboDuration_Tooltip);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.HorizontalAlignment = HorizontalAlignment.Stretch;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.Duration"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DurationUOM"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableDuration"), { Mode: BindingMode.TwoWayExtended }));
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "DurationLayoutRoot",
                        HorizontalAlignment: HorizontalAlignment.Stretch
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.Children.Add(upDownBox);
                    grdTemp.Children.Add(cboTemp);
                    Grid.SetColumn(upDownBox, 1);
                    Grid.SetColumn(cboTemp, 2);
                    ctrl = grdTemp;
                    break;
                case "CC_NONCATNAME":
                    lblTemp = this.GetiLabel("lblNONCATNAME", "Non catalogue item", mCtrl);
                    txtTemp = this.GetiTextBox("txtNonCatItem");
                    txtTemp.TabIndex = this.nTabIdx;
                    (ObjectHelper.CreateType<iTextBox>(ctrl, iTextBox)).Text = "Type-in- ";
                    lbl = lblTemp;
                    ctrl = txtTemp;
                    break;
                case "CC_NONCATREASON":
                    lblTemp = this.GetiLabel("lblNONCATReason", "Other non catalogue item \n prescribing reason", mCtrl);
                    cboTemp = this.GetiComboBox("cboNONCATReason", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_NONCATOTHREA":
                    lblTemp = this.GetiLabel("lblNONCATReasonOthers", "Other non catalogue item \n prescribing reason", mCtrl);
                    txtTemp = this.GetiTextBox("txtNONCATReason");
                    txtTemp.TabIndex = this.nTabIdx;
                    lbl = lblTemp;
                    ctrl = txtTemp;
                    break;
                case "CC_PRESBY":
                    lbl = this.GetiLabel("lblPrescribedby", "Prescribed by", mCtrl);
                    lblTemp = this.GetiLabel("txtPrescribedby", "", false);
                    lblTemp.TabIndex = this.nTabIdx;
                    lblTemp.IsWordwrap = true;
                    lblTemp.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.PrescribedByWithRoleName"), { Mode: BindingMode.TwoWayExtended }));
                    ctrl = lblTemp;
                    break;
                case "CC_REASONMOD":
                    lblTemp = this.GetiLabel("lblRsnForMod", "Reason for modification", mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, new Binding("DataContext.IsReasonForModificationVisible"));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableRSNFORMOD"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp = this.GetiComboBox("cboRsnForMod", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                        cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.MedClerkingModificationReason"), { Mode: BindingMode.TwoWayExtended }));
                    }
                    else {
                        cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.ReasonforModification"), { Mode: BindingMode.TwoWayExtended }));
                    }
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, new Binding("DataContext.IsReasonForModificationVisible"));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReasonforModification"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableRSNFORMOD"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.IsEnabledChanged = (s, e) => { this.cboRsnForMod_IsEnabledChanged(s, e); };
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboRsnForMod_Tooltip);
                    lbl = lblTemp;
                    ctrl = cboTemp;
                    break;
                case "CC_REASONMODCOM":
                    lblTemp = this.GetiLabel("lblModComments", "Modification comments", mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, new Binding("DataContext.IsReasonForModificationVisible"));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableModificationcomments"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp = this.GetiTextBox("txtModComments");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.AcceptsReturn = true;
                    txtTemp.Height = 40;
                    txtTemp.TextWrapping = TextWrapping.Wrap;
                    txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                    txtTemp.SetBinding(iTextBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableModificationcomments"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp.SetBinding(iTextBox.VisibilityProperty, new Binding("DataContext.IsReasonForModificationVisible"));
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ModificationComments"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtModComments_Tooltip);
                    lbl = lblTemp;
                    ctrl = txtTemp;
                    break;
                case "CC_VerifyAuthorise":
                    lblTemp = this.GetiLabel("lblIsClinicallyVerified", MedicationForm.lblIsClinicallyVerified_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleClinicallyverify"));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify"), { Mode: BindingMode.TwoWayExtended }));
                    let chkTemp: iCheckBox = this.GetiCheckBox("chckClinicalVerify");
                    chkTemp.SetBinding(iCheckBox.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleClinicallyverify"));
                    chkTemp.SetBinding(iCheckBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify"), { Mode: BindingMode.TwoWayExtended }));
                    chkTemp.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsClinicallyVerified"), { Mode: BindingMode.TwoWayExtended }));
                    chkTemp.OnChange = (s, e) => { this.chckClinicalVerify_OnChange(s, e); };
                    ToolTipService.SetToolTip(chkTemp, "Select To clinically Verify Item");
                    lbl = lblTemp;
                    ctrl = chkTemp;
                    break;
                case "CC_VerifyAuthoriseCOM":
                    lblTemp = this.GetiLabel("lblVerificationComments", MedicationForm.lblVerificationComments_Text, mCtrl);

                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"IsClinicallyVerifyCommentsMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    txtTemp = this.GetiTextBox("txtVerificationComments");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.AcceptsReturn = "True";
                    txtTemp.Height = 40;
                    txtTemp.TextWrapping = TextWrapping.Wrap;
                    txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
                    txtTemp.MaxLength = 500;
                    txtTemp.SetBinding(iTextBox.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleClinicallyverify"));
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.VerificationComments"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(txtTemp, MedicationForm.txtVerificationComments_Tooltip);
                    lbl = lblTemp;
                    ctrl = txtTemp;
                    break;
                case "CC_Isnewmeds":
                    lblTemp = this.GetiLabel("lblisnewmeds", MedicationForm.lblisnewmeds_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisiblenewmeds"));
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableNewMed"));
                    //lblTemp.SetBinding(iLabel.IsEnabledProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisiblenewmeds"));
                    let chkTemp1: iCheckBox = this.GetiCheckBox("chcknewmeds");
                    chkTemp1.SetBinding(iCheckBox.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisiblenewmeds"));
                    chkTemp1.SetBinding(iCheckBox.IsEnabledProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableNewMed"));
                    //chkTemp1.SetBinding(iCheckBox.IsEnabledProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisiblenewmeds"));
                    chkTemp1.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsIDSNewmeds"), { Mode: BindingMode.TwoWayExtended }));
                    chkTemp1.OnChange = (s, e) => { this.chckisnewmeds_OnChange(s, e); };
                    ToolTipService.SetToolTip(chkTemp1, MedicationForm.lblisnewmeds_Tooltip);
                    chkTemp1.Margin = new Thickness(2, 17, 0, 0);
                    lbl = lblTemp;
                    ctrl = chkTemp1;
                    break;
                case "CC_Brand":
                    lblTemp = this.GetiLabel("lblBrand", MedicationForm.lblBrand_Text, mCtrl);
                    lblTemp2 = this.GetiLabelUnderscore("cmdBrand", "Select Brand", mCtrl);
                    lblTemp2.HorizontalAlignment = HorizontalAlignment.Left;
                    lblTemp2.VerticalAlignment = VerticalAlignment.Top;
                    lblTemp2.TabIndex = this.nTabIdx;
                    lblTemp2.Cursor = Cursors.Hand;
                    ibtn = this.GetButton("Clear", "Clear");
                    ibtn.HorizontalAlignment = HorizontalAlignment.Right;
                    ibtn.VerticalAlignment = VerticalAlignment.Bottom;
                    ibtn.TextDecorations = TextDecorations.Underline;
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0)
                        lblTemp.Mandatory = true;
                    else lblTemp.Mandatory = false;
                    lblTemp.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(iLabel.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    ibtn.SetBinding(iButton.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsBrandMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    ibtn.SetBinding(iButton.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsClearEnabled"), { Mode: BindingMode.TwoWayExtended }));
                    (ObjectHelper.CreateType<iLabel>(lblTemp2, iLabel)).AddHandler("MouseLeftButtonDownEvent", (s, e) => { this.cmdBrand_MouseLeftButtonDown(s, e); }, true);
                    lblTemp2.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.BrandName"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.BrandName"), { ElementName: "cmdBrand", Path: /*new PropertyPath(*/"Text"/*)*/ }));
                    (ObjectHelper.CreateType<iButton>(ibtn, iButton)).AddHandler("MouseLeftButtonDownEvent", (s, e) => { this.cmdBrand_MouseLeftButtonDown1(s, e); }, true);
                    grdTemp = ObjectHelper.CreateObject(new Grid(), { Name: sCtrl + "Layout" });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Auto) }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: new GridLength(1, GridUnitType.Star) }));
                    grdTemp.RowDefinitions.Add(ObjectHelper.CreateObject(new RowDefinition(), { Height: new GridLength(2, GridUnitType.Star) }));
                    Grid.SetRow(lblTemp2, 1);
                    Grid.SetRow(ibtn, 1);
                    grdTemp.Children.Add(lblTemp2);
                    grdTemp.Children.Add(ibtn);
                    Grid.SetColumn(lblTemp2, 1);
                    Grid.SetColumn(ibtn, 2);
                    lbl = lblTemp;
                    ctrl = grdTemp;
                    break;
                case "CC_ONADMISSION":
                    lblTemp = this.GetiLabel("lblOnadmission", Resource.MedicationForm.lblOnadmissionText, mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleOnadmission"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI = this.GetiCheckBox("chkOnadmission");
                    chkTempI.TabIndex = this.nTabIdx;
                    chkTempI.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsOnadmission"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI.SetBinding(iCheckBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsEnableOnadmission"), { Mode: BindingMode.TwoWayExtended }));
                    chkTempI.SetBinding(iCheckBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsVisibleOnadmission"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(chkTempI, MedicationForm.Onadmission_Tooltip);
                    lbl = lblTemp;
                    ctrl = chkTempI;
                    break;
                case "CC_REVIEWAFTER":
                    lblTemp = this.GetiLabel("lblReviewafter", Resource.Infusion.lblReviewafter_Text, mCtrl);
                    lblTemp.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterVisible"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterMandatory"), { Mode: BindingMode.TwoWayExtended }));
                    iUpdTemp = this.GetiUpdownBox("udReviewafter");
                    iUpdTemp.TabIndex = this.nTabIdx;
                    iUpdTemp.SetBinding(iUpDownBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfter"), { Mode: BindingMode.TwoWayExtended }));
                    iUpdTemp.SetBinding(iUpDownBox.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.IsenableReviewAfter"), { Mode: BindingMode.TwoWayExtended }));
                    iUpdTemp.SetBinding(iUpDownBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterVisible"), { Mode: BindingMode.TwoWayExtended }));
                    iUpdTemp.Minimum = 1;
                    iUpdTemp.Maximum = 99;
                    iUpdTemp.Width = 72;
                    iUpdTemp.Height = 21;
                    iUpdTemp.HorizontalAlignment = HorizontalAlignment.Left;
                    ToolTipService.SetToolTip(iUpdTemp, Infusion.reviewDuration_Tooltip);
                    cboTemp = this.GetiComboBox("cboreviewAfterUOM", true);
                    cboTemp.TabIndex = this.nTabIdx;
                    cboTemp.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.DefaultDetails.ReviewAfterUOMList"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewafterUOM"), { Mode: BindingMode.TwoWayExtended }));
                    cboTemp.SetBinding(iComboBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterVisible"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(cboTemp, MedicationForm.cboReviewAfter_Tooltip);
                    cboTemp.Width = 90;
                    cboTemp.Height = 21;
                    cboTemp.Margin = new Thickness(0, -6, 0, -9);
                    cboTemp.Width = 72;
                    lblTemp2 = this.GetiLabel("lblReviewAfterDate", String.Empty, false);
                    lblTemp2.SetBinding(iLabel.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterDateTime"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterDateTime"), { Mode: BindingMode.TwoWayExtended, ElementName: "lblReviewAfterDate", Path: /*new PropertyPath(*/"Text"/*)*/ }));
                    lblTemp2.SetBinding(iLabel.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterVisible"), { Mode: BindingMode.TwoWayExtended }));
                    lblTemp2.Width = 130;
                    ibtn = this.GetButton("cmdReviewDetails", String.Empty);
                    ibtn.Cursor = Cursors.Hand;
                    ibtn.Width = 10;
                    ibtn.MinWidth = "5";
                    ibtn.Height = 23;
                    ibtn.ImageSource = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ReviewAfterIcon), UriKind.RelativeOrAbsolute));
                    ibtn.DisabledImageSource = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ReviewAfterIcon), UriKind.RelativeOrAbsolute));
                    ibtn.ActiveImageSource = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ReviewAfterIcon), UriKind.RelativeOrAbsolute));
                    ibtn.SetBinding(iButton.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterIconVisible"), { Mode: BindingMode.TwoWayExtended }));
                    ibtn.SetBinding(ToolTipService.ToolTipProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterIconTooltip"), { Mode: BindingMode.TwoWayExtended, Converter: new WrapToolTipPipe() }));
                    ibtn.HorizontalContentAlignment = HorizontalAlignment.Left;
                    ibtn.IsEnabled = true;
                    grdTemp = ObjectHelper.CreateObject(new Grid(), {
                        Name: "ReviewAfterLayoutRoot",
                        HorizontalAlignment: HorizontalAlignment.Stretch,
                        Margin: new Thickness(5, 2, 0, 0)
                    });
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "85px" }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "85px" }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "138px" }));
                    grdTemp.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "20px" }));
                    Grid.SetRow(iUpdTemp, 1);
                    Grid.SetRow(cboTemp, 1);
                    Grid.SetRow(lblTemp2, 1);
                    Grid.SetRow(ibtn, 1);
                    grdTemp.Children.Add(iUpdTemp);
                    grdTemp.Children.Add(cboTemp);
                    grdTemp.Children.Add(lblTemp2);
                    grdTemp.Children.Add(ibtn);
                    Grid.SetColumn(iUpdTemp, 1);
                    Grid.SetColumn(cboTemp, 2);
                    Grid.SetColumn(lblTemp2, 3);
                    Grid.SetColumn(ibtn, 4);
                    lbl = lblTemp;
                    ctrl = grdTemp;
                    break;
                case "ReviewComments":
                    lblTemp3 = this.GetiLabel("lblReviewComments", Infusion.lblReviewafterComments_Text, mCtrl);
                    lblTemp3.SetBinding(iLabel.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible"));
                    txtTemp = this.GetiTextBox("txtReviewComments");
                    txtTemp.TabIndex = this.nTabIdx;
                    txtTemp.Height = 35;
                    txtTemp.TextWrapping = TextWrapping.Wrap;
                    txtTemp.VerticalScrollBarVisibility = ScrollBarVisibility.Visible;
                    txtTemp.MaxLength = 255;
                    txtTemp.AcceptsReturn = "True";
                    txtTemp.SetBinding(iTextBox.VisibilityProperty, new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible"));
                    txtTemp.SetBinding(iTextBox.TextProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.ReviewRequestComments"), { Mode: BindingMode.TwoWayExtended }));
                    ToolTipService.SetToolTip(txtTemp, Infusion.lblReviewafterComments_Tooltip);
                    lbl = lblTemp3;
                    ctrl = txtTemp;
                    break;
                default:
                    lbl = this.GetiLabel("lbl" + sCtrl, sCtrl, mCtrl);
                    ctrl = this.GetiTextBox("txt" + sCtrl);
                    break;
            }
            out1(lbl);
            out2(ctrl);
        }
        catch (exp: any) {
            let objLzoWizardVMBase: LzoWizardVmbaseService = new LzoWizardVmbaseService();
            objLzoWizardVMBase.ErrorID = 60013;
            objLzoWizardVMBase.ErrorMessage = exp.message;
            objLzoWizardVMBase.StackTrace = exp.stack;
            objLzoWizardVMBase.LogError();
            console.error(objLzoWizardVMBase.ErrorID, exp.message, exp.stack);
        }

        }
        cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
            let objcboRsnForMod: iComboBox = ObjectHelper.CreateType<iComboBox>(sender, iComboBox);
            if (objcboRsnForMod != null && objcboRsnForMod.IsEnabled) {
                if (this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD == true) {
                    if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                        this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
                    if (this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve && this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification == null) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve = false;
                    }
                    else {
                        if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                            this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = this.objfrm.IsClinicallyVerifyEnable = false;
                    }
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                    if (String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase))
                        this.objfrm.FormViewerDetails.BasicDetails.IsRsnForModAuthEnabled = true;
                }
            }
        }
        txtTemp_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
                this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
            let otxtLowerDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.Dose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.Dose, otxtLowerDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
                this.objfrm.formViewerDetails.BasicDetails.Dose = otxtLowerDose.Text;
            }
        }
        txtUpper_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
            let otxtUpperDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.UpperDose, otxtUpperDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
                this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
            }
        }
        lblEndorprop_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            this.objfrm.FormViewerDetails.ShowMultiSelectWindow(ValueDomain.EndorsementProperties);
        }
        lblInstalIns_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            if (sender instanceof iLabel) {
                if (!(ObjectHelper.CreateType<iLabel>(sender, iLabel)).IsEnabled)
                    return
            }
            this.objfrm.FormViewerDetails.ShowMultiSelectWindow(ValueDomain.InstallIns);
        }
        cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            this.objfrm.LaunchBrandConstraint();
        }
        cmdBrand_MouseLeftButtonDown1(sender: Object, e: MouseButtonEventArgs): void {
            this.objfrm.ClearBrandData();
        }
        private chckClinicalVerify_OnChange(sender: Object, e: RoutedEventArgs): void {
            let chckClinicalVerify: iCheckBox = ObjectHelper.CreateType<iCheckBox>(sender, iCheckBox);
            if (chckClinicalVerify instanceof iCheckBox && this.objfrm != null) {
                if (chckClinicalVerify.IsChecked == true) {
                    if (this.objfrm != null) {
                        this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                        this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
                    }
                }
                else {
                    if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED) {
                        this.objfrm.OperationMode = "M";
                    }
                    if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && (this.objfrm.ActionCode != ActivityTypes.Amend || this.objfrm.PrescriptionItemStatus != CConstants.CLINICALLYVERIFIED))
                        this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                    if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
                    }
                    if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                        this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
                    }
                 
                }  
            }
        }
        private chckisnewmeds_OnChange(sender: Object, e: RoutedEventArgs): void {
            if (this.objfrm != null && this.objfrm.ParentbaseVM != null)
                this.objfrm.ParentbaseVM.isReconcileserreq = true;
            if (this.objfrm != null)
                this.objfrm.isnewmedschecked = true;
        }
        private SetDoseGridLength(): void {
            let DoseLayoutRoot: Grid = ObjectHelper.CreateType<Grid>(this.FindName("DoseLayoutRoot"), Grid);
            if (DoseLayoutRoot instanceof Grid) {
                // DoseLayoutRoot.ColumnDefinitions[1].Width = this.objfrm.FormViewerDetails.BasicDetails.LowerDoseWidth;
                // DoseLayoutRoot.ColumnDefinitions[2].Width = this.objfrm.FormViewerDetails.BasicDetails.HifenWidth;
                // DoseLayoutRoot.ColumnDefinitions[3].Width = this.objfrm.FormViewerDetails.BasicDetails.UpperDoseWidth;
            }
        }
        objDoseMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.No) {
                this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = false;
            }
        }
        cboDose_OnChange(sender: Object, e: SelectionChangedEventArgs): void {
            let objDoseType: iComboBox = ObjectHelper.CreateType<iComboBox>(sender, iComboBox);
            if (objDoseType.SelectedItem != null) {
                let objGrid: Grid = ObjectHelper.CreateType<Grid>(this.BasicDetails.FindName("GridDose"), Grid);
                if (objGrid instanceof Grid) {
                    if (String.Compare(ObjectHelper.CreateType<string>(objDoseType.SelectedItem, String), "Dosage range") == 0) {
                        objGrid.ColumnDefinitions[1].Width = new GridLength(1, GridUnitType.Star);
                    }
                    else if (String.Compare(ObjectHelper.CreateType<string>(objDoseType.SelectedItem, String), "Normal") == 0) {
                        objGrid.ColumnDefinitions[1].Width = new GridLength(0);
                    }
                }
            }
        }
        LaunchProblem(sender: Object, e: MouseButtonEventArgs): void {

        }
        private GetiLabel(Name: string, Text: string, bMandatory: boolean): iLabel {
            return ObjectHelper.CreateObject(new iLabel(), {
                Name: Name,
                Text: Text,
                Mandatory: bMandatory,
                Margin: new Thickness(0, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Left,
                Width: Number.NaN,
                IsWordwrap: true,
                isGlobalEnabled: this.IsEnabled
            });
        }
        private GetiRadioButton(Name: string, Text: string): iRadioButton {
            return ObjectHelper.CreateObject(new iRadioButton(), {
                Name: Name,
                Text: Text,
                MinWidth: 130,
                Width: 130,
                IsWordWrap: true,
                GroupName: "Dateoption",
                isGlobalEnabled: this.IsEnabled
            });
        }
        private GetButton(Name: string, Text: string): iButton {
            return ObjectHelper.CreateObject(new iButton(), {
                Name: Name,
                Text: Text,
                MinWidth: 130,
                Width: 130,
                isGlobalEnabled: this.IsEnabled
            });
        }
        private GetiLabelUnderscore(Name: string, Text: string, bMandatory: boolean): iLabel {
            return ObjectHelper.CreateObject(new iLabel(), {
                TextDecorations: TextDecorations.Underline,
                Name: Name,
                Text: Text,
                Mandatory: bMandatory,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Left,
                Width: Number.NaN,
                IsWordwrap: true,
                IsFocusable: false,
                isGlobalEnabled: this.IsEnabled
            });
        }
        private GetiTextBox(name: string): iTextBox {
            let txt: iTextBox = ObjectHelper.CreateObject(new iTextBox(), {
                Name: name,
                Height: 23,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return txt;
        }
        private GetiComboBox(name: string, isEditable: boolean): iComboBox {
            let cbo: iComboBox = ObjectHelper.CreateObject(new iComboBox(), {
                Name: name,
                IsEditable: isEditable,
                Height: 23,
                CanAutocompleteSelectItems: true,
                IsTypeAHead: true,
                IsTextSearchEnabled: true,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return cbo;
        }
        private GetiLabelLink(Name: string, Text: string, bMandatory: boolean): iLabel {
            return ObjectHelper.CreateObject(new iLabel(), {
                Name: Name,
                Text: Text,
                Mandatory: bMandatory,
                TextDecorations: TextDecorations.Underline,
                Cursor: Cursors.Hand,
                Margin: new Thickness(5, 12, 5, 12),
                HorizontalAlignment: HorizontalAlignment.Left,
                Width: Number.NaN,
                IsWordwrap: true,
                isGlobalEnabled: this.IsEnabled
            });
        }
        private GetMultiSelectDropDown(name: string, isEditable: boolean): iMultiSelectDropdown {
            this.oMultiSelectDropDown = ObjectHelper.CreateObject(new iMultiSelectDropdown(), {
                Name: name,
                LinkText: " ",
                Height: 25,
                IsEnabled: true,
                Margin: new Thickness(0, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return this.oMultiSelectDropDown;
        }
        private GetiUpdownBox(name: string): iUpDownBox {
            let upd: iUpDownBox = ObjectHelper.CreateObject(new iUpDownBox(), {
                Name: name,
                Minimum: 1900,
                Maximum: 2500,
                IsDecimal: "False",
                DecimalPlaces: "0",
                Height: 21,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return upd;
        }
        private GetiDateTimePicker(name: string): iDateTimePicker {
            let dtp: iDateTimePicker = ObjectHelper.CreateObject(new iDateTimePicker(), {
                Name: name,
                DatePickerMode: DatePickerType.DATEPICKER,
                EnableCultureSupport: false,
                Height: 21,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                DateTimeFormat: DateTimeFormat.Custom,
                CustomFormat: "dd-MMM-yyyy",
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return dtp;
        }
        private GetiTimeBox(name: string): iTimeBox {
            let tp: iTimeBox = ObjectHelper.CreateObject(new iTimeBox(), {
                Name: name,
                TimeFormat: 'HHMM',
                Height: 21,
                Margin: new Thickness(5, 2, 5, 2),
                EnableDST: true,
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return tp;
        }
        private GetiCheckBox(name: string): iCheckBox {
            let chk: iCheckBox = ObjectHelper.CreateObject(new iCheckBox(), {
                Name: name,
                Height: 23,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return chk;
        }
        private GetUpDown(controlID: string): iUpDownBox {
            let objUpDown: iUpDownBox = ObjectHelper.CreateObject(new iUpDownBox(), {
                Name: controlID,
                Height: 23,
                Margin: new Thickness(5, 2, 5, 2),
                HorizontalAlignment: HorizontalAlignment.Stretch,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return objUpDown;
        }
        private GetStackPanel(): StackPanel {
            let stp: StackPanel = ObjectHelper.CreateObject(new StackPanel(), {
                HorizontalAlignment: HorizontalAlignment.Stretch,
                VerticalAlignment: VerticalAlignment.Stretch,
                Orientation: Orientation.Horizontal,
                Width: Number.NaN,
                isGlobalEnabled: this.IsEnabled
            });
            return stp;
        }

    ShowRecordAdminLayout: Visibility = Visibility.Visible;
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (!this.bIsLoaded) {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (!this.IsBasic && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BHasFormViewParams) {
                this.ShowRecordAdminLayout = Visibility.Collapsed;
                this.brdSTA.Visibility = Visibility.Collapsed;
            }
            this.bIsLoaded = true;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
                let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                if (!this.objfrm.IsLoadAdditionalFaxTab && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds) {
                    this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                    if (!this.objfrm.IsConflictFaxTabLoaded) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                    this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    if (bIsModificationReasonExists)
                        this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                    let IsPRN: boolean = false;
                    if (this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicControls.Length > 0) {
                        if (this.objfrm.FormViewerDetails.BasicDetails.AsRequired && this.objfrm.FormViewerDetails.BasicControls.Where(x => x.Contains("CC_DIRECTION")).Count() > 0) {
                            IsPRN = true;
                        }
                    }
                    if (this.objfrm.formViewerDetails.BHasFormViewParams && !IsPRN) {
                        this.objfrm.formViewerDetails.BasicDetails.IsMandatoryFrequency = this.IsFrequencyMandatory;
                    }
                }
                //this.objfrm.FormViewerDetails.BasicDetails.AdminMethodForDynFormEvent -= this.BasicDetails_AdminMethodForDynFormEvent;
                this.objfrm.FormViewerDetails.BasicDetails.AdminMethodForDynFormEvent = (s, e) => {
                    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                    this.BasicDetails_AdminMethodForDynFormEvent(); 
                };
                if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.Doselabelvalue) && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Doselabelvalue, "Administration method") == 0) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsAdminMethodVisible = Visibility.Visible;
                    this.BasicDetails_AdminMethodForDynFormEvent();
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                this.objfrm.FormViewerDetails.BasicDetails.SteppedVairableVisibilityEvent = (s, e) => { this.BasicDetails_SteppedVairableVisibilityEvent(s); };
                this.SetDoseGridLength();
                if(this.FindName("lblStartdate")){
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryStartDTTM = this.IsStartDateMan;
                }
                if(this.FindName("lblStationary")){
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryStatType = this.IsStatTypeMand;
                }
                let bIsClinicallyVerify: boolean = String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0;
                let bIsAuthorise: boolean = String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0;
                if (!this.objfrm.IsClinicallyVerifyEnable && !bIsClinicallyVerify && !bIsAuthorise)
                    this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
                if (this.objfrm.ActionCode == ActivityTypes.Prescribe && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm.FormViewerDetails.BasicDetails.Frequency != null && !this.objfrm.FormViewerDetails.BasicDetails.AsRequired && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null && (this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes == null || (this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes != null && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes.Count == 0))) {
                    let lnFreqOID: number = 0;
                    Int64.TryParse(this.objfrm.FormViewerDetails.BasicDetails.Frequency.Value, (o) => { lnFreqOID = o; });
                    if (lnFreqOID > 0)
                        this.objfrm.FormViewerDetails.BasicDetails.GetFrequencyDetails(lnFreqOID);
                }
                if (bIsClinicallyVerify || bIsAuthorise) {
                    let lblIsClinicallyVerified: iLabel = ObjectHelper.CreateType<iLabel>(this.FindName("lblIsClinicallyVerified"), iLabel);
                    let lblVerificationComments: iLabel = ObjectHelper.CreateType<iLabel>(this.FindName("lblVerificationComments"), iLabel);
                    let chckClinicalVerify: iCheckBox = ObjectHelper.CreateType<iCheckBox>(this.FindName("chckClinicalVerify"), iCheckBox);
                    let txtVerificationComments: iTextBox = ObjectHelper.CreateType<iTextBox>(this.FindName("txtVerificationComments"), iTextBox);
                    if (lblVerificationComments instanceof iLabel && lblVerificationComments instanceof iLabel && chckClinicalVerify instanceof iCheckBox) {
                        if (bIsClinicallyVerify) {
                            if (this.objfrm.ActionCode != ActivityTypes.Amend) {
                                this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                                if ((this.objfrm.FormViewerDetails.BasicDetails.IsAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsFluidAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsMCIAuthorise) && String.IsNullOrEmpty(this.objfrm.PrescriptionItemStatus) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                                    chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                                }
                                else {
                                    chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
                                }
                            }
                            else {
                                if (this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified || this.objfrm.IsClinicallyVerifyEnable)
                                    chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
                                this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED;
                            }
                        }
                        else if (bIsAuthorise) {
                            lblIsClinicallyVerified.Text = "Authorised";
                            lblVerificationComments.Text = "Authoriser�s comments";
                            lblVerificationComments.Mandatory = false;
                            ToolTipService.SetToolTip(txtVerificationComments, Resource.MedicationForm.txtVerificationComments_Tooltip_Authorise);
                            ToolTipService.SetToolTip(chckClinicalVerify, Resource.MedicationForm.chckClinicalVerify_Tooltip_Athorise);
                            if (!this.objfrm.IsClinicallyVerifyEnable) {
                                chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                            }
                        }
                    }
                }
            }
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMultiRouteUnChecked = false;
            //this.objfrm.FormViewerDetails.BasicDetails.AdminMethodForDynFormEvent -= this.BasicDetails_AdminMethodForDynFormEvent;
            this.objfrm.FormViewerDetails.BasicDetails.AdminMethodForDynFormEvent = (s, e) => { 
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.BasicDetails_AdminMethodForDynFormEvent(); 
            };
        }
        if (this.DataContext.FormViewerDetails.BasicDetails.IsClinicallyVerified == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
               
            }
        }
        else{
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }   
        }
        
    }
    BasicDetails_AdminMethodForDynFormEvent(): void {
        let DoseLayoutRoot: Grid = ObjectHelper.CreateType<Grid>(this.FindName("DoseLayoutRoot"), Grid);
        if (DoseLayoutRoot instanceof Grid) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsDoseVisible == Visibility.Collapsed) {
                DoseLayoutRoot.RowDefinitions.HeightVisibility(1,0);
                DoseLayoutRoot.RowDefinitions.HeightVisibility(2,GridLength.Auto);
            }
            else {
                DoseLayoutRoot.RowDefinitions.HeightVisibility(2,0);
                DoseLayoutRoot.RowDefinitions.HeightVisibility(1,GridLength.Auto);
            }
        }
    }
    BasicDetails_SteppedVairableVisibilityEvent(SteppedVairablePanelVisibility: Visibility): void {
        if (this.IsBasic) {
            this.ContentCtrlMedResolveStepped.Visibility = SteppedVairablePanelVisibility;
        }
        else {
            this.ContentCtrlMedResolveStepped.Visibility = Visibility.Collapsed;
        }
    }
    public DisposeFormEvents(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            //this.objfrm.FormViewerDetails.BasicDetails.AdminMethodForDynFormEvent -= BasicDetails_AdminMethodForDynFormEvent;
            //this.objfrm.FormViewerDetails.BasicDetails.SteppedVairableVisibilityEvent -= BasicDetails_SteppedVairableVisibilityEvent;
        }
    }
    public DisposeFormObjects(): void {
        let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (oItem != null)
            oItem.FormViewerDetails.BasicDetails.DoCleanUP();
    }
    private UserControl_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        //this.DisposeFormEvents();
        //this.DisposeFormObjects();
    }
    OnFrequencySelectionChanged(adminslotucTempRef: frmAdminSlotTimes, s, e) {
        if (adminslotucTempRef != undefined && s != undefined && s.SelectedItem?.Tag?.length > 4) {
            adminslotucTempRef.FreqTypeChangedEvent(s.SelectedItem.Tag[4]);
        }
    }
    ngOnDestroy(): void {
        if (this.FormviewerLoadedEventsubscription) {
            this.FormviewerLoadedEventsubscription.unsubscribe();
        }
        //this.UserControl_UnLoaded(this, null);
    }
    onpushChange(){
         this.bindingObjectsOnPush.forEach(obj =>{
            if(obj.Source){ 
                this.FindName(obj.Source).detectChangeOnPush(obj);
            }
        })
    }
}
