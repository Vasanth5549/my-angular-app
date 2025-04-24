import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { UserControl } from "src/app/shared/epma-platform/controls/UserControl";
import { iTab } from "src/app/shared/epma-platform/controls/epma-tab/epma-tab.component";
import { iTabItem, HeaderImageListItem, HeaderImageAlignment } from "src/app/shared/epma-platform/controls/epma-tabitem/epma-tabitem.component";
import { List } from "src/app/shared/epma-platform/models/list";
import { Visibility } from "epma-platform/models";
import { SLQueryCollection } from "epma-platform/services";
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { CConstants, MedImage, MedImages } from "../utilities/CConstants";
import { MedsAdminCommonData, Common } from "../utilities/common";
import { MedChartData, ChartContext } from "../utilities/globalvariable";
import { ProfileData } from "../utilities/ProfileData";
import { MedsAdminChartView } from "src/app/lorappmedicationadminbbui/view/MedsAdminChartView";
import { MedsAdminChartOverView } from "src/app/lorappmedicationadminbbui/view/MedsAdminChartOverView";
import { InfusionChartView } from "src/app/lorappmedicationadminbbui/view/InfusionChartView";
import { GridLayoutComponent } from '@progress/kendo-angular-layout';
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { PrescriptionChartVM } from '../ca/prescriptionchart/prescriptionchartvm';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'MedsAdminMainView',
    templateUrl: './MedsAdminMainView.html',
    styleUrls: ['./MedsAdminMainView.css']
})

