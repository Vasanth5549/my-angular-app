import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
//import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
//import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, iAppDialogWindow } from 'epma-platform/models';
import { Color, DataTemplate, SolidColorBrush, iLabel } from 'epma-platform/controls';
//import { HelperService} from 'epma-platform/soapclient';
import { GridComponent } from '@progress/kendo-angular-grid';
import 'epma-platform/stringextension';
// import DateTime from 'epma-platform/DateTime';
// import TimeSpan from 'epma-platform/TimeSpan';
// import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Grid, GridExtension,GridViewColumn, GridViewRow, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';

import { CConstants, PrescriptionTypes } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { SequentialItem, SequentialItemsVM } from '../viewmodel/SequentialItemsVM';
import { iAppDialogWindow } from 'src/app/shared/epma-platform/controls/iAppDialogWindow';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { Resource } from '../resource';
import { DisplayOtherInformationLineItem, DisplayPrescriptionLineItem, StartDTTMDisplay } from 'src/app/product/shared/convertor/medicationconverters.service';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
//import { DisplayOtherInformationLineItem } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
//import { BooleanToVisibilityConverter } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
@Component({
    selector: 'MedSequentialPrescription',
    templateUrl: './medsequentialprescription.html',
    //styleUrls: ['./medsequentialprescription.css']
    styles: [
        `
          .disclaimeralignment {
            padding-top:12px;
          } 
        `
        ]
})

export class MedSequentialPrescription extends iAppDialogWindow implements OnInit, AfterViewInit {
    public StartDTTMConvertor: StartDTTMDisplay;
    public presdrugs = Resource.prescribedrugs;
  
   
   // BoolToVisibility: BooleanToVisibilityConverter;  //view/medsequentialpreparation.ts/MedSequentialPrescription uncomment the code there to refer to this.
    MedOtherDisplay: DisplayOtherInformationLineItem;
    public MedLineDisplay: DisplayPrescriptionLineItem;
    public Styles = ControlStyles;
    private LayoutRoot: { DataContext: {}, Control: Grid, Children: any };
    @ViewChild("LayoutRootTempRef", { read: Grid }) set _LayoutRoot(c: Grid) {
        if (c)
            this.LayoutRoot.Control = c;
    }
    public grdsequentialPrescription: GridExtension = new GridExtension();
    @ViewChild('grdsequentialPrescriptionTempRef', { read: GridComponent, static: false }) set _grdsequentialPrescription(
        c: GridComponent
    ) {
        if (c) {
            this.grdsequentialPrescription.grid = c;
            this.grdsequentialPrescription.columns = c.columns;
        }
    }
    private lblDisclaimer: iLabel;
    @ViewChild("lblDisclaimerTempRef", { read: iLabel }) set _lblDisclaimer(c: iLabel) {
        if (c)
            this.lblDisclaimer = c;
    }
    private lblSeqAdminStartDateTime: iLabel;
    @ViewChild("lblDisclaimerTempRef", { read: iLabel }) set _lblSeqAdminStartDateTime(c: iLabel) {
        if (c)
            this.lblDisclaimer = c;
    }
    private lblSeqAdminState: iLabel;
    @ViewChild("lblDisclaimerTempRef", { read: iLabel }) set _lblSeqAdminState(c: iLabel) {
        if (c)
            this.lblDisclaimer = c;
    }

    objSequentialItemsVM: SequentialItemsVM = new SequentialItemsVM();
    oItemVM: SequentialItem=new SequentialItem();
    sPresType: string = PatientContext.PrescriptionType;
    // newly added
    @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
    grdData: GridExtension = new GridExtension();
    constructor() {
        super();
    }
    ngOnInit(): void {

    }
    ngAfterViewInit() {
        this.grdsequentialPrescription.GenerateColumns();
        this.iAppDialogWindow_Loaded(null, null);
    }
    private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objSequentialItemsVM = ObjectHelper.CreateType<SequentialItemsVM>(this.DataContext, SequentialItemsVM);
        if (this.objSequentialItemsVM != null && this.objSequentialItemsVM.MedsResolve != null && this.objSequentialItemsVM.MedsResolve.Count > 0) {
            this.sPresType = !String.IsNullOrEmpty(this.objSequentialItemsVM.MedsResolve[0].PrescriptionType) ? this.objSequentialItemsVM.MedsResolve[0].PrescriptionType : PatientContext.PrescriptionType;
        }
        this.grdsequentialPrescription.Columns["StartDTTMVWR"].IsVisible = !this.sPresType.Equals(PrescriptionTypes.ForAdministration);
        this.grdsequentialPrescription.Columns["SeqAdminStartDateTime"].IsVisible = this.sPresType.Equals(PrescriptionTypes.ForAdministration);
        this.grdsequentialPrescription.Columns["SeqAdminState"].IsVisible = this.sPresType.Equals(PrescriptionTypes.ForAdministration);
        this.lblDisclaimer.Visibility = this.sPresType.Equals(PrescriptionTypes.ForAdministration) ? Visibility.Visible : Visibility.Collapsed;
        if(this.objSequentialItemsVM!=null && this.objSequentialItemsVM.MedsSequentialResolve!=null)
        {
            this.grdsequentialPrescription.SetBinding('data', this.objSequentialItemsVM.MedsSequentialResolve);
        }
        
    }
    rowLoaded(context: any) {
        let rowEventArgs = this.grdData.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdsequentialPrescription_RowLoaded({}, rowEventArgs);
    }

    private grdsequentialPrescription_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        let dataGridRow: GridViewRow;
        if (e.Row != null && e.Row.Item != null) {
            this.oItemVM = ObjectHelper.CreateType<SequentialItem>(e.Row.Item, SequentialItem);
            if (this.oItemVM instanceof SequentialItem) {
                dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                if (this.oItemVM != null && this.oItemVM.PrescriptionItem != null && String.Equals(this.oItemVM.PrescriptionItem.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.OrdinalIgnoreCase)) {
                    dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    if (dataGridRow != null) {
                        dataGridRow.Background = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                        dataGridRow.IsAlternating = false;
                    }
                }
            }
        }
    }
}