export class MedsAdminMainView extends UserControl implements OnInit, AfterViewInit, OnDestroy {
    public Styles = ControlStyles;
    override _DataContext: MedicationAdminVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: MedicationAdminVM) {
        this._DataContext = value;
    }
    private _contentLoaded: boolean;
    objMedsAdminCommonData: MedsAdminCommonData;
    oGridLayout: GridLayoutComponent;
    oTab: iTab;
    ShowOnlyPrescChartView: Boolean = false;
    ShowOnlyObservationView: Boolean = false;
    ShowAllView: Boolean = false;

    @ViewChild('tabTempRef', { read: iTab, static: false })
    set _tabLstVw(c: iTab) {
        if (c) {
            this.oTab = c;
            this.oTab.Parent=this;
        }
    }

    constructor() {
        super();
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.UserControl_Loaded({}, null);
    }

    ngOnDestroy(): void {
        this.UserControl_Unloaded({}, null);
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("MedChart");
        ChartContext.IsInfusionAlertsNotReviewed = false;
        this.objMedsAdminCommonData = new MedsAdminCommonData();
        this.objMedsAdminCommonData.CAMenucode = SLQueryCollection.GetQueryStringValue("MenuCode");
        this.objMedsAdminCommonData.MedsAdminCommonDataCompleted = (s, e) => this.objMedsAdminCommonData_MedsAdminCommonDataCompleted();
        this.objMedsAdminCommonData.GetProfileConfigData();
    }

    private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
        var oTabItem: iTabItem = null;
        if (this.oTab != null) {
            oTabItem = this.oTab.GetItem(CConstants.sTabChartKey);
            if (oTabItem != null) {
                var ChartTabData: MedsAdminChartView = <MedsAdminChartView>((oTabItem).Content as MedsAdminChartView);
                if (ChartTabData != null) {
                    ChartTabData.DisposeObjectsOnFinish();
                }
            }
            oTabItem = this.oTab.GetItem(CConstants.sTabChartOverViewKey);
            if (oTabItem != null) {
                var OverviewTabData: MedsAdminChartOverView = <MedsAdminChartOverView>((oTabItem).Content as MedsAdminChartOverView);
                if (OverviewTabData != null) {
                    OverviewTabData.DisposeObjectsOnFinish();
                }
            }
            oTabItem = this.oTab.GetItem(CConstants.sTabInfusionKey);
            if (oTabItem != null) {
                var InfusionTabData: InfusionChartView = <InfusionChartView>((oTabItem).Content as InfusionChartView);
                if (InfusionTabData != null) {
                    InfusionTabData.DisposeObjectsOnFinish();
                }
            }
        }
        Common.CADataContext = null;
        Common.GPCConsentVerifyStatus = String.Empty;
        if (this.objMedsAdminCommonData != null) {
            this.objMedsAdminCommonData.MedsAdminCommonDataCompleted = (s, e) => { this.objMedsAdminCommonData_MedsAdminCommonDataCompleted };
            this.objMedsAdminCommonData = null;
        }
    }

    objMedsAdminCommonData_MedsAdminCommonDataCompleted(): void {
        if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_PRESCCHART_P2") == 0) {
            this.ShowOnlyPrescChartView = true;
            ChartContext.IsInfusionAlertsNotReviewed = false;
        }
        else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_OBSERESULTCHAR_P2") == 0) {
            this.ShowOnlyObservationView = true;
            ChartContext.IsInfusionAlertsNotReviewed = false;
        }
        else {
            this.ShowAllView = true;
            this.oTab.HorizontalAlignment = "Stretch";
            this.oTab.VerticalAlignment = "Stretch";
            this.oTab.Name = "tabMedsAdmin";
            var IsOverviewDefault: boolean = true;

            if ((String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) == 0) && (!MedChartData.IsLaunchFrmPrescribe)) {
                IsOverviewDefault = false;
            }
            // this.oTab.AddTabItem(CConstants.sTabChartKey, "Chart", new MedsAdminChartView(), !IsOverviewDefault, "Chart");
            let chartView = new MedsAdminChartView();
            chartView.DataContext = this.DataContext;
            if (IsOverviewDefault && String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode) == 0 )
            {
                let chartOverView = new MedsAdminChartOverView();
                chartOverView.DataContext = this.DataContext;
                this.oTab.AddTabItem(CConstants.sTabChartOverViewKey, "Overview", chartOverView, IsOverviewDefault, "Overview");
                chartView.LoadMedChartData((e) => { this.addtabs(e); });
            }
            else
            {
                this.oTab.AddTabItem(CConstants.sTabChartKey, "Chart", chartView, !IsOverviewDefault, "Chart");
                this.addtabs(this.DataContext);
            }
                
            if (this.DataContext instanceof MedicationAdminVM) {
                (<MedicationAdminVM>(this.DataContext as MedicationAdminVM)).FillActivityConsideration();
            }
            // else if (this.DataContext instanceof PrescriptionChartVM) {

            //     (<PrescriptionChartVM>(this.DataContext as PrescriptionChartVM)).FillActivityConsideration();

            // }

        }
    }
    addtabs(objDatacontext) {
        if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) {
            let InfchartView = new InfusionChartView();
            InfchartView.DataContext = objDatacontext;
            this.oTab.AddTabItem(CConstants.sTabInfusionKey, "Infusion/Gases Chart", InfchartView, false, "Infusion/Gases Chart");
        }
        var IsOverviewDefault: boolean = true;
        if ((String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) == 0) && (!MedChartData.IsLaunchFrmPrescribe)) {
            IsOverviewDefault = false;
        }
        let chartOverView = new MedsAdminChartOverView();
        chartOverView.DataContext = objDatacontext;
        this.oTab.AddTabItem(CConstants.sTabChartOverViewKey, "Overview", chartOverView, IsOverviewDefault, "Overview");
        this.DrawAlertIconNextToOverviewTab();
        if (String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode)) {
            this.HideTabItem(this.oTab, CConstants.sTabChartKey);
            this.HideTabItem(this.oTab, CConstants.sTabInfusionKey);
        }
    }


    public DrawAlertIconNextToOverviewTab(): void {
        var oTabItem: iTabItem = this.oTab.GetItem(CConstants.sTabChartOverViewKey);
        if (oTabItem instanceof iTabItem) {
            if (oTabItem != null) {
                oTabItem.HeaderImageList = new List<HeaderImageListItem>();
                var obj: HeaderImageListItem = new HeaderImageListItem();
                var _bIsEventsExists: boolean = true;
                if (MedChartData.ListOfEventsWithNotKnownStatus == null || MedChartData.ListOfEventsWithNotKnownStatus.Count == 0) {
                    _bIsEventsExists = false;
                }
                else {
                    if (MedChartData.ListOfEventsWithNotKnownStatus.Max(x => x.STCode).STCode == 0) {
                        _bIsEventsExists = false;
                    }
                }
                if (_bIsEventsExists) {
                    oTabItem.HeaderImage = MedImage.GetPath(MedImages.NotKnownItemsExistsIcon);
                    oTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                    oTabItem.HeaderImgToolTip = "Pending administrations";
                }
                else {
                    oTabItem.HeaderImage = "";
                    oTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                    oTabItem.HeaderImgToolTip = "";
                }
            }
        }
    }

    private HideTabItem(oTab: iTab, sTabChartKey: string): void {
        var oTabItem: iTabItem = oTab.GetItem(sTabChartKey);
        if (oTabItem instanceof iTabItem && oTabItem.Key == sTabChartKey) {
            oTabItem.Visibility = Visibility.Collapsed;
        }
    }
}